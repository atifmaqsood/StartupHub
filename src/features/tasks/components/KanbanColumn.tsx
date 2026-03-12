import React from 'react'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import TaskCard from './TaskCard.tsx'
import { Plus, MoreHorizontal } from 'lucide-react'
import { cn } from '../../../utils/index.ts'

interface KanbanColumnProps {
  id: string
  title: string
  tasks: any[]
  color: string
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ id, title, tasks, color }) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
  })

  return (
    <div className="flex flex-col w-80 min-w-[320px] max-w-sm h-full bg-[var(--bg-main)]/50 rounded-2xl p-4 border border-[var(--color-border)]/5 transition-colors">
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          <div className={cn("w-3 h-3 rounded-full shadow-sm ring-2 ring-white/10", color)} />
          <h3 className="font-bold text-[var(--text-primary)] flex items-center gap-2.5">
            {title}
            <span className="bg-[var(--bg-card)] px-2 py-0.5 rounded-lg border border-[var(--color-border)]/10 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-tighter">
              {tasks.length}
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

      <div
        ref={setNodeRef}
        className={cn(
          "flex-1 space-y-4 overflow-y-auto min-h-[200px] rounded-2xl transition-all duration-300 p-1",
          isOver && "bg-[var(--color-primary)]/5 outline-2 outline-dashed outline-[var(--color-primary)]/20",
          tasks.length === 0 && !isOver && "flex items-center justify-center"
        )}
      >
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
        
        {tasks.length === 0 && !isOver && (
          <div className="text-[var(--text-muted)] text-[10px] font-black uppercase tracking-widest border-2 border-dashed border-[var(--color-border)]/10 rounded-2xl p-12 text-center w-full bg-white/[0.02]">
            Empty Stage
          </div>
        )}
      </div>
    </div>
  )
}

export default KanbanColumn
