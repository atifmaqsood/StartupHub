import React, { useState, useEffect, useRef } from 'react'
import { Search, X, Loader2, CornerDownLeft } from 'lucide-react'
import { useOmniSearch } from '../hooks/useOmniSearch'
import SearchResultGroup from './SearchResultGroup'
import { cn } from '../../../utils'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const results = useOmniSearch(query)

  // Focus effect
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      setQuery('')
    }
  }, [isOpen])

  // Simulation of "searching" state for UX
  useEffect(() => {
    if (query.length > 1) {
      setIsSearching(true)
      const timer = setTimeout(() => setIsSearching(false), 300)
      return () => clearTimeout(timer)
    } else {
      setIsSearching(false)
    }
  }, [query])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl bg-[var(--bg-card)] rounded-2xl shadow-2xl border border-[var(--color-border)]/10 overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="flex items-center px-6 py-5 border-b border-[var(--color-border)]/10">
          <Search className={cn("h-5 w-5 mr-4", isSearching ? "text-[var(--color-primary)] animate-pulse" : "text-[var(--text-muted)]")} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type your search query..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-lg font-medium text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
          />
          {isSearching ? (
            <Loader2 className="h-5 w-5 text-[var(--color-primary)] animate-spin" />
          ) : (
            <div className="flex items-center gap-1 bg-[var(--bg-main)] px-2 py-1 rounded border border-[var(--color-border)]/20 text-[10px] font-bold text-[var(--text-muted)] md:flex hidden">
              ESC
            </div>
          )}
          <button onClick={onClose} className="ml-4 p-1 rounded-lg hover:bg-[var(--bg-main)] text-[var(--text-muted)]">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-4 custom-scrollbar bg-[var(--bg-main)]/30">
          {query.length < 2 ? (
            <div className="py-12 text-center">
              <div className="bg-[var(--bg-main)] h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-[var(--color-border)]/10">
                <Search className="h-8 w-8 text-[var(--text-muted)]" />
              </div>
              <h3 className="text-[var(--text-primary)] font-bold mb-1">Search Anything</h3>
              <p className="text-[var(--text-secondary)] text-sm max-w-xs mx-auto">
                Search across projects, tasks, leads, and team members instantly.
              </p>
            </div>
          ) : Object.keys(results).length === 0 && !isSearching ? (
            <div className="py-12 text-center animate-in fade-in duration-500">
              <p className="text-[var(--text-secondary)] font-medium">No results found for "<span className="text-[var(--text-primary)] font-bold">{query}</span>"</p>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(results).map(([group, items]) => (
                <SearchResultGroup 
                  key={group} 
                  title={group} 
                  items={items as any[]} 
                  query={query} 
                  onSelect={onClose} 
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between px-6 py-4 bg-[var(--bg-main)] border-t border-[var(--color-border)]/10 text-[10px] font-bold text-[var(--text-muted)]">
          <div className="flex gap-4">
            <span className="flex items-center gap-1.5">
              <kbd className="bg-[var(--bg-card)] border border-[var(--color-border)]/20 px-1.5 py-0.5 rounded shadow-sm flex items-center h-5">
                <CornerDownLeft className="h-3 w-3" />
              </kbd>
              SELECT
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="bg-[var(--bg-card)] border border-[var(--color-border)]/20 px-1.5 py-0.5 rounded shadow-sm flex items-center h-5">
                ↑↓
              </kbd>
              NAVIGATE
            </span>
          </div>
          <p>STARTUPHUB OMNISEARCH</p>
        </div>
      </div>
    </div>
  )
}

export default SearchModal
