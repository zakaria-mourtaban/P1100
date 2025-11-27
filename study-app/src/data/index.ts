// Main course data index file
// This file re-exports all course data from organized modules
// For easier maintenance, content is split into logical files

// Type definitions
export * from './types'

// Course content
export { chapters } from './chapters'
export { flashcards } from './flashcards'
export { exams, pdfFiles } from './resources'
