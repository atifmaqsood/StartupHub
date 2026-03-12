import React from 'react'
import SearchResultItem from './SearchResultItem'
import type { SearchResult } from '../hooks/useOmniSearch'

interface SearchResultGroupProps {
  title: string
  items: SearchResult[]
  query: string
  onSelect: () => void
}

const SearchResultGroup: React.FC<SearchResultGroupProps> = ({ title, items, query, onSelect }) => {
  return (
    <div className="space-y-2">
      <h3 className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-4">
        {title}
      </h3>
      <div className="grid gap-1">
        {items.map((item) => (
          <SearchResultItem 
            key={`${item.type}-${item.id}`} 
            item={item} 
            query={query}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  )
}

export default SearchResultGroup
