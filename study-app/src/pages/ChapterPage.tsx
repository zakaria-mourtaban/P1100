import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FileText, ExternalLink, BookOpen, PenTool } from 'lucide-react'
import { usePDFViewerContext } from '@/contexts/PDFViewerContext'
import type { Chapter } from '@/data/courseData'

interface ChapterPageProps {
  chapter: Chapter
}

export function ChapterPage({ chapter }: ChapterPageProps) {
  const { openPDF } = usePDFViewerContext()

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">Chapter {chapter.number}</Badge>
        </div>
        <h1 className="text-3xl font-bold">{chapter.title}</h1>
        <p className="text-muted-foreground">{chapter.description}</p>
      </div>

      {/* PDF References */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Reference Materials
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {chapter.pdfs.map((pdf, idx) => (
              <Button key={idx} variant="outline" size="sm" onClick={() => openPDF(pdf)}>
                <ExternalLink className="h-4 w-4 mr-2" />
                {pdf.replace('.pdf', '')}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Content Tabs */}
      <Tabs defaultValue="topics" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="topics" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Topics ({chapter.topics.length})
          </TabsTrigger>
          <TabsTrigger value="exercises" className="flex items-center gap-2">
            <PenTool className="h-4 w-4" />
            Exercises ({chapter.exercises.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="topics" className="mt-4">
          <Accordion type="single" collapsible className="w-full">
            {chapter.topics.map((topic, idx) => (
              <AccordionItem key={topic.id} value={topic.id}>
                <AccordionTrigger className="text-left">
                  <span className="flex items-center gap-3">
                    <Badge variant="outline" className="shrink-0">{idx + 1}</Badge>
                    {topic.title}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pl-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {topic.content}
                    </p>
                    
                    {topic.formulas && topic.formulas.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Key Formulas:</h4>
                        <div className="grid gap-2">
                          {topic.formulas.map((formula, fIdx) => (
                            <div key={fIdx} className="formula">
                              {formula}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {topic.pdfRef && (
                      <Button 
                        variant="link" 
                        size="sm" 
                        className="p-0 h-auto text-primary"
                        onClick={() => openPDF(topic.pdfRef!.file, topic.pdfRef!.page)}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View in PDF (Page {topic.pdfRef.page})
                      </Button>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>

        <TabsContent value="exercises" className="mt-4">
          {chapter.exercises.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No exercises available for this chapter yet.
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {chapter.exercises.map((exercise, idx) => (
                <Card key={exercise.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Badge>{idx + 1}</Badge>
                          {exercise.title}
                        </CardTitle>
                      </div>
                      {exercise.pdfRef && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openPDF(exercise.pdfRef!.file, exercise.pdfRef!.page)}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Open PDF
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-foreground/80">
                      {exercise.problem}
                    </CardDescription>
                    {exercise.solution && (
                      <div className="mt-4 p-4 bg-success/10 rounded-lg border border-success/20">
                        <h4 className="font-semibold text-sm mb-2 text-success">Solution:</h4>
                        <p className="text-sm">{exercise.solution}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
