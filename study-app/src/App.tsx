import { useState, useCallback, useEffect } from 'react'
import { Routes, Route, useParams } from 'react-router-dom'
import { Sidebar } from './components/Sidebar'
import { HomePage } from './pages/HomePage'
import { ChapterPage } from './pages/ChapterPage'
import { FlashcardsPage } from './pages/FlashcardsPage'
import { ExamsPage } from './pages/ExamsPage'
import { PdfsPage } from './pages/PdfsPage'
import { SettingsPage } from './pages/SettingsPage'
import { PDFViewer } from './components/PDFViewer'
import { PDFPreloadDialog } from './components/PDFPreloadDialog'
import { PDFViewerContext } from './contexts/PDFViewerContext'
import { chapters, pdfFiles } from './data'
import { studyProgress } from './lib/studyProgress'
import { pdfCache } from './lib/pdfCache'

const PRELOAD_COMPLETE_KEY = 'studyApp_preloadComplete'

// Wrapper component for chapter pages with dynamic routing
function ChapterPageWrapper() {
  const { chapterId } = useParams<{ chapterId: string }>()
  const chapter = chapters.find(c => c.id === chapterId)
  
  useEffect(() => {
    if (chapter) {
      studyProgress.markChapterViewed(chapter.id)
    }
  }, [chapter])
  
  if (!chapter) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Chapter Not Found</h2>
        <p className="text-muted-foreground">The requested chapter does not exist.</p>
      </div>
    )
  }
  
  return <ChapterPage chapter={chapter} />
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [showPreloadDialog, setShowPreloadDialog] = useState(true)
  const [isCheckingCache, setIsCheckingCache] = useState(true)
  
  // PDF Viewer state
  const [pdfViewer, setPdfViewer] = useState<{
    isOpen: boolean
    filename: string
    page: number
  }>({
    isOpen: false,
    filename: '',
    page: 1
  })

  // Check if preload was completed previously
  useEffect(() => {
    const checkPreload = async () => {
      const completed = localStorage.getItem(PRELOAD_COMPLETE_KEY)
      if (completed) {
        // Verify that files are actually still cached
        const cachedCount = await pdfCache.getCacheCount()
        const totalCount = pdfFiles.length
        
        // If at least 80% cached, skip dialog
        if (cachedCount >= totalCount * 0.8) {
          setShowPreloadDialog(false)
        }
      }
      setIsCheckingCache(false)
    }
    checkPreload()
  }, [])

  const handlePreloadComplete = () => {
    localStorage.setItem(PRELOAD_COMPLETE_KEY, 'true')
    setShowPreloadDialog(false)
  }

  const openPDF = useCallback((filename: string, page: number = 1) => {
    // Track PDF view
    studyProgress.recordPDFView(filename)
    setPdfViewer({ isOpen: true, filename, page })
  }, [])

  const closePDF = useCallback(() => {
    setPdfViewer(prev => ({ ...prev, isOpen: false }))
  }, [])

  // Show nothing while checking cache
  if (isCheckingCache) {
    return null
  }

  // Show preload dialog if needed (blocks the entire app)
  if (showPreloadDialog) {
    return <PDFPreloadDialog onComplete={handlePreloadComplete} />
  }

  return (
    <PDFViewerContext.Provider value={{ openPDF }}>
      <div className="flex min-h-screen bg-background">
        <Sidebar 
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
          <div className="p-6">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/chapter/:chapterId" element={<ChapterPageWrapper />} />
              <Route path="/flashcards" element={<FlashcardsPage />} />
              <Route path="/exams" element={<ExamsPage />} />
              <Route path="/pdfs" element={<PdfsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </div>
        </main>
        
        {/* PDF Viewer Modal */}
        {pdfViewer.isOpen && (
          <PDFViewer 
            filename={pdfViewer.filename}
            initialPage={pdfViewer.page}
            onClose={closePDF}
          />
        )}
      </div>
    </PDFViewerContext.Provider>
  )
}

export default App
