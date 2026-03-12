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
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5">
        <Input
          label="Full Name"
          placeholder="e.g. John Doe"
          {...register('name', { required: 'Name is required' })}
          error={errors.name?.message as string}
        />
        
        <Input
          label="Email Address"
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

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Shield className="h-3.5 w-3.5 text-gray-400" />
            Organizational Role
          </label>
          <select
            className="w-full h-10 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary transition-all"
            {...register('role')}
          >
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Member">Member</option>
          </select>
          <p className="text-[10px] text-gray-400 mt-1 pl-1">
            New members will receive an email invitation to join the workspace.
          </p>
        </div>

        <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-50">
          <Button variant="outline" type="button" onClick={onClose} className="h-10 min-w-[80px]">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting} className="h-10 min-w-[120px]">
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Send Invitation
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default InviteMemberModal
