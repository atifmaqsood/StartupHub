import React from 'react'
import type { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string
  icon: LucideIcon
  trend: string
  color: string
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, trend, color }) => {
  return (
    <div className="bg-white p-5 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg ${color} bg-opacity-10 text-opacity-100`}>
          <Icon className={`w-5 h-5 text-${color.split('-')[1]}-600`} />
        </div>
        <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
          {trend}
        </span>
      </div>
      <div>
        <h4 className="text-sm text-gray-500 font-medium">{title}</h4>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
    </div>
  )
}

export default StatCard
