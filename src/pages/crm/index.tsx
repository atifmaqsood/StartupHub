import React, { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../hooks/redux.ts'
import { setLeads, setLoading, addLead } from '../../store/crmSlice.ts'
import { crmService } from '../../services/crmService.ts'
import PipelineBoard from '../../features/crm/components/PipelineBoard.tsx'
import LeadModal from '../../features/crm/components/LeadModal.tsx'
import Button from '../../components/ui/Button.tsx'
import { Plus, Search, Filter, Loader2, Users } from 'lucide-react'

const CRMPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { leads, loading } = useAppSelector((state) => state.crm)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const fetchLeads = async () => {
      dispatch(setLoading(true))
      try {
        const data = await crmService.getLeads()
        dispatch(setLeads(data as any))
      } finally {
        dispatch(setLoading(false))
      }
    }
    fetchLeads()
  }, [dispatch])

  const handleCreateLead = async (data: any) => {
    try {
      const newLead = await crmService.createLead(data)
      dispatch(addLead(newLead as any))
    } catch (error) {
      console.error('Failed to create lead', error)
    }
  }

  const totalPipelineValue = leads.reduce((acc, lead) => acc + (Number(lead.value) || 0), 0)
  const wonLeads = leads.filter(l => l.status === 'Won').length

  return (
    <div className="p-8 h-full space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Sales Pipeline</h1>
          <p className="text-gray-500">Track your leads and manage sales stages effectively.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-6 mr-4 bg-white px-6 py-2 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-tight">Pipeline Value</span>
              <span className="text-lg font-bold text-primary">${(totalPipelineValue / 1000).toFixed(1)}k</span>
            </div>
            <div className="w-px h-8 bg-gray-100" />
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-tight">Converted</span>
              <span className="text-lg font-bold text-green-600">{wonLeads} Leads</span>
            </div>
          </div>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Lead
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            placeholder="Search leads..."
            className="pl-10 h-10 w-full rounded-lg border border-gray-100 bg-gray-50/50 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary transition-all"
          />
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="h-10">
            <Filter className="mr-2 h-4 w-4" />
            Stage
          </Button>
           <Button variant="outline" className="h-10">
            <Users className="mr-2 h-4 w-4" />
            Owners
          </Button>
        </div>
      </div>

      {loading && leads.length === 0 ? (
        <div className="h-64 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
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
