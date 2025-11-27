import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { exams } from '@/data'
import { usePDFViewerContext } from '@/contexts/PDFViewerContext'
import { FileText, ExternalLink } from 'lucide-react'

export function ExamsPage() {
  const { openPDF } = usePDFViewerContext()

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Past Exams</h1>
        <p className="text-muted-foreground">Practice with previous examination papers and solutions</p>
      </div>

      <div className="grid gap-4">
        {exams.map((exam) => (
          <Card key={exam.id} className="hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-primary" />
                  <div>
                    <CardTitle className="text-lg">{exam.title}</CardTitle>
                    <CardDescription>{exam.file}</CardDescription>
                  </div>
                </div>
                <Button onClick={() => openPDF(exam.file)}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open PDF
                </Button>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card className="bg-accent/50">
        <CardContent className="py-6">
          <div className="flex items-start gap-4">
            <Badge variant="secondary" className="mt-1">Tip</Badge>
            <div className="space-y-2">
              <p className="font-medium">How to use past exams effectively:</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>First attempt problems without looking at solutions</li>
                <li>Time yourself to simulate exam conditions</li>
                <li>Review solutions only after your attempt</li>
                <li>Identify weak areas and revisit those chapters</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
