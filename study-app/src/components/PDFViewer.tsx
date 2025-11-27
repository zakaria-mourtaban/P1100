import { useState, useEffect, useCallback, useMemo } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { Button } from './ui/button'
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  Download,
  Loader2,
  Maximize2,
  Minimize2
} from 'lucide-react'
import { fetchAndCachePDF } from '@/lib/pdfCache'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

interface PDFViewerProps {
  filename: string
  initialPage?: number
  onClose: () => void
}

export function PDFViewer({ filename, initialPage = 1, onClose }: PDFViewerProps) {
  const [pdfData, setPdfData] = useState<Uint8Array | null>(null)
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState<number>(initialPage)
  const [scale, setScale] = useState<number>(1.0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Memoize the file object to prevent unnecessary reloads
  const fileObject = useMemo(() => {
    if (!pdfData) return null
    return { data: pdfData }
  }, [pdfData])

  useEffect(() => {
    let mounted = true
    
    async function loadPDF() {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchAndCachePDF(filename)
        if (mounted) {
          // Convert ArrayBuffer to Uint8Array for react-pdf
          setPdfData(new Uint8Array(data))
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to load PDF')
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    loadPDF()
    return () => { mounted = false }
  }, [filename])

  useEffect(() => {
    setPageNumber(initialPage)
  }, [initialPage])

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
    if (initialPage > numPages) {
      setPageNumber(1)
    }
  }, [initialPage])

  const goToPrevPage = () => setPageNumber(prev => Math.max(1, prev - 1))
  const goToNextPage = () => setPageNumber(prev => Math.min(numPages, prev + 1))
  const zoomIn = () => setScale(prev => Math.min(3, prev + 0.2))
  const zoomOut = () => setScale(prev => Math.max(0.5, prev - 0.2))

  const handleDownload = () => {
    window.open(`/pdfs/${encodeURIComponent(filename)}`, '_blank')
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') setPageNumber(prev => Math.max(1, prev - 1))
      if (e.key === 'ArrowRight') setPageNumber(prev => Math.min(numPages, prev + 1))
      if (e.key === '+' || e.key === '=') setScale(prev => Math.min(3, prev + 0.2))
      if (e.key === '-') setScale(prev => Math.max(0.5, prev - 0.2))
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [numPages, onClose])

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card/50">
        <div className="flex items-center gap-4">
          <h2 className="font-medium text-sm truncate max-w-[300px]" title={filename}>
            {filename}
          </h2>
          {numPages > 0 && (
            <span className="text-xs text-muted-foreground">
              Page {pageNumber} of {numPages}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Page navigation */}
          <div className="flex items-center gap-1 mr-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={goToPrevPage} 
              disabled={pageNumber <= 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <input
              type="number"
              value={pageNumber}
              onChange={(e) => {
                const val = parseInt(e.target.value)
                if (val >= 1 && val <= numPages) {
                  setPageNumber(val)
                }
              }}
              className="w-12 text-center text-sm bg-accent border border-border rounded px-2 py-1"
              min={1}
              max={numPages}
            />
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={goToNextPage} 
              disabled={pageNumber >= numPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Zoom controls */}
          <div className="flex items-center gap-1 border-l border-border pl-2">
            <Button variant="ghost" size="sm" onClick={zoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-xs w-12 text-center">{Math.round(scale * 100)}%</span>
            <Button variant="ghost" size="sm" onClick={zoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 border-l border-border pl-2">
            <Button variant="ghost" size="sm" onClick={toggleFullscreen}>
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* PDF Content */}
      <div className="flex-1 overflow-auto flex justify-center py-4 bg-zinc-900">
        {loading && (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Loading PDF...</span>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center h-full text-destructive">
            <p className="text-lg font-medium">Error loading PDF</p>
            <p className="text-sm text-muted-foreground">{error}</p>
            <Button className="mt-4" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        )}

        {pdfData && !loading && !error && fileObject && (
          <Document
            file={fileObject}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex items-center">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            }
            error={
              <div className="text-destructive">Failed to render PDF</div>
            }
          >
            <Page 
              pageNumber={pageNumber} 
              scale={scale}
              className="shadow-2xl"
              renderTextLayer={true}
              renderAnnotationLayer={true}
            />
          </Document>
        )}
      </div>

      {/* Footer with keyboard hints */}
      <div className="px-4 py-2 border-t border-border bg-card/50 text-xs text-muted-foreground text-center">
        <span className="mr-4">← → Navigate pages</span>
        <span className="mr-4">+ - Zoom</span>
        <span>Esc Close</span>
      </div>
    </div>
  )
}
