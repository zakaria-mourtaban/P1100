import { useEffect, useRef } from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'

interface LatexProps {
  children: string
  displayMode?: boolean
  className?: string
}

export function Latex({ children, displayMode = false, className = '' }: LatexProps) {
  const containerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      try {
        katex.render(children, containerRef.current, {
          displayMode,
          throwOnError: false,
          trust: true,
        })
      } catch (e) {
        console.error('KaTeX error:', e)
        if (containerRef.current) {
          containerRef.current.textContent = children
        }
      }
    }
  }, [children, displayMode])

  return <span ref={containerRef} className={className} />
}

// Component to render text with inline LaTeX (wrapped in $...$)
interface LatexTextProps {
  children: string
  className?: string
}

export function LatexText({ children, className = '' }: LatexTextProps) {
  const parts = children.split(/(\$[^$]+\$)/g)

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (part.startsWith('$') && part.endsWith('$')) {
          const latex = part.slice(1, -1)
          return <Latex key={index}>{latex}</Latex>
        }
        return <span key={index}>{part}</span>
      })}
    </span>
  )
}

// Formula display component for formula lists
interface FormulaProps {
  formula: string
  className?: string
}

export function Formula({ formula, className = '' }: FormulaProps) {
  return (
    <div className={`py-2 px-3 bg-accent/30 rounded-lg overflow-x-auto ${className}`}>
      <Latex displayMode>{formula}</Latex>
    </div>
  )
}
