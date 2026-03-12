import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { taskService } from '../../services/taskService.ts'
import Button from '../../components/ui/Button.tsx'
import Badge from '../../components/ui/Badge.tsx'
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Clock, 
  Tag, 
  Trash2, 
  Edit,
  Loader2,
  CheckCircle2,
  Briefcase
} from 'lucide-react'
import { useAppDispatch } from '../../hooks/redux.ts'
import { deleteTaskAsync, updateTaskAsync, optimisticDeleteTask, optimisticUpdateTask } from '../../store/taskSlice.ts'
import { useSystemNotification } from '../../hooks/useSystemNotification'

const TaskDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { notify } = useSystemNotification()
  const [task, setTask] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTask = async () => {
      if (!id) return
      setLoading(true)
      try {
        const data = await taskService.getTaskById(id)
        setTask(data)
      } catch (error) {
        console.error('Failed to fetch task details', error)
      } finally {
        setLoading(false)
      }
    }
    fetchTask()
  }, [id])

  const handleDelete = () => {
    if (!id || !window.confirm('Are you sure you want to delete this task?')) return
    dispatch(optimisticDeleteTask(id))
    dispatch(deleteTaskAsync(id))
    navigate('/tasks')
  }

  const handleStatusChange = (newStatus: any) => {
    if (!id || !task) return
    const updates = { status: newStatus }
    setTask({ ...task, ...updates })
    dispatch(optimisticUpdateTask({ id, updates }))
    dispatch(updateTaskAsync({ id, data: updates }))
    notify(`Task status updated to ${newStatus}`, 'task', id)
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!task) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold">Task not found</h2>
        <Link to="/tasks" virtual-href="/tasks" className="text-primary hover:underline mt-4 inline-block">
          Back to Tasks
        </Link>
      </div>
    )
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
    <div className="p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <Link 
        to="/tasks" 
        virtual-href="/tasks"
        className="flex items-center text-sm font-bold text-[var(--text-muted)] hover:text-[var(--color-primary)] transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to tasks
      </Link>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-[var(--text-primary)]">{task.title}</h1>
            <Badge variant={getPriorityColor(task.priority)}>
              {task.priority}
            </Badge>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-sm text-[var(--text-secondary)]">
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-[var(--text-muted)]" />
              <span className="font-bold text-[var(--text-primary)]">{task.projectName || 'General'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[var(--text-muted)]" />
              <span className="font-bold">Due on {task.dueDate}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="ring-1 ring-[var(--color-border)]/10">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="outline" className="text-red-500 hover:text-red-400 border-red-500/10 hover:border-red-500/20 bg-red-500/5" onClick={handleDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-[var(--bg-card)] p-8 rounded-2xl border border-[var(--color-border)]/10 shadow-sm space-y-8 transition-colors duration-300">
            <div>
              <h3 className="text-xs font-black text-[var(--text-primary)] uppercase tracking-widest mb-4">Description</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed font-medium whitespace-pre-wrap">
                {task.description || 'No description provided for this task.'}
              </p>
            </div>
            
            <hr className="border-[var(--color-border)]/5" />
            
            <div className="space-y-5">
              <h3 className="text-xs font-black text-[var(--text-primary)] uppercase tracking-widest">Workflow State</h3>
              <div className="flex flex-wrap gap-3">
                {['Todo', 'In Progress', 'Review', 'Completed'].map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(status)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                      task.status === status 
                        ? 'bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/20 scale-105' 
                        : 'bg-[var(--bg-main)] text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-[var(--color-border)]/10'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--color-border)]/10 shadow-sm space-y-8 transition-colors duration-300">
            <h3 className="text-xs font-black text-[var(--text-primary)] uppercase tracking-widest">Task Properties</h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
                  <User className="h-4 w-4" />
                  <span className="font-bold">Assignee</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center text-[10px] font-black text-[var(--color-primary)] shadow-sm">
                    {task.assignee?.charAt(0)}
                  </div>
                  <span className="text-sm font-black text-[var(--text-primary)]">{task.assignee}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]/5">
                <div className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
                  <Clock className="h-4 w-4" />
                  <span className="font-bold">Status</span>
                </div>
                <Badge variant={task.status === 'Completed' ? 'success' : 'warning'}>
                  {task.status}
                </Badge>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]/5">
                <div className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
                  <Tag className="h-4 w-4" />
                  <span className="font-bold">Priority</span>
                </div>
                <Badge variant={getPriorityColor(task.priority)}>
                  {task.priority}
                </Badge>
              </div>
            </div>
          </div>

          <div className="bg-[var(--color-primary)]/5 p-6 rounded-2xl border border-[var(--color-primary)]/10 space-y-4">
            <div className="flex items-center gap-3 text-[var(--color-primary)]">
              <CheckCircle2 className="h-5 w-5" />
              <h4 className="font-black uppercase tracking-widest text-xs">Efficiency Tip</h4>
            </div>
            <p className="text-xs text-[var(--color-primary)]/80 leading-relaxed font-bold">
              Keep your tasks updated! Moving tasks across columns helps the team stay aligned on progress and roadblocks.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskDetailsPage
