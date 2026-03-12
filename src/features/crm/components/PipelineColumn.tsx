import React from 'react'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import LeadCard from './LeadCard.tsx'
import { Plus, MoreHorizontal } from 'lucide-react'
import { cn } from '../../../utils/index.ts'

interface PipelineColumnProps {
  id: string
  title: string
  leads: any[]
  color: string
}

const PipelineColumn: React.FC<PipelineColumnProps> = ({ id, title, leads, color }) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
  })

  // Calculate total column value
  const totalValue = leads.reduce((acc, lead) => acc + (lead.value || 0), 0)

  const formatValue = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val)
  }

  return (
    <div className="flex flex-col w-80 min-w-[320px] max-w-sm h-full bg-slate-50/50 rounded-2xl p-4 border border-transparent transition-colors">
      <div className="flex flex-col mb-4 px-1 gap-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={cn("w-2.5 h-2.5 rounded-full", color)} />
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              {title}
              <span className="bg-white px-2 py-0.5 rounded-lg border text-xs font-medium text-gray-500">
                {leads.length}
              </span>
            </h3>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-1.5 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-gray-100 text-gray-400">
              <Plus className="h-4 w-4" />
            </button>
            <button className="p-1.5 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-gray-100 text-gray-400">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-4">
          Total: {formatValue(totalValue)}
        </div>
      </div>

      <div
        ref={setNodeRef}
        className={cn(
          "flex-1 space-y-4 overflow-y-auto min-h-[200px] rounded-xl transition-all duration-200 scrollbar-hide py-1",
          isOver && "bg-primary/5 outline-2 outline-dashed outline-primary/20",
          leads.length === 0 && !isOver && "flex items-center justify-center"
        )}
      >
        <SortableContext items={leads.map(l => l.id)} strategy={verticalListSortingStrategy}>
          {leads.map((lead) => (
            <LeadCard key={lead.id} lead={lead} />
          ))}
        </SortableContext>
        
        {leads.length === 0 && !isOver && (
          <div className="text-gray-300 text-sm font-medium border-2 border-dashed border-slate-100 rounded-2xl p-8 text-center w-full">
            No leads in stage
          </div>
        )}
      </div>
    </div>
  )
}

export default PipelineColumn
