import React from 'react'
import { useForm } from 'react-hook-form'
import Modal from '../../../components/modals/Modal.tsx'
import Input from '../../../components/ui/Input.tsx'
import Button from '../../../components/ui/Button.tsx'
import { Loader2, Shield } from 'lucide-react'

interface InviteMemberModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => Promise<void>
}

const InviteMemberModal: React.FC<InviteMemberModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      name: '',
      email: '',
      role: 'Member'
    }
  })

  const onFormSubmit = async (data: any) => {
    await onSubmit(data)
    reset()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Invite New Member">
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        <Input
          label="Full Name"
          placeholder="e.g. John Doe"
          {...register('name', { required: 'Name is required' })}
          error={errors.name?.message as string}
        />
        
        <Input
          label="Neural Email Address"
          type="email"
          placeholder="john@example.com"
          {...register('email', { 
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address"
            }
          })}
          error={errors.email?.message as string}
        />

        <div className="space-y-2">
          <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1 flex items-center gap-2">
            <Shield className="h-3.5 w-3.5 opacity-50" />
            Clearance Level
          </label>
          <select
            className="w-full h-11 rounded-2xl border border-[var(--color-border)]/10 bg-[var(--bg-main)]/50 px-4 py-2 text-sm font-bold text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/20 focus-visible:border-[var(--color-primary)] transition-all shadow-sm"
            {...register('role')}
          >
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Member">Member</option>
          </select>
          <p className="text-[10px] text-[var(--text-muted)] mt-2 pl-1 italic opacity-60">
            Designated operative will receive an activation encrypted link.
          </p>
        </div>

        <div className="flex justify-end gap-4 mt-10 pt-6 border-t border-[var(--color-border)]/10">
          <Button variant="outline" type="button" onClick={onClose} className="rounded-2xl border-[var(--color-border)]/10 text-[10px] font-black uppercase tracking-widest px-8">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting} className="rounded-2xl px-8 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-[var(--color-primary)]/20">
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Authorize
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default InviteMemberModal
