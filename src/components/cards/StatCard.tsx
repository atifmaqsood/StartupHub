import React from 'react'
import type { LucideIcon } from 'lucide-react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '../../utils'

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: string
  trendType?: 'up' | 'down'
  className?: string
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendType = 'up',
  className 
}) => {
  return (
    <div className={cn("bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300", className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500 tracking-tight">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 tracking-tight">{value}</h3>
          
          {trend && (
            <div className="flex items-center gap-1 mt-1">
              <div className={cn(
                "flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded-md",
                trendType === 'up' ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"
              )}>
                {trendType === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                <span>{trend}</span>
              </div>
              <span className="text-[10px] text-gray-400 font-medium">vs last month</span>
            </div>
          )}
        </div>
        <div className="p-3 bg-primary/5 rounded-xl border border-primary/10">
          <Icon className="w-5 h-5 text-primary" />
        </div>
      </div>
    </div>
  )
}

export default StatCard
