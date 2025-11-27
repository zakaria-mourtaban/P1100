import { useState, useCallback } from 'react'

// Hook for managing PDF viewer state
export function usePDFViewer() {
  const [viewerState, setViewerState] = useState<{
    isOpen: boolean
    filename: string
    page: number
  }>({
    isOpen: false,
    filename: '',
    page: 1
  })

  const openPDF = useCallback((filename: string, page: number = 1) => {
    setViewerState({ isOpen: true, filename, page })
  }, [])

  const closePDF = useCallback(() => {
    setViewerState(prev => ({ ...prev, isOpen: false }))
  }, [])

  return {
    ...viewerState,
    openPDF,
    closePDF
  }
}
