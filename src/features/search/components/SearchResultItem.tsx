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
      ? <span key={i} className="bg-yellow-100 text-yellow-900 rounded-sm">{part}</span> 
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
      className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-all cursor-pointer group animate-in slide-in-from-left-2 duration-300"
    >
      <div className={cn(
        "p-2.5 rounded-lg",
        item.type === 'project' ? "bg-blue-50 text-blue-600" :
        item.type === 'task' ? "bg-green-50 text-green-600" :
        item.type === 'lead' ? "bg-purple-50 text-purple-600" :
        item.type === 'member' ? "bg-orange-50 text-orange-600" :
        "bg-gray-50 text-gray-600"
      )}>
        <Icon className="h-4 w-4" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-sm font-bold text-gray-900 truncate">
            {highlightMatch(item.title, query)}
          </h4>
          {item.status && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-lg bg-gray-100 text-gray-600 uppercase tracking-wider">
              {item.status}
            </span>
          )}
        </div>
        {item.subtitle && (
          <p className="text-xs text-gray-500 font-medium mt-0.5">
            {highlightMatch(item.subtitle, query)}
          </p>
        )}
      </div>

      <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
    </div>
  )
}

export default SearchResultItem
