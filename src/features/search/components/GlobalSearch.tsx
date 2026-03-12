import React, { useState, useEffect } from 'react'
import { Search, Command } from 'lucide-react'
import SearchModal from './SearchModal.tsx'

const GlobalSearch: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <div 
        onClick={() => setIsOpen(true)}
        className="hidden md:flex items-center gap-3 bg-[var(--bg-main)] hover:bg-[var(--bg-card)] px-4 py-2 rounded-xl border border-[var(--color-border)]/10 transition-all cursor-pointer group min-w-[300px]"
      >
        <Search className="h-4 w-4 text-[var(--text-muted)] group-hover:text-[var(--color-primary)] transition-colors" />
        <span className="text-sm text-[var(--text-secondary)] font-medium">Search for anything...</span>
        <div className="ml-auto flex items-center gap-1 bg-[var(--bg-card)] px-1.5 py-0.5 rounded border border-[var(--color-border)]/20 text-[10px] font-bold text-[var(--text-muted)]">
          <Command className="h-2.5 w-2.5" />
          K
        </div>
      </div>

      <SearchModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}

export default GlobalSearch
