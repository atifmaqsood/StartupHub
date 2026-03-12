import React from 'react'
import { Calendar, Filter, ChevronDown, RefreshCw } from 'lucide-react'
import Button from '../../../components/ui/Button'

interface AnalyticsFiltersProps {
  onRefresh: () => void
}

const AnalyticsFilters: React.FC<AnalyticsFiltersProps> = ({ onRefresh }) => {
  return (
    <div className="flex flex-wrap items-center gap-4 animate-in slide-in-from-right-4 duration-500">
      <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm">
        <Calendar className="h-4 w-4 text-gray-400" />
        <span className="text-sm font-bold text-gray-700">Last 30 Days</span>
        <ChevronDown className="h-4 w-4 text-gray-400" />
      </div>

      <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm">
        <Filter className="h-4 w-4 text-gray-400" />
        <span className="text-sm font-bold text-gray-700">Project: All</span>
        <ChevronDown className="h-4 w-4 text-gray-400" />
      </div>

      <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm">
        <span className="text-sm font-bold text-gray-700">Team: All</span>
        <ChevronDown className="h-4 w-4 text-gray-400" />
      </div>

      <Button variant="outline" onClick={onRefresh} className="h-[42px] px-4 rounded-xl">
        <RefreshCw className="h-4 w-4" />
      </Button>
    </div>
  )
}

export default AnalyticsFilters
