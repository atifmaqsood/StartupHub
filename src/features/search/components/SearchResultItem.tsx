import React from 'react'
import { useNavigate } from 'react-router-dom'
import type { SearchResult } from '../hooks/useOmniSearch'
import { Briefcase, CheckCircle2, Target, Users, Bell, ChevronRight, Search } from 'lucide-react'
import { cn } from '../../../utils'

interface SearchResultItemProps {
  item: SearchResult
  query: string
  onSelect: () => void
}

const highlightMatch = (text: string, query: string) => {
  if (!query) return text
  const parts = text.split(new RegExp(`(${query})`, 'gi'))
  return parts.map((part, i) => 
    part.toLowerCase() === query.toLowerCase() 
      ? <span key={i} className="bg-[var(--color-primary)]/20 text-[var(--color-primary)] px-0.5 rounded-sm font-black">{part}</span> 
      : part
  )
}

const getIcon = (type: SearchResult['type']) => {
  switch (type) {
    case 'project': return Briefcase
    case 'task': return CheckCircle2
    case 'lead': return Target
    case 'member': return Users
    case 'notification': return Bell
    default: return Search
  }
}

const SearchResultItem: React.FC<SearchResultItemProps> = ({ item, query, onSelect }) => {
  const navigate = useNavigate()
  const Icon = getIcon(item.type)

  const handleClick = () => {
    navigate(item.url)
    onSelect()
  }

  return (
    <div 
      onClick={handleClick}
      className="flex items-center gap-5 p-4 rounded-2xl hover:bg-[var(--bg-main)] transition-all cursor-pointer group animate-in slide-in-from-left-2 duration-300 border border-transparent hover:border-[var(--color-border)]/10"
    >
      <div className={cn(
        "p-3 rounded-xl shadow-sm transition-transform group-hover:scale-110",
        item.type === 'project' ? "bg-blue-500/10 text-blue-500" :
        item.type === 'task' ? "bg-green-500/10 text-green-500" :
        item.type === 'lead' ? "bg-purple-500/10 text-purple-600" :
        item.type === 'member' ? "bg-orange-500/10 text-orange-500" :
        "bg-[var(--color-border)]/10 text-[var(--text-muted)]"
      )}>
        <Icon className="h-4 w-4" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-[13px] font-black text-[var(--text-primary)] truncate tracking-tight">
            {highlightMatch(item.title, query)}
          </h4>
          {item.status && (
            <span className="text-[9px] font-black px-2 py-0.5 rounded-lg bg-[var(--bg-card)] border border-[var(--color-border)]/10 text-[var(--text-muted)] uppercase tracking-widest shadow-sm">
              {item.status}
            </span>
          )}
        </div>
        {item.subtitle && (
          <p className="text-[11px] text-[var(--text-muted)] font-bold mt-0.5 opacity-80 group-hover:opacity-100 transition-opacity">
            {highlightMatch(item.subtitle, query)}
          </p>
        )}
      </div>

      <ChevronRight className="h-4 w-4 text-[var(--text-muted)] opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
    </div>
  )
}

export default SearchResultItem
