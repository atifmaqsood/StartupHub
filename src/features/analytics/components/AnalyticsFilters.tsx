import React from 'react'
import { Calendar, Filter, ChevronDown, RefreshCw } from 'lucide-react'
import Button from '../../../components/ui/Button'

interface AnalyticsFiltersProps {
  onRefresh: () => void
}

const AnalyticsFilters: React.FC<AnalyticsFiltersProps> = ({ onRefresh }) => {
  return (
    <div className="flex flex-wrap items-center gap-4 animate-in slide-in-from-right-4 duration-500">
      <div className="flex items-center gap-2 bg-[var(--bg-card)] px-4 py-2.5 rounded-xl border border-[var(--color-border)]/10 shadow-sm cursor-pointer hover:bg-[var(--bg-main)] transition-colors">
        <Calendar className="h-4 w-4 text-[var(--text-muted)]" />
        <span className="text-xs font-black text-[var(--text-primary)] uppercase tracking-widest">Last 30 Days</span>
        <ChevronDown className="h-4 w-4 text-[var(--text-muted)]" />
      </div>

      <div className="flex items-center gap-2 bg-[var(--bg-card)] px-4 py-2.5 rounded-xl border border-[var(--color-border)]/10 shadow-sm cursor-pointer hover:bg-[var(--bg-main)] transition-colors">
        <Filter className="h-4 w-4 text-[var(--text-muted)]" />
        <span className="text-xs font-black text-[var(--text-primary)] uppercase tracking-widest">Project: All</span>
        <ChevronDown className="h-4 w-4 text-[var(--text-muted)]" />
      </div>

      <div className="flex items-center gap-2 bg-[var(--bg-card)] px-4 py-2.5 rounded-xl border border-[var(--color-border)]/10 shadow-sm cursor-pointer hover:bg-[var(--bg-main)] transition-colors">
        <span className="text-xs font-black text-[var(--text-primary)] uppercase tracking-widest">Team: All</span>
        <ChevronDown className="h-4 w-4 text-[var(--text-muted)]" />
      </div>

      <Button variant="outline" onClick={onRefresh} className="h-[44px] px-4 rounded-xl ring-1 ring-[var(--color-border)]/10">
        <RefreshCw className="h-4 w-4" />
      </Button>
    </div>
  )
}

export default AnalyticsFilters
