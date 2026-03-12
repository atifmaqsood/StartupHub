import React from 'react'
import { cn } from '../../../utils'
import { MoreVertical } from 'lucide-react'

interface AnalyticsCardProps {
  title: string
  subtitle?: string
  children: React.ReactNode
  className?: string
  action?: React.ReactNode
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ title, subtitle, children, className, action }) => {
  return (
    <div className={cn("bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--color-border)]/10 shadow-sm flex flex-col gap-6 transition-colors duration-300", className)}>
      <div className="flex items-center justify-between">
        <div className="space-y-1.5">
          <h3 className="text-sm font-black text-[var(--text-primary)] uppercase tracking-wider">{title}</h3>
          {subtitle && <p className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-widest leading-tight">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          {action}
          <button className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-main)] rounded-xl transition-all">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="w-full h-[350px] relative">
        {children}
      </div>
    </div>
  )
}

export default AnalyticsCard
