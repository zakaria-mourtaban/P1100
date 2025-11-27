import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { chapters } from '@/data'
import { BookOpen, Target, Clock, ArrowRight } from 'lucide-react'
import type { PageType } from '@/App'

interface HomePageProps {
  onNavigate: (page: PageType) => void
}

export function HomePage({ onNavigate }: HomePageProps) {
  const totalTopics = chapters.reduce((acc, ch) => acc + ch.topics.length, 0)
  const totalExercises = chapters.reduce((acc, ch) => acc + ch.exercises.length, 0)

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold mb-4">P1100 - Classical Mechanics</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Your comprehensive study companion for Classical Mechanics. 
          Master kinematics, dynamics, energy, momentum, and rotational motion.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Chapters</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{chapters.length}</div>
            <p className="text-xs text-muted-foreground">Complete course material</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Topics</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTopics}</div>
            <p className="text-xs text-muted-foreground">Key concepts to master</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Exercises</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalExercises}</div>
            <p className="text-xs text-muted-foreground">Practice problems</p>
          </CardContent>
        </Card>
      </div>

      {/* Study Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Study Progress</CardTitle>
          <CardDescription>Track your learning journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span className="text-muted-foreground">Start studying to track!</span>
            </div>
            <Progress value={0} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Chapters Grid */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Course Chapters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {chapters.map((chapter) => (
            <Card key={chapter.id} className="hover:border-primary/50 transition-colors cursor-pointer group" onClick={() => onNavigate(chapter.id)}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    Chapter {chapter.number}: {chapter.title}
                  </CardTitle>
                </div>
                <CardDescription>{chapter.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{chapter.topics.length} topics</span>
                  <span>{chapter.exercises.length} exercises</span>
                </div>
                <Button variant="ghost" size="sm" className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground">
                  Study Chapter <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="cursor-pointer hover:border-primary/50 transition-colors" onClick={() => onNavigate('flashcards')}>
          <CardHeader>
            <CardTitle>📚 Flashcards</CardTitle>
            <CardDescription>
              Review key concepts with interactive flashcards. Perfect for quick revision before exams.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="cursor-pointer hover:border-primary/50 transition-colors" onClick={() => onNavigate('exams')}>
          <CardHeader>
            <CardTitle>📝 Past Exams</CardTitle>
            <CardDescription>
              Practice with previous exam papers and solutions to prepare for your tests.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}
