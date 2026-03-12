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
        "bg-white p-4 rounded-xl border border-gray-100 shadow-sm transition-all group hover:border-primary/30",
        isDragging && "ring-2 ring-primary border-transparent scale-105"
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <button 
            {...listeners} 
            {...attributes} 
            className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-400 p-0.5 rounded transition-colors"
          >
            <GripVertical className="h-4 w-4" />
          </button>
          <Badge variant={getPriorityColor(task.priority)} className="text-[10px] uppercase font-bold px-1.5 py-0">
            {task.priority}
          </Badge>
        </div>
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>

      <Link to={`/tasks/${task.id}`} virtual-href={`/tasks/${task.id}`}>
        <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors mb-2">
          {task.title}
        </h4>
      </Link>

      <div className="flex items-center gap-2 mb-4">
        <span className="text-[10px] font-medium text-gray-400 bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
          {task.projectName || 'General'}
        </span>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-50">
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <Calendar className="h-3 w-3" />
          <span>{task.dueDate}</span>
        </div>
        <div className="flex -space-x-1.5 overflow-hidden">
          <div className="h-6 w-6 rounded-full border-2 border-white bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
            {task.assignee?.charAt(0) || 'U'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskCard
