import React from 'react'
import { useForm } from 'react-hook-form'
import Modal from '../../../components/modals/Modal.tsx'
import Input from '../../../components/ui/Input.tsx'
import Button from '../../../components/ui/Button.tsx'
import { Loader2 } from 'lucide-react'

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => Promise<void>
}

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      name: '',
      description: '',
      deadline: '',
      owner: 'Current User', // Simulated
      status: 'Todo'
    }
  })

  const onFormSubmit = async (data: any) => {
    await onSubmit(data)
    reset()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Project">
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
        <Input
          label="Project Name"
          placeholder="e.g. Q4 Marketing Campaign"
          {...register('name', { required: 'Project name is required' })}
          error={errors.name?.message as string}
        />
        
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">Description</label>
          <textarea
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary min-h-[100px]"
            placeholder="What is this project about?"
            {...register('description', { required: 'Description is required' })}
          />
          {errors.description && <p className="text-xs text-red-500 font-medium">{errors.description.message as string}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Deadline"
            type="date"
            {...register('deadline', { required: 'Deadline is required' })}
            error={errors.deadline?.message as string}
          />
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Status</label>
            <select
              className="w-full h-10 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary"
              {...register('status')}
            >
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
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
            Create Project
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default ProjectModal
