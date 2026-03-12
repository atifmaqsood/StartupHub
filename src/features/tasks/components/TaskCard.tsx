import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Calendar, MoreVertical, GripVertical } from 'lucide-react'
import Badge from '../../../components/ui/Badge.tsx'
import { cn } from '../../../utils/index.ts'
import { Link } from 'react-router-dom'

interface TaskCardProps {
  task: any
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: task.id,
  })

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
    opacity: isDragging ? 0.5 : undefined,
  }

  const getPriorityColor = (priority: string) => {
    if (!priority) return 'neutral'
    switch (priority.toLowerCase()) {
      case 'high': return 'error'
      case 'medium': return 'warning'
      case 'low': return 'success'
      default: return 'neutral'
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "bg-[var(--bg-card)] p-4 rounded-xl border border-[var(--color-border)]/10 shadow-sm transition-all group hover:border-[var(--color-primary)]/30",
        isDragging && "ring-2 ring-[var(--color-primary)] border-transparent scale-105"
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <button 
            {...listeners} 
            {...attributes} 
            className="cursor-grab active:cursor-grabbing text-[var(--text-muted)] hover:text-[var(--text-primary)] p-1 rounded-lg transition-colors"
          >
            <GripVertical className="h-4 w-4" />
          </button>
          <Badge variant={getPriorityColor(task.priority)} className="text-[10px] uppercase font-black px-2 py-0.5">
            {task.priority || 'Medium'}
          </Badge>
        </div>
        <button className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors p-1">
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>

      <Link to={`/tasks/${task.id}`} virtual-href={`/tasks/${task.id}`}>
        <h4 className="text-sm font-bold text-[var(--text-primary)] line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors mb-2">
          {task.title}
        </h4>
      </Link>

      <div className="flex items-center gap-2 mb-4">
        <span className="text-[10px] font-black text-[var(--text-muted)] bg-[var(--bg-main)] px-2.5 py-1 rounded-lg border border-[var(--color-border)]/10 uppercase tracking-widest">
          {task.projectName || 'General'}
        </span>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]/5">
        <div className="flex items-center gap-2 text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
          <Calendar className="h-3 w-3" />
          <span>{task.dueDate}</span>
        </div>
        <div className="flex -space-x-2 overflow-hidden">
          <div className="h-7 w-7 rounded-full border-2 border-[var(--bg-card)] bg-[var(--color-primary)]/10 flex items-center justify-center text-[10px] font-black text-[var(--color-primary)] shadow-sm">
            {task.assignee?.charAt(0) || 'U'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskCard
