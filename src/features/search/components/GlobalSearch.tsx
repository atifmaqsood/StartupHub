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
        className="hidden md:flex items-center gap-3 bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-xl border border-gray-100 transition-all cursor-pointer group min-w-[300px]"
      >
        <Search className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" />
        <span className="text-sm text-gray-500 font-medium">Search for anything...</span>
        <div className="ml-auto flex items-center gap-1 bg-white px-1.5 py-0.5 rounded border border-gray-200 text-[10px] font-bold text-gray-400">
          <Command className="h-2.5 w-2.5" />
          K
        </div>
      </div>

      <SearchModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}

export default GlobalSearch
