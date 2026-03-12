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
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <Input
            label="Prospect Name"
            placeholder="John Doe"
            {...register('name', { required: 'Name is required' })}
            error={errors.name?.message as string}
          />
          <Input
            label="Corporate Entity"
            placeholder="Acme Corp"
            {...register('company', { required: 'Company is required' })}
            error={errors.company?.message as string}
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <Input
            label="Digital Address"
            type="email"
            placeholder="john@example.com"
            {...register('email', { required: 'Email is required' })}
            error={errors.email?.message as string}
          />
          <Input
            label="Comms Frequency"
            placeholder="+1 (555) 000-0000"
            {...register('phone')}
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1 flex items-center gap-2">
              <DollarSign className="h-3.5 w-3.5 opacity-50" />
              Capital Value ($)
            </label>
            <input
              type="number"
              className="w-full h-11 rounded-2xl border border-[var(--color-border)]/10 bg-[var(--bg-main)]/50 px-4 py-2 text-sm font-bold text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/20 focus-visible:border-[var(--color-primary)] transition-all shadow-sm"
              {...register('value', { required: 'Deal value is required', min: 0 })}
            />
            {errors.value && <p className="text-[10px] text-red-500 font-black mt-1 uppercase">{errors.value.message as string}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1 flex items-center gap-2">
              <Target className="h-3.5 w-3.5 opacity-50" />
              Inflow Vector
            </label>
            <select
              className="w-full h-11 rounded-2xl border border-[var(--color-border)]/10 bg-[var(--bg-main)]/50 px-4 py-2 text-sm font-bold text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/20 focus-visible:border-[var(--color-primary)] transition-all shadow-sm"
              {...register('source')}
            >
              <option value="Website">Website</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Referral">Referral</option>
              <option value="Cold Outreach">Cold Outreach</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1 flex items-center gap-2">
              <Briefcase className="h-3.5 w-3.5 opacity-50" />
              Pipeline Phase
            </label>
            <select
              className="w-full h-11 rounded-2xl border border-[var(--color-border)]/10 bg-[var(--bg-main)]/50 px-4 py-2 text-sm font-bold text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/20 focus-visible:border-[var(--color-primary)] transition-all shadow-sm"
              {...register('status')}
            >
              <option value="New Lead">New Lead</option>
              <option value="Contacted">Contacted</option>
              <option value="Negotiation">Negotiation</option>
              <option value="Won">Won</option>
              <option value="Lost">Lost</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1">Asset Manager</label>
            <select
              className="w-full h-11 rounded-2xl border border-[var(--color-border)]/10 bg-[var(--bg-main)]/50 px-4 py-2 text-sm font-bold text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/20 focus-visible:border-[var(--color-primary)] transition-all shadow-sm"
              {...register('assignedTo')}
            >
              <option value="Alex Rivera">Alex Rivera</option>
              <option value="Sarah Chen">Sarah Chen</option>
              <option value="Jordan Smith">Jordan Smith</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-[var(--color-border)]/10">
          <Button variant="outline" type="button" onClick={onClose} className="rounded-2xl border-[var(--color-border)]/10 text-[10px] font-black uppercase tracking-widest px-8">
            Abeyance
          </Button>
          <Button type="submit" disabled={isSubmitting} className="rounded-2xl px-8 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-[var(--color-primary)]/20">
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Ingest Lead
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default LeadModal
