import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { flashcards, chapters } from '@/data'
import { LatexText } from '@/components/Latex'
import { ChevronLeft, ChevronRight, RotateCw, Shuffle } from 'lucide-react'

export function FlashcardsPage() {
  const [selectedChapter, setSelectedChapter] = useState<string | 'all'>('all')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [shuffled, setShuffled] = useState(false)

  const filteredCards = selectedChapter === 'all' 
    ? flashcards 
    : flashcards.filter(fc => fc.chapter === selectedChapter)

  const [cards, setCards] = useState(filteredCards)

  const handleChapterChange = (chapterId: string | 'all') => {
    setSelectedChapter(chapterId)
    const newCards = chapterId === 'all' 
      ? flashcards 
      : flashcards.filter(fc => fc.chapter === chapterId)
    setCards(newCards)
    setCurrentIndex(0)
    setIsFlipped(false)
    setShuffled(false)
  }

  const handleShuffle = () => {
    const shuffledCards = [...cards].sort(() => Math.random() - 0.5)
    setCards(shuffledCards)
    setCurrentIndex(0)
    setIsFlipped(false)
    setShuffled(true)
  }

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setIsFlipped(false)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setIsFlipped(false)
    }
  }

  const currentCard = cards[currentIndex]

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Flashcards</h1>
        <p className="text-muted-foreground">Test your knowledge with interactive flashcards</p>
      </div>

      {/* Chapter Filter */}
      <div className="flex flex-wrap justify-center gap-2">
        <Button
          variant={selectedChapter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleChapterChange('all')}
        >
          All ({flashcards.length})
        </Button>
        {chapters.map(ch => {
          const count = flashcards.filter(fc => fc.chapter === ch.id).length
          if (count === 0) return null
          return (
            <Button
              key={ch.id}
              variant={selectedChapter === ch.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleChapterChange(ch.id)}
            >
              Ch {ch.number} ({count})
            </Button>
          )
        })}
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-2">
        <Button variant="outline" size="sm" onClick={handleShuffle}>
          <Shuffle className="h-4 w-4 mr-2" />
          Shuffle
        </Button>
        {shuffled && (
          <Button variant="outline" size="sm" onClick={() => handleChapterChange(selectedChapter)}>
            <RotateCw className="h-4 w-4 mr-2" />
            Reset Order
          </Button>
        )}
      </div>

      {/* Flashcard */}
      {cards.length > 0 ? (
        <div className="space-y-4">
          <div className="text-center text-sm text-muted-foreground">
            Card {currentIndex + 1} of {cards.length}
          </div>

          <Card 
            className="min-h-[300px] cursor-pointer hover:border-primary/50 transition-all"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <CardContent className="h-full flex flex-col items-center justify-center p-8 text-center">
              <Badge variant="outline" className="mb-4">
                {isFlipped ? 'Answer' : 'Question'}
              </Badge>
              <div className="text-xl font-medium leading-relaxed">
                <LatexText>{isFlipped ? currentCard.back : currentCard.front}</LatexText>
              </div>
              <p className="text-sm text-muted-foreground mt-6">
                Click to {isFlipped ? 'see question' : 'reveal answer'}
              </p>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <span className="text-sm text-muted-foreground min-w-[100px] text-center">
              {currentIndex + 1} / {cards.length}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              disabled={currentIndex === cards.length - 1}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No flashcards available for this selection.
          </CardContent>
        </Card>
      )}
    </div>
  )
}
