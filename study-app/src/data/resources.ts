import type { Exam, PdfFile } from './types'

export const exams: Exam[] = [
  { id: "exam1", title: "2023-2024 Session 2", file: "P1100 2023-2024 s2 - En.pdf" },
  { id: "exam2", title: "2024-2025 Session 2", file: "P1100 2024-2025 s2 - En.pdf" },
  { id: "exam3", title: "1st & 2nd Session", file: "P1100 1st & 2nd session .pdf" },
  { id: "exam4", title: "Partial 2017-2018 Solution", file: "sol partial 17-18.pdf" },
  { id: "exam5", title: "Partial 2018-2019 Solution", file: "sol partial 18-19.pdf" },
  { id: "exam6", title: "Partial 2019-2020 Solution", file: "sol partial 19-20.pdf" }
]

export const pdfFiles: PdfFile[] = [
  // Chapter 0
  { id: "pdf1", title: "Mathematical Notions", file: "Chap 0 - Mathematical Notions.pdf", type: "lecture", chapter: "Chapter 0 - Mathematical Foundations" },
  
  // Chapter 1
  { id: "pdf2", title: "Lecture 1", file: "ch 1-Lecture 1.pdf", type: "lecture", chapter: "Chapter 1 - Kinematics" },
  { id: "pdf3", title: "Lecture 2", file: "ch 1-Lecture 2.pdf", type: "lecture", chapter: "Chapter 1 - Kinematics" },
  { id: "pdf4", title: "Lecture 3", file: "ch 1-Lecture 3.pdf", type: "lecture", chapter: "Chapter 1 - Kinematics" },
  { id: "pdf5", title: "Lecture 4", file: "ch 1-Lecture 4.pdf", type: "lecture", chapter: "Chapter 1 - Kinematics" },
  { id: "pdf6", title: "Tutorial", file: "Chap 1 - Tutorial.pdf", type: "tutorial", chapter: "Chapter 1 - Kinematics" },
  { id: "pdf7", title: "Tutorial (Given)", file: "P1100 -Tutorial Chap 1 - Given.pdf", type: "tutorial", chapter: "Chapter 1 - Kinematics" },
  
  // Chapter 2
  { id: "pdf8", title: "Dynamics Course", file: "P1100 - Chap 2 - Dynamics.pdf", type: "lecture", chapter: "Chapter 2 - Dynamics" },
  { id: "pdf9", title: "Dynamics Part 1", file: "P1100 chap 2 part 1.pdf", type: "lecture", chapter: "Chapter 2 - Dynamics" },
  { id: "pdf10", title: "Dynamics Part 2", file: "P1100-chap2-part2.pdf", type: "lecture", chapter: "Chapter 2 - Dynamics" },
  { id: "pdf11", title: "Tutorial (Given)", file: "P1100 -Tutorial Chap 2 - Given.pdf", type: "tutorial", chapter: "Chapter 2 - Dynamics" },
  { id: "pdf12", title: "Exercises 1-8", file: "P1100 - chap2- ex 1to8.pdf", type: "tutorial", chapter: "Chapter 2 - Dynamics" },
  
  // Chapter 3
  { id: "pdf13", title: "Course + Applications", file: "P1100_Chapter3_course+applications.pdf", type: "lecture", chapter: "Chapter 3 - Work & Energy" },
  { id: "pdf14", title: "Chapter 3 Notes", file: "chapter 3 p1100 .pdf", type: "lecture", chapter: "Chapter 3 - Work & Energy" },
  { id: "pdf15", title: "Applications", file: "P 1100 - Applications - chap 3.pdf", type: "lecture", chapter: "Chapter 3 - Work & Energy" },
  { id: "pdf16", title: "Tutorial 2024-2025", file: "P1100 - Tutorial Chap 3 - Given- 2024-2025.pdf", type: "tutorial", chapter: "Chapter 3 - Work & Energy" },
  { id: "pdf17", title: "Tutorial", file: "P1100- chap 3 -tuto.pdf", type: "tutorial", chapter: "Chapter 3 - Work & Energy" },
  { id: "pdf18", title: "TD Chap 3", file: "P1100 td chap 3.pdf", type: "tutorial", chapter: "Chapter 3 - Work & Energy" },
  
  // Chapter 4
  { id: "pdf19", title: "Course + Exercises", file: "Chap 4 - cours + ex tutoro.pdf", type: "lecture", chapter: "Chapter 4 - Linear Momentum" },
  { id: "pdf20", title: "Applications", file: "P 1100 - Applications - chap 4.pdf", type: "lecture", chapter: "Chapter 4 - Linear Momentum" },
  { id: "pdf21", title: "Tutorial 2025-2026", file: "P1100 - Tutorial Chap 4 - Given- 2025-2026.pdf", type: "tutorial", chapter: "Chapter 4 - Linear Momentum" },
  { id: "pdf22", title: "Tutorial (Given)", file: "P1100 - Tutorial Chap 4 - Given.pdf", type: "tutorial", chapter: "Chapter 4 - Linear Momentum" },
  
  // Chapter 5
  { id: "pdf23", title: "Tutorial (Given)", file: "P1100 - Tutorial Chap 5 - Given.pdf", type: "tutorial", chapter: "Chapter 5 - Rotational Dynamics" },
  
  // Exams
  { id: "pdf24", title: "2023-2024 Session 2", file: "P1100 2023-2024 s2 - En.pdf", type: "exam", chapter: "Exams" },
  { id: "pdf25", title: "2024-2025 Session 2", file: "P1100 2024-2025 s2 - En.pdf", type: "exam", chapter: "Exams" },
  { id: "pdf26", title: "1st & 2nd Session", file: "P1100 1st & 2nd session .pdf", type: "exam", chapter: "Exams" },
  { id: "pdf27", title: "Partial 17-18 Solution", file: "sol partial 17-18.pdf", type: "exam", chapter: "Exams" },
  { id: "pdf28", title: "Partial 18-19 Solution", file: "sol partial 18-19.pdf", type: "exam", chapter: "Exams" },
  { id: "pdf29", title: "Partial 19-20 Solution", file: "sol partial 19-20.pdf", type: "exam", chapter: "Exams" },
  
  // Resources
  { id: "pdf30", title: "Course Summary", file: "Summary - P1100.pdf", type: "other", chapter: "Resources" },
  { id: "pdf31", title: "Exercises 10-12-13-15-17", file: "Ex10-12-13-15-17.pdf", type: "tutorial", chapter: "Resources" },
  { id: "pdf32", title: "Formulas (er-eθ-t-n)", file: "p1100(er-eø-t-n).pdf", type: "other", chapter: "Resources" }
]
