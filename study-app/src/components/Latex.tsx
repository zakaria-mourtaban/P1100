import { useEffect, useRef, useMemo } from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'

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
  const parts = useMemo(() => children.split(/(\$[^$]+\$)/g), [children])

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
  // Strip $ delimiters if present (formulas might come with or without them)
  const cleanFormula = useMemo(() => {
    let f = formula.trim()
    if (f.startsWith('$') && f.endsWith('$')) {
      f = f.slice(1, -1)
    }
    // Also handle $$ for display mode
    if (f.startsWith('$') && f.endsWith('$')) {
      f = f.slice(1, -1)
    }
    return f
  }, [formula])

  return (
    <div className={`py-2 px-3 bg-accent/30 rounded-lg overflow-x-auto ${className}`}>
      <Latex displayMode>{cleanFormula}</Latex>
    </div>
  )
}

// Markdown component with LaTeX support
// Use $...$ for inline math and $$...$$ for display math
interface MarkdownLatexProps {
  children: string
  className?: string
}

export function MarkdownLatex({ children, className = '' }: MarkdownLatexProps) {
  return (
    <div className={`markdown-content ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          // Style paragraphs
          p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
          // Style headers
          h1: ({ children }) => <h1 className="text-xl font-bold mb-2">{children}</h1>,
          h2: ({ children }) => <h2 className="text-lg font-bold mb-2">{children}</h2>,
          h3: ({ children }) => <h3 className="text-base font-semibold mb-2">{children}</h3>,
          // Style lists
          ul: ({ children }) => <ul className="list-disc list-inside mb-3 space-y-1">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal list-inside mb-3 space-y-1">{children}</ol>,
          li: ({ children }) => <li className="ml-2">{children}</li>,
          // Style emphasis
          strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
          em: ({ children }) => <em className="italic">{children}</em>,
          // Style code
          code: ({ children, className }) => {
            // Check if it's a code block (has language class) vs inline code
            const isBlock = className?.includes('language-')
            if (isBlock) {
              return (
                <code className="block bg-muted/50 p-3 rounded-lg text-sm overflow-x-auto mb-3">
                  {children}
                </code>
              )
            }
            return (
              <code className="bg-muted/50 px-1.5 py-0.5 rounded text-sm">
                {children}
              </code>
            )
          },
          pre: ({ children }) => <pre className="mb-3">{children}</pre>,
          // Style blockquotes
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary/50 pl-4 italic mb-3">
              {children}
            </blockquote>
          ),
          // Style tables
          table: ({ children }) => (
            <div className="overflow-x-auto mb-3">
              <table className="min-w-full border-collapse border border-border rounded-lg overflow-hidden">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-muted/50">{children}</thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-border">{children}</tbody>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-muted/30 transition-colors">{children}</tr>
          ),
          th: ({ children }) => (
            <th className="border border-border px-4 py-2.5 bg-muted/50 text-left font-semibold text-sm">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-border px-4 py-2.5 text-sm">{children}</td>
          ),
          // Style horizontal rules
          hr: () => <hr className="my-4 border-border" />,
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}
