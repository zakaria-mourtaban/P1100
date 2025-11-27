import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Progress } from './ui/progress'
import { pdfCache, formatBytes } from '@/lib/pdfCache'
import { pdfFiles } from '@/data/courseData'
import { 
  Download, 
  CheckCircle2, 
  XCircle,
  FileText,
  HardDrive,
  Loader2,
  Atom
} from 'lucide-react'

interface PDFPreloadDialogProps {
  onComplete: () => void
}

interface FileToDownload {
  filename: string
  estimatedSize: number
}

export function PDFPreloadDialog({ onComplete }: PDFPreloadDialogProps) {
  const [filesToDownload, setFilesToDownload] = useState<FileToDownload[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDownloading, setIsDownloading] = useState(false)
  const [currentFile, setCurrentFile] = useState('')
  const [progress, setProgress] = useState(0)
  const [completed, setCompleted] = useState(0)
  const [downloadedBytes, setDownloadedBytes] = useState(0)
  const [errors, setErrors] = useState<string[]>([])
  const [isComplete, setIsComplete] = useState(false)

  // Total estimated size: 67.5 MB for all PDFs
  const totalEstimatedSize = 67.5 * 1024 * 1024 // 67.5 MB

  // Prevent body scroll when dialog is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    const checkFiles = async () => {
      setIsLoading(true)
      const cachedFiles = await pdfCache.getAllCached()
      const allFiles = pdfFiles.map(p => p.file)
      const uncached = allFiles.filter(f => !cachedFiles.includes(f))
      
      setFilesToDownload(uncached.map(filename => ({
        filename,
        estimatedSize: 0
      })))
      setIsLoading(false)

      // If all files are already cached, mark complete
      if (uncached.length === 0) {
        setIsComplete(true)
      }
    }

    checkFiles()
  }, [])

  const handleDownload = async () => {
    setIsDownloading(true)
    setErrors([])
    setDownloadedBytes(0)
    
    const errorList: string[] = []
    let totalBytes = 0

    for (let i = 0; i < filesToDownload.length; i++) {
      const file = filesToDownload[i]
      setCurrentFile(file.filename)
      setProgress((i / filesToDownload.length) * 100)

      try {
        // Fetch with progress tracking
        const response = await fetch(`/pdfs/${encodeURIComponent(file.filename)}`)
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        
        const data = await response.arrayBuffer()
        await pdfCache.set(file.filename, data)
        
        totalBytes += data.byteLength
        setDownloadedBytes(totalBytes)
        setCompleted(i + 1)
      } catch {
        errorList.push(file.filename)
      }

      setProgress(((i + 1) / filesToDownload.length) * 100)
    }

    setErrors(errorList)
    setIsDownloading(false)
    setIsComplete(true)
  }

  return (
    <div className="fixed inset-0 z-100 bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-center p-6 border-b border-border bg-card">
        <div className="flex items-center gap-3">
          <Atom className="h-10 w-10 text-primary" />
          <div>
            <h1 className="text-2xl font-bold">P1100 Study App</h1>
            <p className="text-sm text-muted-foreground">Classical Mechanics</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="min-h-full flex items-center justify-center p-6">
          <div className="max-w-xl w-full my-auto">
          {isLoading ? (
            <div className="text-center py-12">
              <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Preparing your study materials...</h2>
              <p className="text-muted-foreground">Checking which files need to be downloaded</p>
            </div>
          ) : isComplete ? (
            <div className="text-center py-12 space-y-6">
              {errors.length === 0 ? (
                <>
                  <CheckCircle2 className="h-20 w-20 text-green-500 mx-auto" />
                  <div>
                    <h2 className="text-2xl font-bold mb-2">You're All Set!</h2>
                    <p className="text-muted-foreground">
                      All {filesToDownload.length > 0 ? filesToDownload.length : pdfFiles.length} PDFs are ready for offline access.
                    </p>
                    {downloadedBytes > 0 && (
                      <p className="text-sm text-muted-foreground mt-2">
                        Downloaded {formatBytes(downloadedBytes)}
                      </p>
                    )}
                  </div>
                  <Button size="lg" onClick={onComplete} className="mt-4">
                    Start Studying
                  </Button>
                </>
              ) : (
                <>
                  <XCircle className="h-20 w-20 text-yellow-500 mx-auto" />
                  <div>
                    <h2 className="text-2xl font-bold mb-2">
                      {filesToDownload.length - errors.length} of {filesToDownload.length} Downloaded
                    </h2>
                    <p className="text-muted-foreground mb-4">
                      Some files couldn't be downloaded. You can still use the app.
                    </p>
                    <div className="text-left bg-destructive/10 p-4 rounded-lg max-h-32 overflow-y-auto mx-auto max-w-sm">
                      <p className="text-sm font-medium text-destructive mb-2">Failed files:</p>
                      {errors.map(f => (
                        <p key={f} className="text-xs text-muted-foreground">• {f}</p>
                      ))}
                    </div>
                  </div>
                  <Button size="lg" onClick={onComplete} className="mt-4">
                    Continue Anyway
                  </Button>
                </>
              )}
            </div>
          ) : isDownloading ? (
            <div className="py-12 space-y-8">
              <div className="text-center">
                <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Downloading Course Materials</h2>
                <p className="text-muted-foreground">Please wait while we prepare your study materials</p>
              </div>

              {/* Progress Section */}
              <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Progress</span>
                  <span className="text-muted-foreground">
                    {completed} of {filesToDownload.length} files
                  </span>
                </div>
                
                <Progress value={progress} className="h-4" />
                
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{Math.round(progress)}% complete</span>
                  <span>{formatBytes(downloadedBytes)} downloaded</span>
                </div>

                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground">Currently downloading:</p>
                  <p className="text-sm font-medium truncate mt-1">{currentFile}</p>
                </div>
              </div>

              <p className="text-center text-sm text-muted-foreground">
                ⚡ Files are stored locally for instant access
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Welcome Section */}
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Welcome to P1100 Study App</h2>
                <p className="text-muted-foreground">
                  Before you begin, let's download the course materials for the best experience.
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-card border border-border p-6 rounded-xl text-center">
                  <FileText className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <div className="text-3xl font-bold">{filesToDownload.length}</div>
                  <div className="text-sm text-muted-foreground">PDF Files</div>
                </div>
                <div className="bg-card border border-border p-6 rounded-xl text-center">
                  <HardDrive className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <div className="text-3xl font-bold">~{formatBytes(totalEstimatedSize)}</div>
                  <div className="text-sm text-muted-foreground">Total Size</div>
                </div>
              </div>

              {/* File List Preview */}
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="p-4 bg-accent/30 border-b border-border">
                  <span className="font-medium">Files to download</span>
                </div>
                <div className="max-h-48 overflow-y-auto p-3 space-y-1">
                  {filesToDownload.slice(0, 10).map(file => (
                    <div 
                      key={file.filename}
                      className="flex items-center gap-2 p-2 text-sm rounded bg-accent/20"
                    >
                      <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span className="truncate">{file.filename}</span>
                    </div>
                  ))}
                  {filesToDownload.length > 10 && (
                    <p className="text-sm text-muted-foreground text-center py-2">
                      ... and {filesToDownload.length - 10} more files
                    </p>
                  )}
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
                <p className="text-sm">
                  <strong>✨ Benefits of downloading:</strong>
                </p>
                <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                  <li>• Instant PDF loading with no wait time</li>
                  <li>• Works offline - study anywhere</li>
                  <li>• Files are cached in your browser</li>
                </ul>
              </div>

              {/* Action Button */}
              <Button 
                size="lg" 
                onClick={handleDownload} 
                className="w-full h-14 text-lg"
              >
                <Download className="h-5 w-5 mr-2" />
                Download All Files
              </Button>
            </div>
          )}
        </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 border-t border-border bg-card text-center text-sm text-muted-foreground space-y-1">
        <p>Lebanese University • Faculty of Sciences, B3</p>
        <p>
          Found inaccurate information?{' '}
          <a 
            href="https://github.com/zakaria-mourtaban/P1100/issues" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Open an issue on GitHub
          </a>
        </p>
      </footer>
    </div>
  )
}
