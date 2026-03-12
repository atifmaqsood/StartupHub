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
    <div className={cn("bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-6", className)}>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-base font-bold text-gray-900 leading-none">{title}</h3>
          {subtitle && <p className="text-xs text-gray-400 font-medium">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          {action}
          <button className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors">
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
