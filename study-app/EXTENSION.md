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
│   │   └── Sidebar.tsx   # Navigation sidebar
│   ├── data/
│   │   └── courseData.ts # Course content definitions
│   ├── pages/
│   │   ├── HomePage.tsx      # Dashboard
│   │   ├── ChapterPage.tsx   # Chapter content view
│   │   ├── FlashcardsPage.tsx # Flashcard study
│   │   ├── ExamsPage.tsx     # Past exams list
│   │   └── PdfsPage.tsx      # PDF library
│   ├── lib/
│   │   └── utils.ts      # Utility functions
│   ├── App.tsx           # Main app component
│   └── index.css         # Global styles
└── [PDFs in parent directory]
```

## Adding Course Content

### Step 1: Define Data Structures

The main data file is `src/data/courseData.ts`. Key interfaces:

```typescript
interface Topic {
  id: string;           // Unique identifier (e.g., "ch1-t1")
  title: string;        // Topic title
  content: string;      // Explanation text
  formulas?: string[];  // List of key formulas
  pdfRef?: {            // Reference to source PDF
    file: string;       // PDF filename
    page: number;       // Page number
  };
}

interface Exercise {
  id: string;
  title: string;
  problem: string;      // Problem statement
  solution?: string;    // Solution if available
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
  front: string;        // Question
  back: string;         // Answer
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

### Step 2: Populate Course Data

Edit the `chapters` array in `courseData.ts`:

```typescript
export const chapters: Chapter[] = [
  {
    id: "chapter1",
    number: 1,
    title: "Your Chapter Title",
    icon: "BookOpen",  // Pick from lucide-react icons
    description: "Brief chapter description",
    pdfs: ["lecture1.pdf", "tutorial1.pdf"],
    topics: [
      {
        id: "ch1-t1",
        title: "Topic Title",
        content: "Detailed explanation of the topic...",
        formulas: ["F = ma", "E = mc²"],
        pdfRef: { file: "lecture1.pdf", page: 5 }
      }
    ],
    exercises: [
      {
        id: "ch1-ex1",
        title: "Exercise Title",
        problem: "Problem statement...",
        solution: "Step-by-step solution...",
        pdfRef: { file: "tutorial1.pdf", page: 2 }
      }
    ]
  }
];
```

### Step 3: Add Flashcards

```typescript
export const flashcards: Flashcard[] = [
  {
    id: "fc1",
    front: "What is Newton's First Law?",
    back: "An object at rest stays at rest...",
    chapter: "chapter1"
  }
];
```

### Step 4: Register PDF Files

```typescript
export const pdfFiles: PdfFile[] = [
  {
    id: "pdf1",
    title: "Lecture 1",
    file: "lecture1.pdf",
    type: "lecture",
    chapter: "Chapter 1 - Introduction"
  }
];

export const exams = [
  { id: "exam1", title: "Final 2024", file: "final-2024.pdf" }
];
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

```bash
npm run build
```

Output will be in the `dist/` folder. Deploy to any static hosting.

## Troubleshooting

### PDFs not opening
- Check that PDF files are in the parent directory
- Verify filenames match exactly (case-sensitive)

### Icons not showing
- Ensure icon name matches Lucide icon exactly
- Import the icon in `Sidebar.tsx`

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

---

For questions or improvements, feel free to extend this documentation!
