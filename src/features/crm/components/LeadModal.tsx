import React from 'react'
import { useForm } from 'react-hook-form'
import Modal from '../../../components/modals/Modal.tsx'
import Input from '../../../components/ui/Input.tsx'
import Button from '../../../components/ui/Button.tsx'
import { Loader2, DollarSign, Target, Briefcase } from 'lucide-react'

interface LeadModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => Promise<void>
}

const LeadModal: React.FC<LeadModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      name: '',
      company: '',
      email: '',
      phone: '',
      value: 0,
      source: 'Website',
      status: 'New Lead',
      assignedTo: 'Alex Rivera'
    }
  })

  const onFormSubmit = async (data: any) => {
    await onSubmit(data)
    reset()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Lead">
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Contact Name"
            placeholder="John Doe"
            {...register('name', { required: 'Name is required' })}
            error={errors.name?.message as string}
          />
          <Input
            label="Company"
            placeholder="Acme Corp"
            {...register('company', { required: 'Company is required' })}
            error={errors.company?.message as string}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="john@example.com"
            {...register('email', { required: 'Email is required' })}
            error={errors.email?.message as string}
          />
          <Input
            label="Phone"
            placeholder="+1 (555) 000-0000"
            {...register('phone')}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <DollarSign className="h-3.5 w-3.5 text-gray-400" />
              Deal Value ($)
            </label>
            <input
              type="number"
              className="w-full h-10 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary"
              {...register('value', { required: 'Deal value is required', min: 0 })}
            />
            {errors.value && <p className="text-xs text-red-500 font-medium">{errors.value.message as string}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Target className="h-3.5 w-3.5 text-gray-400" />
              Lead Source
            </label>
            <select
              className="w-full h-10 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary"
              {...register('source')}
            >
              <option value="Website">Website</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Referral">Referral</option>
              <option value="Cold Outreach">Cold Outreach</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Briefcase className="h-3.5 w-3.5 text-gray-400" />
              Initial Stage
            </label>
            <select
              className="w-full h-10 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary"
              {...register('status')}
            >
              <option value="New Lead">New Lead</option>
              <option value="Contacted">Contacted</option>
              <option value="Negotiation">Negotiation</option>
              <option value="Won">Won</option>
              <option value="Lost">Lost</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Assign To</label>
            <select
              className="w-full h-10 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary"
              {...register('assignedTo')}
            >
              <option value="Alex Rivera">Alex Rivera</option>
              <option value="Sarah Chen">Sarah Chen</option>
              <option value="Jordan Smith">Jordan Smith</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-50">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Lead
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default LeadModal
