import { useState, useCallback, useEffect } from 'react'
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

export type PageType = 'home' | 'flashcards' | 'exams' | 'pdfs' | 'settings' | string

const PRELOAD_COMPLETE_KEY = 'studyApp_preloadComplete'

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home')
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

  const renderPage = () => {
    if (currentPage === 'home') return <HomePage onNavigate={setCurrentPage} />
    if (currentPage === 'flashcards') return <FlashcardsPage />
    if (currentPage === 'exams') return <ExamsPage />
    if (currentPage === 'pdfs') return <PdfsPage />
    if (currentPage === 'settings') return <SettingsPage />
    
    const chapter = chapters.find(c => c.id === currentPage)
    if (chapter) {
      // Track chapter view
      studyProgress.markChapterViewed(chapter.id)
      return <ChapterPage chapter={chapter} />
    }
    
    return <HomePage onNavigate={setCurrentPage} />
  }

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
          currentPage={currentPage} 
          onNavigate={setCurrentPage}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
          <div className="p-6">
            {renderPage()}
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
