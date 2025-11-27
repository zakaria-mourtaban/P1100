import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { pdfFiles } from '@/data/courseData'
import { usePDFViewerContext } from '@/contexts/PDFViewerContext'
import { FileText, ExternalLink, BookOpen, ClipboardList, FileQuestion } from 'lucide-react'

type PdfType = 'lecture' | 'tutorial' | 'exam' | 'other'

const typeIcons: Record<PdfType, React.ReactNode> = {
  lecture: <BookOpen className="h-5 w-5" />,
  tutorial: <ClipboardList className="h-5 w-5" />,
  exam: <FileQuestion className="h-5 w-5" />,
  other: <FileText className="h-5 w-5" />,
}

const typeColors: Record<PdfType, string> = {
  lecture: 'bg-blue-500/20 text-blue-400',
  tutorial: 'bg-green-500/20 text-green-400',
  exam: 'bg-purple-500/20 text-purple-400',
  other: 'bg-zinc-500/20 text-zinc-400',
}

export function PdfsPage() {
  const { openPDF } = usePDFViewerContext()

  const groupedPdfs = pdfFiles.reduce((acc, pdf) => {
    const chapter = pdf.chapter || 'Other'
    if (!acc[chapter]) acc[chapter] = []
    acc[chapter].push(pdf)
    return acc
  }, {} as Record<string, typeof pdfFiles>)

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">PDF Library</h1>
        <p className="text-muted-foreground">All course materials organized by chapter</p>
      </div>

      <div className="flex gap-2 flex-wrap justify-center">
        <Badge className={typeColors.lecture}>
          <BookOpen className="h-3 w-3 mr-1" />
          Lectures
        </Badge>
        <Badge className={typeColors.tutorial}>
          <ClipboardList className="h-3 w-3 mr-1" />
          Tutorials
        </Badge>
        <Badge className={typeColors.exam}>
          <FileQuestion className="h-3 w-3 mr-1" />
          Exams
        </Badge>
      </div>

      {Object.entries(groupedPdfs).map(([chapter, pdfs]) => (
        <Card key={chapter}>
          <CardHeader>
            <CardTitle className="text-lg">{chapter}</CardTitle>
            <CardDescription>{pdfs.length} file(s)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {pdfs.map((pdf) => (
              <div
                key={pdf.id}
                className="flex items-center justify-between p-3 rounded-lg bg-accent/30 hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded ${typeColors[pdf.type]}`}>
                    {typeIcons[pdf.type]}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{pdf.title}</p>
                    <p className="text-xs text-muted-foreground">{pdf.file}</p>
                  </div>
                </div>
                <Button size="sm" variant="ghost" onClick={() => openPDF(pdf.file)}>
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
