// Study Progress Storage using localStorage

const STORAGE_KEY = 'studyAppProgress'

export interface ChapterProgress {
  chaptersViewed: string[]
  topicsCompleted: string[]
  exercisesAttempted: string[]
  lastViewedChapter: string | null
  lastViewedAt: number | null
}

export interface FlashcardProgress {
  cardsStudied: string[]
  cardsMarkedKnown: string[]
  totalStudySessions: number
  lastStudiedAt: number | null
}

export interface StudyProgress {
  chapters: ChapterProgress
  flashcards: FlashcardProgress
  pdfViews: Record<string, number> // filename -> view count
  totalStudyTime: number // in seconds
  lastActiveAt: number
  createdAt: number
}

const defaultProgress: StudyProgress = {
  chapters: {
    chaptersViewed: [],
    topicsCompleted: [],
    exercisesAttempted: [],
    lastViewedChapter: null,
    lastViewedAt: null
  },
  flashcards: {
    cardsStudied: [],
    cardsMarkedKnown: [],
    totalStudySessions: 0,
    lastStudiedAt: null
  },
  pdfViews: {},
  totalStudyTime: 0,
  lastActiveAt: Date.now(),
  createdAt: Date.now()
}

class StudyProgressManager {
  private progress: StudyProgress
  private saveTimeout: ReturnType<typeof setTimeout> | null = null

  constructor() {
    this.progress = this.load()
  }

  private load(): StudyProgress {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as StudyProgress
        // Merge with defaults in case new fields were added
        return { ...defaultProgress, ...parsed }
      }
    } catch (e) {
      console.error('Failed to load study progress:', e)
    }
    return { ...defaultProgress }
  }

  private save(): void {
    // Debounce saves
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout)
    }
    this.saveTimeout = setTimeout(() => {
      try {
        this.progress.lastActiveAt = Date.now()
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.progress))
      } catch (e) {
        console.error('Failed to save study progress:', e)
      }
    }, 500)
  }

  getProgress(): StudyProgress {
    return { ...this.progress }
  }

  // Chapter progress
  markChapterViewed(chapterId: string): void {
    if (!this.progress.chapters.chaptersViewed.includes(chapterId)) {
      this.progress.chapters.chaptersViewed.push(chapterId)
    }
    this.progress.chapters.lastViewedChapter = chapterId
    this.progress.chapters.lastViewedAt = Date.now()
    this.save()
  }

  markTopicCompleted(topicId: string): void {
    if (!this.progress.chapters.topicsCompleted.includes(topicId)) {
      this.progress.chapters.topicsCompleted.push(topicId)
    }
    this.save()
  }

  markExerciseAttempted(exerciseId: string): void {
    if (!this.progress.chapters.exercisesAttempted.includes(exerciseId)) {
      this.progress.chapters.exercisesAttempted.push(exerciseId)
    }
    this.save()
  }

  // Flashcard progress
  markCardStudied(cardId: string): void {
    if (!this.progress.flashcards.cardsStudied.includes(cardId)) {
      this.progress.flashcards.cardsStudied.push(cardId)
    }
    this.progress.flashcards.lastStudiedAt = Date.now()
    this.save()
  }

  markCardKnown(cardId: string): void {
    if (!this.progress.flashcards.cardsMarkedKnown.includes(cardId)) {
      this.progress.flashcards.cardsMarkedKnown.push(cardId)
    }
    this.save()
  }

  unmarkCardKnown(cardId: string): void {
    this.progress.flashcards.cardsMarkedKnown = 
      this.progress.flashcards.cardsMarkedKnown.filter(id => id !== cardId)
    this.save()
  }

  incrementStudySessions(): void {
    this.progress.flashcards.totalStudySessions++
    this.save()
  }

  // PDF views
  recordPDFView(filename: string): void {
    this.progress.pdfViews[filename] = (this.progress.pdfViews[filename] || 0) + 1
    this.save()
  }

  // Study time tracking
  addStudyTime(seconds: number): void {
    this.progress.totalStudyTime += seconds
    this.save()
  }

  // Statistics
  getStats(): {
    chaptersViewedCount: number
    topicsCompletedCount: number
    exercisesAttemptedCount: number
    flashcardsStudiedCount: number
    flashcardsKnownCount: number
    totalPDFViews: number
    totalStudyTimeFormatted: string
    daysSinceStart: number
  } {
    const totalPDFViews = Object.values(this.progress.pdfViews).reduce((a, b) => a + b, 0)
    const totalSeconds = this.progress.totalStudyTime
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const totalStudyTimeFormatted = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
    const daysSinceStart = Math.ceil((Date.now() - this.progress.createdAt) / (1000 * 60 * 60 * 24))

    return {
      chaptersViewedCount: this.progress.chapters.chaptersViewed.length,
      topicsCompletedCount: this.progress.chapters.topicsCompleted.length,
      exercisesAttemptedCount: this.progress.chapters.exercisesAttempted.length,
      flashcardsStudiedCount: this.progress.flashcards.cardsStudied.length,
      flashcardsKnownCount: this.progress.flashcards.cardsMarkedKnown.length,
      totalPDFViews,
      totalStudyTimeFormatted,
      daysSinceStart
    }
  }

  // Reset
  reset(): void {
    this.progress = { ...defaultProgress, createdAt: Date.now() }
    this.save()
  }

  // Export/Import for backup
  export(): string {
    return JSON.stringify(this.progress, null, 2)
  }

  import(data: string): boolean {
    try {
      const parsed = JSON.parse(data) as StudyProgress
      this.progress = { ...defaultProgress, ...parsed }
      this.save()
      return true
    } catch {
      return false
    }
  }
}

export const studyProgress = new StudyProgressManager()
