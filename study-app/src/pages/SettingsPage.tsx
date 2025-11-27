import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { pdfCache, formatBytes, type PDFInfo } from '@/lib/pdfCache'
import { studyProgress } from '@/lib/studyProgress'
import { pdfFiles } from '@/data/courseData'
import { 
  HardDrive, 
  Trash2, 
  Download, 
  RefreshCw, 
  CheckCircle2,
  XCircle,
  AlertTriangle,
  BarChart3,
  Clock,
  BookOpen,
  FileText,
  Brain
} from 'lucide-react'

interface DownloadState {
  isDownloading: boolean
  currentFile: string
  progress: number
  downloaded: number
  total: number
  errors: string[]
}

export function SettingsPage() {
  const [cacheInfo, setCacheInfo] = useState<{
    size: number
    count: number
    files: PDFInfo[]
  }>({ size: 0, count: 0, files: [] })
  
  const [stats, setStats] = useState(studyProgress.getStats())
  const [downloadState, setDownloadState] = useState<DownloadState>({
    isDownloading: false,
    currentFile: '',
    progress: 0,
    downloaded: 0,
    total: 0,
    errors: []
  })
  const [showConfirmClear, setShowConfirmClear] = useState(false)
  const [showConfirmReset, setShowConfirmReset] = useState(false)

  const loadCacheInfo = async () => {
    const [size, count, files] = await Promise.all([
      pdfCache.getCacheSize(),
      pdfCache.getCacheCount(),
      pdfCache.getAllInfo()
    ])
    setCacheInfo({ size, count, files })
  }

  useEffect(() => {
    loadCacheInfo()
    setStats(studyProgress.getStats())
  }, [])

  const handleClearCache = async () => {
    await pdfCache.clear()
    await loadCacheInfo()
    setShowConfirmClear(false)
  }

  const handleResetProgress = () => {
    studyProgress.reset()
    setStats(studyProgress.getStats())
    setShowConfirmReset(false)
  }

  const handleDownloadAll = async () => {
    const allFiles = pdfFiles.map(p => p.file)
    const cachedFiles = await pdfCache.getAllCached()
    const filesToDownload = allFiles.filter(f => !cachedFiles.includes(f))

    if (filesToDownload.length === 0) {
      alert('All PDFs are already cached!')
      return
    }

    setDownloadState({
      isDownloading: true,
      currentFile: '',
      progress: 0,
      downloaded: 0,
      total: filesToDownload.length,
      errors: []
    })

    const errors: string[] = []
    const baseUrl = import.meta.env.BASE_URL || '/'

    for (let i = 0; i < filesToDownload.length; i++) {
      const filename = filesToDownload[i]
      setDownloadState(prev => ({
        ...prev,
        currentFile: filename,
        progress: ((i) / filesToDownload.length) * 100
      }))

      try {
        const response = await fetch(`${baseUrl}pdfs/${encodeURIComponent(filename)}`)
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const data = await response.arrayBuffer()
        await pdfCache.set(filename, data)
      } catch {
        errors.push(filename)
      }

      setDownloadState(prev => ({
        ...prev,
        downloaded: i + 1,
        progress: ((i + 1) / filesToDownload.length) * 100
      }))
    }

    setDownloadState(prev => ({
      ...prev,
      isDownloading: false,
      errors
    }))

    await loadCacheInfo()
  }

  const uncachedCount = pdfFiles.length - cacheInfo.count

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Settings & Storage</h1>
        <p className="text-muted-foreground">Manage cache, progress, and app settings</p>
      </div>

      {/* Study Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Study Statistics
          </CardTitle>
          <CardDescription>Your learning progress at a glance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-accent/30 rounded-lg">
              <BookOpen className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{stats.chaptersViewedCount}</div>
              <div className="text-xs text-muted-foreground">Chapters Viewed</div>
            </div>
            <div className="text-center p-4 bg-accent/30 rounded-lg">
              <CheckCircle2 className="h-6 w-6 mx-auto mb-2 text-green-500" />
              <div className="text-2xl font-bold">{stats.topicsCompletedCount}</div>
              <div className="text-xs text-muted-foreground">Topics Completed</div>
            </div>
            <div className="text-center p-4 bg-accent/30 rounded-lg">
              <Brain className="h-6 w-6 mx-auto mb-2 text-purple-500" />
              <div className="text-2xl font-bold">{stats.flashcardsKnownCount}</div>
              <div className="text-xs text-muted-foreground">Cards Mastered</div>
            </div>
            <div className="text-center p-4 bg-accent/30 rounded-lg">
              <FileText className="h-6 w-6 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold">{stats.totalPDFViews}</div>
              <div className="text-xs text-muted-foreground">PDF Views</div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              Study time: {stats.totalStudyTimeFormatted}
            </span>
            <span>{stats.daysSinceStart} day(s) since you started</span>
          </div>
        </CardContent>
      </Card>

      {/* PDF Cache */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HardDrive className="h-5 w-5" />
            PDF Cache
          </CardTitle>
          <CardDescription>
            Cached PDFs load instantly without internet
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{formatBytes(cacheInfo.size)}</div>
              <div className="text-sm text-muted-foreground">
                {cacheInfo.count} of {pdfFiles.length} PDFs cached
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={loadCacheInfo}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>

          <Progress value={(cacheInfo.count / pdfFiles.length) * 100} className="h-2" />

          {uncachedCount > 0 && !downloadState.isDownloading && (
            <div className="p-4 bg-accent/30 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium">{uncachedCount} PDF(s) not cached</p>
                  <p className="text-sm text-muted-foreground mb-3">
                    Download all PDFs now for offline access and faster loading.
                  </p>
                  <Button onClick={handleDownloadAll}>
                    <Download className="h-4 w-4 mr-2" />
                    Download All ({uncachedCount} files)
                  </Button>
                </div>
              </div>
            </div>
          )}

          {downloadState.isDownloading && (
            <div className="p-4 bg-primary/10 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">Downloading PDFs...</span>
                <span className="text-sm text-muted-foreground">
                  {downloadState.downloaded} / {downloadState.total}
                </span>
              </div>
              <Progress value={downloadState.progress} className="h-2" />
              <p className="text-sm text-muted-foreground truncate">
                {downloadState.currentFile}
              </p>
            </div>
          )}

          {downloadState.errors.length > 0 && !downloadState.isDownloading && (
            <div className="p-4 bg-destructive/10 rounded-lg">
              <div className="flex items-start gap-2">
                <XCircle className="h-5 w-5 text-destructive mt-0.5" />
                <div>
                  <p className="font-medium text-destructive">
                    {downloadState.errors.length} file(s) failed to download
                  </p>
                  <ul className="text-sm text-muted-foreground mt-1">
                    {downloadState.errors.slice(0, 3).map(f => (
                      <li key={f}>• {f}</li>
                    ))}
                    {downloadState.errors.length > 3 && (
                      <li>• and {downloadState.errors.length - 3} more...</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Cached files list */}
          {cacheInfo.files.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Cached Files</h4>
              <div className="max-h-48 overflow-y-auto space-y-1">
                {cacheInfo.files.map(file => (
                  <div 
                    key={file.filename}
                    className="flex items-center justify-between p-2 text-sm bg-accent/20 rounded"
                  >
                    <span className="truncate flex-1">{file.filename}</span>
                    <Badge variant="secondary" className="ml-2">
                      {formatBytes(file.size)}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="text-destructive flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Danger Zone
          </CardTitle>
          <CardDescription>Irreversible actions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Clear Cache */}
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <p className="font-medium">Clear PDF Cache</p>
              <p className="text-sm text-muted-foreground">
                Remove all cached PDFs ({formatBytes(cacheInfo.size)})
              </p>
            </div>
            {showConfirmClear ? (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowConfirmClear(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" size="sm" onClick={handleClearCache}>
                  Confirm
                </Button>
              </div>
            ) : (
              <Button variant="outline" onClick={() => setShowConfirmClear(true)}>
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Cache
              </Button>
            )}
          </div>

          {/* Reset Progress */}
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <p className="font-medium">Reset Study Progress</p>
              <p className="text-sm text-muted-foreground">
                Clear all your learning statistics and start fresh
              </p>
            </div>
            {showConfirmReset ? (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowConfirmReset(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" size="sm" onClick={handleResetProgress}>
                  Confirm
                </Button>
              </div>
            ) : (
              <Button variant="outline" onClick={() => setShowConfirmReset(true)}>
                <Trash2 className="h-4 w-4 mr-2" />
                Reset Progress
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
