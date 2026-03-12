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
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
        <Input
          label="Task Title"
          placeholder="e.g. Design System Implementation"
          {...register('title', { required: 'Task title is required' })}
          error={errors.title?.message as string}
        />
        
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">Description</label>
          <textarea
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary min-h-[80px]"
            placeholder="What needs to be done?"
            {...register('description')}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Project</label>
            <select
              className="w-full h-10 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary"
              {...register('projectId', { required: 'Project is required' })}
            >
              <option value="">Select a project</option>
              {projects.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            {errors.projectId && <p className="text-xs text-red-500 font-medium">{errors.projectId.message as string}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Priority</label>
            <select
              className="w-full h-10 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary"
              {...register('priority')}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Due Date"
            type="date"
            {...register('dueDate', { required: 'Due date is required' })}
            error={errors.dueDate?.message as string}
          />
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Initial Status</label>
            <select
              className="w-full h-10 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary"
              {...register('status')}
            >
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Review">Review</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Task
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default TaskModal
