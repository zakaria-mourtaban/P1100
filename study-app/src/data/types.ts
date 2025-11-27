// Type definitions for course data
// These interfaces define the structure of all course content

export interface Topic {
  id: string;
  title: string;
  content: string;           // Brief summary (supports $latex$ inline)
  explanation?: string;      // Detailed explanation in markdown with $latex$ inline
  formulas?: string[];       // LaTeX formulas for display mode
  diagrams?: {
    type: 'latex' | 'mermaid';
    content: string;
    caption?: string;
  }[];
  keyPoints?: string[];      // Bullet points for quick review (supports $latex$ inline)
  pdfRef?: { file: string; page: number };
}

export interface Exercise {
  id: string;
  title: string;
  problem: string;           // Supports markdown with $latex$
  solution?: string;         // Supports markdown with $latex$
  pdfRef?: { file: string; page: number };
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  icon: string;
  description: string;
  topics: Topic[];
  exercises: Exercise[];
  pdfs: string[];
}

export interface Flashcard {
  id: string;
  front: string;             // Supports $latex$ inline
  back: string;              // Supports $latex$ inline
  chapter: string;
}

export interface Exam {
  id: string;
  title: string;
  file: string;
}

export interface PdfFile {
  id: string;
  title: string;
  file: string;
  type: 'lecture' | 'tutorial' | 'exam' | 'other';
  chapter?: string;
}
