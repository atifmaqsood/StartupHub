import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Modal from '../../../components/modals/Modal.tsx'
import Input from '../../../components/ui/Input.tsx'
import Button from '../../../components/ui/Button.tsx'
import { projectService } from '../../../services/projectService.ts'
import { Loader2 } from 'lucide-react'

interface TaskModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => Promise<void>
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [projects, setProjects] = useState<any[]>([])
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      title: '',
      description: '',
      projectId: '',
      assignee: 'Current User',
      priority: 'Medium',
      status: 'Todo',
      dueDate: ''
    }
  })

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await projectService.getProjects()
      setProjects(data as any[])
    }
    if (isOpen) fetchProjects()
  }, [isOpen])

  const onFormSubmit = async (data: any) => {
    const project = projects.find(p => p.id === data.projectId)
    await onSubmit({ 
      ...data, 
      projectName: project?.name || 'General' 
    })
    reset()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Task">
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        <Input
          label="Execution Subject"
          placeholder="e.g. Design System Implementation"
          {...register('title', { required: 'Task title is required' })}
          error={errors.title?.message as string}
        />
        
        <div className="space-y-2">
          <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1">Intelligence Debrief</label>
          <textarea
            className="w-full rounded-2xl border border-[var(--color-border)]/10 bg-[var(--bg-main)]/50 px-4 py-3 text-sm font-bold text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/20 focus-visible:border-[var(--color-primary)] min-h-[100px] transition-all resize-none shadow-sm"
            placeholder="Assign tactical objectives..."
            {...register('description')}
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1">Assigned Context</label>
            <select
              className="w-full h-11 rounded-2xl border border-[var(--color-border)]/10 bg-[var(--bg-main)]/50 px-4 py-2 text-sm font-bold text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/20 focus-visible:border-[var(--color-primary)] transition-all shadow-sm"
              {...register('projectId', { required: 'Project is required' })}
            >
              <option value="">Select a project</option>
              {projects.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            {errors.projectId && <p className="text-[10px] text-red-500 font-black mt-1 uppercase">{errors.projectId.message as string}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1">Priority Vector</label>
            <select
              className="w-full h-11 rounded-2xl border border-[var(--color-border)]/10 bg-[var(--bg-main)]/50 px-4 py-2 text-sm font-bold text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/20 focus-visible:border-[var(--color-primary)] transition-all shadow-sm"
              {...register('priority')}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <Input
            label="Deadline Alpha"
            type="date"
            {...register('dueDate', { required: 'Due date is required' })}
            error={errors.dueDate?.message as string}
          />
          <div className="space-y-2">
            <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1">Phase Status</label>
            <select
              className="w-full h-11 rounded-2xl border border-[var(--color-border)]/10 bg-[var(--bg-main)]/50 px-4 py-2 text-sm font-bold text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/20 focus-visible:border-[var(--color-primary)] transition-all shadow-sm"
              {...register('status')}
            >
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Review">Review</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-[var(--color-border)]/10">
          <Button variant="outline" type="button" onClick={onClose} className="rounded-2xl border-[var(--color-border)]/10 text-[10px] font-black uppercase tracking-widest px-8">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting} className="rounded-2xl px-8 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-[var(--color-primary)]/20">
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Deploy Task
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default TaskModal
