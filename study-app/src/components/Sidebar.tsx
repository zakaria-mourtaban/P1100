import { Home, Sigma, Route, Rocket, Zap, ArrowRightLeft, RotateCw, Layers, FileText, Files, ChevronLeft, ChevronRight, Atom, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { PageType } from '@/App'

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'chapter0', label: 'Ch 0: Math', icon: Sigma },
  { id: 'chapter1', label: 'Ch 1: Kinematics', icon: Route },
  { id: 'chapter2', label: 'Ch 2: Dynamics', icon: Rocket },
  { id: 'chapter3', label: 'Ch 3: Energy', icon: Zap },
  { id: 'chapter4', label: 'Ch 4: Momentum', icon: ArrowRightLeft },
  { id: 'chapter5', label: 'Ch 5: Rotation', icon: RotateCw },
  { id: 'flashcards', label: 'Flashcards', icon: Layers },
  { id: 'exams', label: 'Past Exams', icon: FileText },
  { id: 'pdfs', label: 'All PDFs', icon: Files },
  { id: 'settings', label: 'Settings', icon: Settings },
]

interface SidebarProps {
  currentPage: PageType
  onNavigate: (page: PageType) => void
  isOpen: boolean
  onToggle: () => void
}

export function Sidebar({ currentPage, onNavigate, isOpen, onToggle }: SidebarProps) {
  return (
    <aside className={cn(
      "fixed left-0 top-0 h-full bg-card border-r border-border transition-all duration-300 z-50 flex flex-col",
      isOpen ? "w-64" : "w-16"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center gap-3">
        <Atom className="w-8 h-8 text-primary shrink-0" />
        {isOpen && (
          <div>
            <h1 className="font-bold text-lg">P1100</h1>
            <p className="text-xs text-muted-foreground">Classical Mechanics</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPage === item.id
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left",
                    isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-accent text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  {isOpen && <span className="text-sm font-medium">{item.label}</span>}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        {isOpen && (
          <div className="text-xs text-muted-foreground mb-2">
            <p>Lebanese University</p>
            <p>Faculty of Sciences, B3</p>
          </div>
        )}
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
        >
          {isOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          {isOpen && <span className="text-sm">Collapse</span>}
        </button>
      </div>
    </aside>
  )
}
