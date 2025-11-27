import { createContext, useContext } from 'react'

// PDF Viewer Context
export interface PDFViewerContextType {
  openPDF: (filename: string, page?: number) => void
}

export const PDFViewerContext = createContext<PDFViewerContextType | null>(null)

export function usePDFViewerContext() {
  const context = useContext(PDFViewerContext)
  if (!context) {
    throw new Error('usePDFViewerContext must be used within App')
  }
  return context
}
