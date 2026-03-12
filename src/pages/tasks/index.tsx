import React, { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../hooks/redux.ts'
import { fetchTasks, createTask } from '../../store/taskSlice.ts'
import KanbanBoard from '../../features/tasks/components/KanbanBoard.tsx'
import TaskModal from '../../features/tasks/components/TaskModal.tsx'
import Button from '../../components/ui/Button.tsx'
import { Plus, Search, Filter, LayoutGrid, List, Loader2 } from 'lucide-react'

const TasksPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { items: tasks, loading } = useAppSelector((state) => state.tasks)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    dispatch(fetchTasks())
  }, [dispatch])

  const handleCreateTask = async (data: any) => {
    await dispatch(createTask(data))
    setIsModalOpen(false)
  }

  return (
    <div className="p-8 h-full space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)]">Tasks</h1>
          <p className="text-[var(--text-secondary)]">Manage, track and prioritize your startup tasks across projects.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="hidden sm:flex ring-1 ring-[var(--color-border)]/10">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button onClick={() => setIsModalOpen(true)} className="shadow-lg shadow-[var(--color-primary)]/20">
            <Plus className="mr-2 h-4 w-4" />
            Create Task
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[var(--bg-card)] p-4 rounded-xl border border-[var(--color-border)]/10 shadow-sm transition-colors duration-300">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
          <input
            placeholder="Search tasks..."
            className="pl-10 h-11 w-full rounded-xl border border-[var(--color-border)]/20 bg-[var(--bg-main)] px-4 py-2 text-sm text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/20 focus-visible:border-[var(--color-primary)] transition-all placeholder:text-[var(--text-muted)]"
          />
        </div>
        <div className="flex items-center bg-[var(--bg-main)] p-1 rounded-xl border border-[var(--color-border)]/10">
          <button className="p-2 bg-[var(--bg-card)] shadow-sm rounded-lg text-[var(--color-primary)] font-bold">
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {loading && tasks.length === 0 ? (
        <div className="h-64 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[var(--color-primary)]" />
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
