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
    <div className="flex flex-col w-80 min-w-[320px] max-w-sm h-full bg-[var(--bg-main)]/50 rounded-2xl p-4 border border-[var(--color-border)]/5 transition-colors">
      <div className="flex flex-col mb-4 px-1 gap-1.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={cn("w-3 h-3 rounded-full shadow-sm ring-2 ring-white/10", color)} />
            <h3 className="font-bold text-[var(--text-primary)] flex items-center gap-2.5">
              {title}
              <span className="bg-[var(--bg-card)] px-2 py-0.5 rounded-lg border border-[var(--color-border)]/10 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-tighter">
                {leads.length}
              </span>
            </h3>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-2 hover:bg-[var(--bg-card)] rounded-xl transition-all border border-transparent hover:border-[var(--color-border)]/10 text-[var(--text-muted)] hover:text-[var(--text-primary)]">
              <Plus className="h-4 w-4" />
            </button>
            <button className="p-2 hover:bg-[var(--bg-card)] rounded-xl transition-all border border-transparent hover:border-[var(--color-border)]/10 text-[var(--text-muted)] hover:text-[var(--text-primary)]">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest pl-5">
          Volume: <span className="text-[var(--color-primary)]">{formatValue(totalValue)}</span>
        </div>
      </div>

      <div
        ref={setNodeRef}
        className={cn(
          "flex-1 space-y-4 overflow-y-auto min-h-[200px] rounded-2xl transition-all duration-300 scrollbar-hide p-1",
          isOver && "bg-[var(--color-primary)]/5 outline-2 outline-dashed outline-[var(--color-primary)]/20",
          leads.length === 0 && !isOver && "flex items-center justify-center border-2 border-dashed border-[var(--color-border)]/10"
        )}
      >
        <SortableContext items={leads.map(l => l.id)} strategy={verticalListSortingStrategy}>
          {leads.map((lead) => (
            <LeadCard key={lead.id} lead={lead} />
          ))}
        </SortableContext>
        
        {leads.length === 0 && !isOver && (
          <div className="text-[var(--text-muted)] text-[10px] font-black uppercase tracking-widest p-12 text-center w-full">
            Pipeline Empty
          </div>
        )}
      </div>
    </div>
  )
}

export default PipelineColumn
