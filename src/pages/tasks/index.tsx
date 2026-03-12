import React, { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../hooks/redux.ts'
import { setTasks, setLoading, addTask } from '../../store/taskSlice.ts'
import { taskService } from '../../services/taskService.ts'
import KanbanBoard from '../../features/tasks/components/KanbanBoard.tsx'
import TaskModal from '../../features/tasks/components/TaskModal.tsx'
import Button from '../../components/ui/Button.tsx'
import { Plus, Search, Filter, LayoutGrid, List, Loader2 } from 'lucide-react'

const TasksPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { items: tasks, loading } = useAppSelector((state) => state.tasks)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const fetchTasks = async () => {
      dispatch(setLoading(true))
      try {
        const data = await taskService.getTasks()
        dispatch(setTasks(data as any))
      } finally {
        dispatch(setLoading(false))
      }
    }
    fetchTasks()
  }, [dispatch])

  const handleCreateTask = async (data: any) => {
    try {
      const newTask = await taskService.createTask(data)
      dispatch(addTask(newTask as any))
    } catch (error) {
      console.error('Failed to create task', error)
    }
  }

  return (
    <div className="p-8 h-full space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Tasks</h1>
          <p className="text-gray-500">Manage, track and prioritize your startup tasks across projects.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="hidden sm:flex">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Task
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            placeholder="Search tasks..."
            className="pl-10 h-10 w-full rounded-lg border border-gray-100 bg-gray-50/50 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary transition-all"
          />
        </div>
        <div className="flex items-center bg-gray-50 p-1 rounded-lg border">
          <button className="p-1.5 bg-white shadow-sm rounded-md text-primary font-medium">
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors">
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {loading && tasks.length === 0 ? (
        <div className="h-64 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <KanbanBoard tasks={tasks} />
      )}

      <TaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleCreateTask} 
      />
    </div>
  )
}

export default TasksPage
