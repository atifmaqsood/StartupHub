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
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        <Input
          label="Project Name"
          placeholder="e.g. Q4 Marketing Campaign"
          {...register('name', { required: 'Project name is required' })}
          error={errors.name?.message as string}
        />
        
        <div className="space-y-2">
          <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1">Description</label>
          <textarea
            className="w-full rounded-2xl border border-[var(--color-border)]/10 bg-[var(--bg-main)]/50 px-4 py-3 text-sm font-bold text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/20 focus-visible:border-[var(--color-primary)] min-h-[120px] transition-all resize-none shadow-sm"
            placeholder="What is this project about?"
            {...register('description', { required: 'Description is required' })}
          />
          {errors.description && <p className="text-[10px] text-red-500 font-black mt-1 uppercase tracking-tighter">{errors.description.message as string}</p>}
        </div>

        <div className="grid grid-cols-2 gap-6">
          <Input
            label="Deadline"
            type="date"
            {...register('deadline', { required: 'Deadline is required' })}
            error={errors.deadline?.message as string}
          />
          <div className="space-y-2">
            <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1">Current Status</label>
            <select
              className="w-full h-11 rounded-2xl border border-[var(--color-border)]/10 bg-[var(--bg-main)]/50 px-4 py-2 text-sm font-bold text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/20 focus-visible:border-[var(--color-primary)] transition-all shadow-sm"
              {...register('status')}
            >
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-10 pt-6 border-t border-[var(--color-border)]/10">
          <Button variant="outline" type="button" onClick={onClose} className="rounded-2xl border-[var(--color-border)]/10 text-[10px] font-black uppercase tracking-widest px-8">
            Discard
          </Button>
          <Button type="submit" disabled={isSubmitting} className="rounded-2xl px-8 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-[var(--color-primary)]/20">
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Genesis Project
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default ProjectModal
