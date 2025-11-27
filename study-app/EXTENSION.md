# Study App Extension Guide

This guide explains how to extend this study app for a new subject or course material.

## Quick Start for New Subject

1. **Copy the project folder** to a new location
2. **Add your PDFs** to the `public/pdfs/` directory
3. **Update course data** in the `src/data/` files
4. **Customize styling** if needed in `src/index.css`

## Project Structure

```
study-app/
├── src/
│   ├── components/
│   │   ├── ui/           # Reusable UI components (button, card, etc.)
│   │   ├── Latex.tsx     # LaTeX & Markdown rendering components
│   │   ├── Sidebar.tsx   # Navigation sidebar
│   │   └── PDFViewer.tsx # In-app PDF viewer
│   ├── data/
│   │   ├── index.ts      # Main export file (re-exports all data)
│   │   ├── types.ts      # TypeScript interfaces
│   │   ├── chapters.ts   # All chapter content with topics & exercises
│   │   ├── flashcards.ts # Flashcard definitions
│   │   └── resources.ts  # PDF files and exam definitions
│   ├── pages/
│   │   ├── HomePage.tsx      # Dashboard with progress
│   │   ├── ChapterPage.tsx   # Chapter content view
│   │   ├── FlashcardsPage.tsx # Flashcard study mode
│   │   ├── ExamsPage.tsx     # Past exams list
│   │   └── PdfsPage.tsx      # PDF library browser
│   ├── lib/
│   │   ├── pdfCache.ts   # PDF caching with IndexedDB
│   │   └── utils.ts      # Utility functions
│   ├── App.tsx           # Main app component
│   └── index.css         # Global styles & theme
└── public/pdfs/          # PDF files for deployment
```

## Data Organization

Course data is split into logical files for easier maintenance:

### `src/data/types.ts` - Type Definitions

All TypeScript interfaces are defined here:

```typescript
interface Topic {
  id: string;           // Unique identifier (e.g., "ch1-t1")
  title: string;        // Topic title
  content: string;      // Brief summary (supports $latex$)
  explanation?: string; // Detailed markdown explanation with $latex$
  keyPoints?: string[]; // Bullet points (supports $latex$)
  formulas?: string[];  // Display-mode LaTeX formulas
  diagrams?: { type: 'latex' | 'mermaid'; content: string; }[];
  pdfRef?: { file: string; page: number };
}

interface Chapter { ... }
interface Exercise { ... }
interface Flashcard { ... }
interface PdfFile { ... }
interface Exam { ... }
```

### `src/data/chapters.ts` - Chapter Content

Contains all chapters with their topics and exercises. This is the main content file.

### `src/data/flashcards.ts` - Flashcards

All flashcard definitions organized by chapter.

### `src/data/resources.ts` - PDFs & Exams

PDF file listings and exam definitions.

### `src/data/index.ts` - Main Export

Re-exports everything for convenient importing:

```typescript
// Import from the data index
import { chapters, flashcards, exams, pdfFiles } from '@/data'
import type { Chapter, Topic, Flashcard } from '@/data'
```

## Writing Content with Markdown + LaTeX

### The MarkdownLatex Component

Explanations now support **full Markdown** with embedded LaTeX. Use the `MarkdownLatex` component:

```tsx
import { MarkdownLatex } from '@/components/Latex'

<MarkdownLatex>{topic.explanation}</MarkdownLatex>
```

Supported features:
- **Bold**, *italic*, ~~strikethrough~~
- Headers (##, ###)
- Bullet lists and numbered lists
- Tables
- Code blocks with syntax highlighting
- Inline LaTeX with `$...$`
- Display LaTeX with `$$...$$`
- Blockquotes

### Writing Explanations (Markdown + LaTeX)

```typescript
{
  id: "ch2-t1",
  title: "Newton's Second Law",
  explanation: `## The Big Idea

**Newton's Second Law** connects three quantities: force, mass, and acceleration.

### The Formula

$$\\sum\\vec{F} = m\\vec{a}$$

This means:
- More force → more acceleration
- More mass → less acceleration

### Real-World Example

Imagine pushing a shopping cart:
| Cart Status | Mass | Same Push | Acceleration |
|-------------|------|-----------|--------------|
| Empty | Low | 10 N | Fast |
| Full | High | 10 N | Slow |

The formula $F = ma$ explains this perfectly!`
}
```

### LaTeX Components Reference

```tsx
// 1. Pure LaTeX rendering
<Latex>E = mc^2</Latex>
<Latex displayMode>\\frac{d}{dx}\\sin(x) = \\cos(x)</Latex>

// 2. Text with inline $...$ LaTeX (no markdown)
<LatexText>The formula $F = ma$ describes the law.</LatexText>

// 3. Full markdown with LaTeX support
<MarkdownLatex>{markdownContent}</MarkdownLatex>

// 4. Styled formula block for formula lists
<Formula formula="\\vec{F} = m\\vec{a}" />
```

### When to Use Each Component

| Component | Use Case | Supports |
|-----------|----------|----------|
| `Latex` | Pure math formulas | KaTeX only |
| `LatexText` | Short text with formulas | Inline `$...$` |
| `MarkdownLatex` | Explanations, long content | Full Markdown + `$...$` + `$$...$$` |
| `Formula` | Formula display lists | Display-mode KaTeX |

### Escaping in TypeScript Strings

**Important:** In TypeScript template literals and strings, backslashes must be escaped!

```typescript
// ❌ Wrong - single backslash
formulas: ["\\vec{F} = m\\vec{a}"]  // Will break

// ✅ Correct - double backslash
formulas: ["\\\\vec{F} = m\\\\vec{a}"]
```

### Common LaTeX Commands

```latex
% Vectors
\\vec{F}              → F⃗
\\hat{i}, \\hat{j}    → î, ĵ

% Fractions
\\frac{a}{b}          → a/b

% Subscripts/Superscripts  
x_0, v^2              → x₀, v²

% Greek letters
\\alpha, \\theta, \\omega  → α, θ, ω

% Operators
\\sum, \\int, \\sqrt{x}    → Σ, ∫, √x

% Comparisons
\\leq, \\geq, \\neq        → ≤, ≥, ≠

% Special
\\cdot (dot product), \\times (cross product)
\\text{text} (for text within equations)
```

## Available Icons

The sidebar uses [Lucide React](https://lucide.dev/icons/) icons. Common ones:

- `BookOpen` - General reading
- `Rocket` - Dynamics/Action
- `Zap` - Energy
- `ArrowRightLeft` - Momentum/Exchange
- `RotateCw` - Rotation
- `Sigma` - Math
- `Route` - Motion/Path
- `Atom` - Physics
- `FlaskConical` - Chemistry
- `Dna` - Biology
- `Calculator` - Math/Calculations

## Customizing Appearance

### Colors

Edit `src/index.css` to change the color scheme:

```css
@theme {
  /* Background colors */
  --color-background: oklch(0.13 0.02 260);
  --color-foreground: oklch(0.98 0.01 260);
  
  /* Primary accent color */
  --color-primary: oklch(0.65 0.18 250);
  
  /* Change these for your theme */
}
```

### Dark/Light Mode

Current implementation is dark-mode only. To add light mode:

1. Create CSS variables for light mode
2. Use `@media (prefers-color-scheme: light)` or a theme toggle
3. Update component classes accordingly

## PDF Linking

PDFs are expected in the parent directory of the app. Links are relative:

```typescript
// In any page component
const openPdf = (filename: string) => {
  window.open(`../${filename}`, '_blank')
}
```

To change PDF location, update the path in all page components.

## Adding New Pages

1. Create a new file in `src/pages/NewPage.tsx`
2. Import and add to `App.tsx`:

```tsx
import { NewPage } from './pages/NewPage'

// In renderPage():
if (currentPage === 'newpage') return <NewPage />

// Add to Sidebar.tsx navigation items
```

## Extracting Content from PDFs

To extract content from new PDFs, use Python with PyMuPDF:

```python
import fitz  # PyMuPDF

def extract_pdf_content(filepath):
    doc = fitz.open(filepath)
    text = ""
    for page in doc:
        text += page.get_text()
    return text

# Extract from all PDFs
import os
for filename in os.listdir('.'):
    if filename.endswith('.pdf'):
        content = extract_pdf_content(filename)
        print(f"\n=== {filename} ===\n{content[:500]}...")
```

## Building for Production

### Local Build

```bash
npm run build
```

Output will be in the `dist/` folder. Deploy to any static hosting.

### GitHub Pages Deployment

This app is configured for GitHub Pages with base URL `/P1100/`:

1. PDFs go in `public/pdfs/` folder
2. Build command: `npm run build`
3. Deploy the `dist/` folder to GitHub Pages

To change the base URL, edit `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/your-repo-name/',
  // ...
})
```

## Troubleshooting

### PDFs not opening
- Check that PDF files are in `public/pdfs/`
- Verify filenames match exactly (case-sensitive)
- For GitHub Pages, ensure PDFs are committed to the repository

### Icons not showing
- Ensure icon name matches Lucide icon exactly
- Import the icon in `Sidebar.tsx`

### LaTeX not rendering
- Check for proper escaping: use `\\` not `\` in strings
- Ensure KaTeX CSS is imported in `Latex.tsx`
- Check browser console for KaTeX errors

### Styles not applying
- Run `npm install` to ensure all dependencies are installed
- Check for CSS syntax errors in browser console

## Technologies Used

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS v4** - Styling
- **Radix UI** - Accessible components
- **Lucide React** - Icons
- **KaTeX** - LaTeX rendering for mathematical formulas
- **react-pdf** - In-app PDF viewing
- **IndexedDB** - Client-side PDF caching

## Key Features

- 📚 Chapter-based course organization
- 📝 Detailed topic explanations with LaTeX formulas
- 🎴 Flashcard study system
- 📄 In-app PDF viewer with caching
- 🌙 Dark mode by default
- 📱 Responsive design
- 🚀 GitHub Pages ready

---

For questions or improvements, feel free to extend this documentation!
