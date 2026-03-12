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
import { useDispatch } from 'react-redux'
import { deleteTask, updateTask } from '../../store/taskSlice.ts'

const TaskDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useDispatch()
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

  const handleDelete = async () => {
    if (!id || !window.confirm('Are you sure you want to delete this task?')) return
    try {
      await taskService.deleteTask(id)
      dispatch(deleteTask(id))
      navigate('/tasks')
    } catch (error) {
      console.error('Failed to delete task', error)
    }
  }

  const handleStatusChange = async (newStatus: string) => {
    if (!id || !task) return
    try {
      const updated = await taskService.updateTask(id, { status: newStatus })
      setTask(updated)
      dispatch(updateTask(updated as any))
    } catch (error) {
      console.error('Failed to update status', error)
    }
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
        className="flex items-center text-sm text-gray-500 hover:text-primary transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to tasks
      </Link>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-900">{task.title}</h1>
            <Badge variant={getPriorityColor(task.priority)}>
              {task.priority}
            </Badge>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1.5">
              <Briefcase className="h-4 w-4" />
              <span className="font-medium text-gray-900">{task.projectName || 'General'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>Due on {task.dueDate}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="outline" className="text-red-500 hover:text-red-600 border-red-100 hover:border-red-200" onClick={handleDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                {task.description || 'No description provided for this task.'}
              </p>
            </div>
            
            <hr className="border-gray-50" />
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Task Actions</h3>
              <div className="flex flex-wrap gap-3">
                {['Todo', 'In Progress', 'Review', 'Completed'].map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(status)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      task.status === status 
                        ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' 
                        : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <h3 className="font-semibold text-gray-900">Details</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <User className="h-4 w-4" />
                  <span>Assignee</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                    {task.assignee?.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-gray-900">{task.assignee}</span>
                </div>
              </div>

              <div className="flex items-center justify-between py-2 border-t border-gray-50">
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>Status</span>
                </div>
                <Badge variant={task.status === 'Completed' ? 'success' : 'warning'}>
                  {task.status}
                </Badge>
              </div>

              <div className="flex items-center justify-between py-2 border-t border-gray-50">
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <Tag className="h-4 w-4" />
                  <span>Priority</span>
                </div>
                <Badge variant={getPriorityColor(task.priority)}>
                  {task.priority}
                </Badge>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 space-y-4">
            <div className="flex items-center gap-3 text-primary">
              <CheckCircle2 className="h-5 w-5" />
              <h4 className="font-bold">Pro Tip</h4>
            </div>
            <p className="text-xs text-primary/80 leading-relaxed font-medium">
              Keep your tasks updated! Moving tasks across columns helps the team stay aligned on progress and roadblocks.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskDetailsPage
