# Study App Extension Guide

This guide explains how to extend this study app for a new subject or course material.

## Quick Start for New Subject

1. **Copy the project folder** to a new location
2. **Add your PDFs** to the parent directory
3. **Update course data** in `src/data/courseData.ts`
4. **Customize styling** if needed in `src/index.css`

## Project Structure

```
study-app/
├── src/
│   ├── components/
│   │   ├── ui/           # Reusable UI components
│   │   ├── Latex.tsx     # LaTeX rendering components
│   │   ├── Sidebar.tsx   # Navigation sidebar
│   │   └── PDFViewer.tsx # In-app PDF viewer
│   ├── data/
│   │   └── courseData.ts # Course content definitions
│   ├── pages/
│   │   ├── HomePage.tsx      # Dashboard
│   │   ├── ChapterPage.tsx   # Chapter content view
│   │   ├── FlashcardsPage.tsx # Flashcard study
│   │   ├── ExamsPage.tsx     # Past exams list
│   │   └── PdfsPage.tsx      # PDF library
│   ├── lib/
│   │   ├── pdfCache.ts   # PDF caching with IndexedDB
│   │   └── utils.ts      # Utility functions
│   ├── App.tsx           # Main app component
│   └── index.css         # Global styles
└── public/pdfs/          # PDF files for GitHub Pages deployment
```

## Adding Course Content

### Step 1: Define Data Structures

The main data file is `src/data/courseData.ts`. Key interfaces:

```typescript
interface Topic {
  id: string;           // Unique identifier (e.g., "ch1-t1")
  title: string;        // Topic title
  content: string;      // Brief summary with inline LaTeX ($...$)
  explanation?: string; // Detailed 10th-grader friendly explanation
  keyPoints?: string[]; // Bullet points with inline LaTeX
  formulas?: string[];  // List of key formulas in LaTeX (display mode)
  diagrams?: {          // Optional visual aids
    type: 'latex' | 'mermaid';
    content: string;
  }[];
  pdfRef?: {            // Reference to source PDF
    file: string;       // PDF filename
    page: number;       // Page number
  };
}

interface Exercise {
  id: string;
  title: string;
  problem: string;      // Problem statement (supports LaTeX)
  solution?: string;    // Solution if available (supports LaTeX)
  pdfRef?: { file: string; page: number };
}

interface Chapter {
  id: string;           // Unique ID (e.g., "chapter1")
  number: number;       // Chapter number
  title: string;        // Chapter title
  icon: string;         // Lucide icon name
  description: string;  // Brief description
  topics: Topic[];      // List of topics
  exercises: Exercise[];
  pdfs: string[];       // Related PDF files
}

interface Flashcard {
  id: string;
  front: string;        // Question (supports LaTeX)
  back: string;         // Answer (supports LaTeX)
  chapter: string;      // Chapter ID for filtering
}

interface PdfFile {
  id: string;
  title: string;
  file: string;
  type: 'lecture' | 'tutorial' | 'exam' | 'other';
  chapter?: string;     // Category for grouping
}
```

## Writing Content with LaTeX

### LaTeX Components

The app uses KaTeX for rendering mathematical formulas. Three components are available:

```tsx
import { Latex, LatexText, Formula } from '@/components/Latex'

// 1. Latex - Render pure LaTeX
<Latex>E = mc^2</Latex>
<Latex displayMode>\\frac{d}{dx}\\sin(x) = \\cos(x)</Latex>

// 2. LatexText - Mixed text with inline LaTeX
<LatexText>The formula $F = ma$ describes Newton's Second Law.</LatexText>

// 3. Formula - Styled formula block for lists
<Formula formula="$\\vec{F} = m\\vec{a}$" />
```

### Writing Formulas in courseData.ts

**Important:** In TypeScript strings, backslashes must be escaped!

```typescript
// ❌ Wrong - single backslash
formulas: ["$\vec{F} = m\vec{a}$"]

// ✅ Correct - double backslash
formulas: ["$\\vec{F} = m\\vec{a}$"]
```

### Inline vs Display LaTeX

- **Inline** (`$...$`): Use for formulas within text
  - Example: `"The momentum is $p = mv$."`
  
- **Display** (formulas array): Use for standalone key formulas
  - Example: `formulas: ["$\\vec{p} = m\\vec{v}$"]`

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

## Writing Explanations

### Philosophy: Make it Understandable for a 10th Grader

When writing the `explanation` field:

1. **Start with the intuition** - What is this concept in everyday terms?
2. **Use analogies** - Connect to familiar experiences
3. **Build step by step** - Don't assume prior knowledge
4. **Explain the "why"** - Not just the formula, but why it works
5. **Include examples** - Real-world applications help understanding

### Example Structure

```typescript
{
  id: "ch2-t1",
  title: "Newton's Second Law",
  content: "The net force on an object equals its mass times acceleration: $\\sum\\vec{F} = m\\vec{a}$.",
  explanation: `Newton's Second Law is like a recipe that connects three ingredients: force, mass, and acceleration.

Imagine pushing a shopping cart. If the cart is empty (small mass), a small push makes it accelerate quickly. But if the cart is full of groceries (large mass), you need a much bigger push to get the same acceleration.

The formula $\\sum\\vec{F} = m\\vec{a}$ tells us:
• More force → more acceleration
• More mass → less acceleration (for the same force)

The $\\sum$ symbol means "sum of all forces." If multiple forces act on an object, you add them up (as vectors) to find the net force.`,
  keyPoints: [
    "$\\sum\\vec{F} = m\\vec{a}$ - net force = mass × acceleration",
    "Force and acceleration are vectors (have direction)",
    "Mass is a scalar (magnitude only)",
    "Units: force in Newtons (N), mass in kg, acceleration in m/s²"
  ],
  formulas: [
    "$\\sum\\vec{F} = m\\vec{a}$",
    "$F = ma$ (scalar form)"
  ]
}
```

## Diagrams

### Mermaid Diagrams

For flowcharts, state diagrams, or concept maps, use Mermaid:

```typescript
diagrams: [
  {
    type: 'mermaid',
    content: `graph TD
      A[Force Applied] --> B{Object Mass}
      B -->|Light| C[High Acceleration]
      B -->|Heavy| D[Low Acceleration]`
  }
]
```

### LaTeX Diagrams

For mathematical diagrams (coordinate systems, vectors), use TikZ-style descriptions that can be rendered:

```typescript
diagrams: [
  {
    type: 'latex',
    content: `Vector diagram showing $\\vec{F}_1 + \\vec{F}_2 = \\vec{F}_{net}$`
  }
]
```

*Note: Full TikZ support requires additional implementation. Currently, describe diagrams in text.*

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
