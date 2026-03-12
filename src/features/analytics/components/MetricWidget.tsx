import React from 'react'
import { cn } from '../../../utils'
import type { LucideIcon } from 'lucide-react'

interface MetricWidgetProps {
  title: string
  value: string | number
  change?: string | number
  trend?: 'up' | 'down' | 'neutral'
  icon: LucideIcon
  color: string
}

const MetricWidget: React.FC<MetricWidgetProps> = ({ title, value, change, trend, icon: Icon, color }) => {
  return (
    <div className="bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--color-border)]/10 shadow-sm flex items-center gap-6 transition-colors duration-300">
      <div className={cn("p-4 rounded-xl shadow-sm", color.includes('bg-') ? color.replace('bg-', 'bg-').replace('text-', 'text-') : color)}>
        <Icon className="h-6 w-6" />
      </div>
      <div className="flex-1">
        <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest leading-tight mb-1">{title}</p>
        <div className="flex items-center gap-2">
          <h3 className="text-2xl font-bold text-[var(--text-primary)]">{value}</h3>
          {change && (
            <span className={cn(
              "text-[10px] font-bold px-1.5 py-0.5 rounded-lg",
              trend === 'up' ? "bg-green-500/10 text-green-500" : 
              trend === 'down' ? "bg-red-500/10 text-red-500" : 
              "bg-gray-500/10 text-gray-500"
            )}>
              {trend === 'up' ? '+' : ''}{change}%
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default MetricWidget
