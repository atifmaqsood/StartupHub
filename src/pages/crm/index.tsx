import React, { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../hooks/redux.ts'
import { fetchLeads, createLead } from '../../store/crmSlice.ts'
import PipelineBoard from '../../features/crm/components/PipelineBoard.tsx'
import LeadModal from '../../features/crm/components/LeadModal.tsx'
import Button from '../../components/ui/Button.tsx'
import { Plus, Search, Filter, Loader2, Users } from 'lucide-react'

const CRMPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { leads, loading } = useAppSelector((state) => state.crm)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    dispatch(fetchLeads())
  }, [dispatch])

  const handleCreateLead = async (data: any) => {
    await dispatch(createLead(data))
    setIsModalOpen(false)
  }

  const totalPipelineValue = leads.reduce((acc, lead) => acc + (Number(lead.value) || 0), 0)
  const wonLeads = leads.filter(l => l.status === 'Won').length

  return (
    <div className="p-8 h-full space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)]">Sales Pipeline</h1>
          <p className="text-[var(--text-secondary)]">Track your leads and manage sales stages effectively.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-6 mr-4 bg-[var(--bg-card)] px-6 py-2 rounded-2xl border border-[var(--color-border)]/10 shadow-sm transition-colors">
            <div className="flex flex-col">
              <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest leading-tight">Pipeline Value</span>
              <span className="text-lg font-bold text-[var(--color-primary)]">${(totalPipelineValue / 1000).toFixed(1)}k</span>
            </div>
            <div className="w-px h-8 bg-[var(--color-border)]/20" />
            <div className="flex flex-col">
              <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest leading-tight">Converted</span>
              <span className="text-lg font-bold text-green-500">{wonLeads} Leads</span>
            </div>
          </div>
          <Button onClick={() => setIsModalOpen(true)} className="shadow-lg shadow-[var(--color-primary)]/20">
            <Plus className="mr-2 h-4 w-4" />
            New Lead
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[var(--bg-card)] p-4 rounded-xl border border-[var(--color-border)]/10 shadow-sm transition-colors duration-300">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
          <input
            placeholder="Search leads..."
            className="pl-10 h-11 w-full rounded-xl border border-[var(--color-border)]/20 bg-[var(--bg-main)] px-4 py-2 text-sm text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/20 focus-visible:border-[var(--color-primary)] transition-all placeholder:text-[var(--text-muted)]"
          />
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="h-11 ring-1 ring-[var(--color-border)]/10">
            <Filter className="mr-2 h-4 w-4" />
            Stage
          </Button>
           <Button variant="outline" className="h-11 ring-1 ring-[var(--color-border)]/10">
            <Users className="mr-2 h-4 w-4" />
            Owners
          </Button>
        </div>
      </div>

      {loading && leads.length === 0 ? (
        <div className="h-64 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[var(--color-primary)]" />
        </div>
      ) : (
        <PipelineBoard leads={leads} />
      )}

      <LeadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleCreateLead} 
      />
    </div>
  )
}

export default CRMPage
