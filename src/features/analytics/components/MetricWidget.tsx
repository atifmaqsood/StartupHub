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
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-6">
      <div className={cn("p-4 rounded-xl", color)}>
        <Icon className="h-6 w-6" />
      </div>
      <div className="flex-1">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-tight mb-1">{title}</p>
        <div className="flex items-center gap-2">
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
          {change && (
            <span className={cn(
              "text-[10px] font-bold px-1.5 py-0.5 rounded-lg",
              trend === 'up' ? "bg-green-100 text-green-700" : 
              trend === 'down' ? "bg-red-100 text-red-700" : 
              "bg-gray-100 text-gray-700"
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
