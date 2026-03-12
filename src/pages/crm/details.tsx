import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { crmService } from '../../services/crmService.ts'
import Button from '../../components/ui/Button.tsx'
import Badge from '../../components/ui/Badge.tsx'
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Building2, 
  Target, 
  Trash2, 
  Edit,
  Loader2,
  DollarSign,
  User,
  History,
  MessageSquare,
  Calendar
} from 'lucide-react'
import { useAppDispatch } from '../../hooks/redux.ts'
import { deleteLeadAsync, optimisticDeleteLead } from '../../store/crmSlice.ts'

const LeadDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [lead, setLead] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLead = async () => {
      if (!id) return
      setLoading(true)
      try {
        const data = await crmService.getLeadById(id)
        setLead(data)
      } catch (error) {
        console.error('Failed to fetch lead details', error)
      } finally {
        setLoading(false)
      }
    }
    fetchLead()
  }, [id])

  const handleDelete = () => {
    if (!id || !window.confirm('Are you sure you want to delete this lead?')) return
    dispatch(optimisticDeleteLead(id))
    dispatch(deleteLeadAsync(id))
    navigate('/crm')
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!lead) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold">Lead not found</h2>
        <Link to="/crm" virtual-href="/crm" className="text-primary hover:underline mt-4 inline-block">
          Back to Pipeline
        </Link>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <Link 
        to="/crm" 
        virtual-href="/crm"
        className="flex items-center text-sm font-bold text-[var(--text-muted)] hover:text-[var(--color-primary)] transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to pipeline
      </Link>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-[var(--color-primary)]/10 flex items-center justify-center text-2xl font-black text-[var(--color-primary)] border border-[var(--color-primary)]/10 shadow-sm transition-colors">
            {lead.name?.charAt(0)}
          </div>
          <div className="space-y-1.5">
            <h1 className="text-3xl font-black text-[var(--text-primary)] tracking-tight">{lead.name}</h1>
            <div className="flex items-center gap-2.5 text-[var(--text-secondary)] font-bold text-sm">
               <Building2 className="h-4 w-4 text-[var(--text-muted)]" />
               <span>{lead.company}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="ring-1 ring-[var(--color-border)]/10">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="outline" className="text-red-500 hover:text-red-400 border-red-500/10 hover:border-red-500/20 bg-red-500/5" onClick={handleDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-[var(--bg-card)] p-8 rounded-2xl border border-[var(--color-border)]/10 shadow-sm space-y-8 transition-colors duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               <div className="space-y-5">
                  <h3 className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.2em]">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-[var(--bg-main)] border border-[var(--color-border)]/10 group hover:border-[var(--color-primary)]/30 transition-all">
                      <Mail className="h-4 w-4 text-[var(--color-primary)]" />
                      <span className="text-sm font-black text-[var(--text-primary)] truncate">{lead.email}</span>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-[var(--bg-main)] border border-[var(--color-border)]/10 group hover:border-[var(--color-primary)]/30 transition-all">
                      <Phone className="h-4 w-4 text-[var(--color-primary)]" />
                      <span className="text-sm font-black text-[var(--text-primary)]">{lead.phone || 'No phone provided'}</span>
                    </div>
                  </div>
               </div>
               <div className="space-y-5">
                  <h3 className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.2em]">Lead Origin</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-[var(--bg-main)] border border-[var(--color-border)]/10 group hover:border-[var(--color-primary)]/30 transition-all">
                      <Target className="h-4 w-4 text-[var(--color-primary)]" />
                      <span className="text-sm font-black text-[var(--text-primary)] uppercase tracking-wider">{lead.source}</span>
                    </div>
                  </div>
               </div>
            </div>

            <hr className="border-[var(--color-border)]/5" />

            <div className="space-y-8">
               <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black text-[var(--text-primary)] uppercase tracking-widest flex items-center gap-3">
                    <History className="h-4 w-4 text-[var(--text-muted)]" />
                    Interaction Timeline
                  </h3>
                  <Button variant="outline" size="sm" className="text-[10px] font-black uppercase tracking-widest h-9 border-[var(--color-border)]/10">
                    <MessageSquare className="h-3 w-3 mr-2" />
                    Log Activity
                  </Button>
               </div>
               <div className="relative pl-10 space-y-10 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-[var(--color-border)]/5">
                  <div className="relative">
                    <div className="absolute -left-10 mt-1.5 w-6 h-6 rounded-full bg-blue-500/10 border-4 border-[var(--bg-card)] flex items-center justify-center shadow-sm" />
                    <div className="space-y-1.5">
                      <p className="text-sm font-black text-[var(--text-primary)]">Lead Created</p>
                      <p className="text-xs text-[var(--text-muted)] font-medium leading-relaxed">Initial registration via {lead.source} system.</p>
                      <span className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-tighter opacity-60">March 10, 2026 - 10:45 AM</span>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-10 mt-1.5 w-6 h-6 rounded-full bg-yellow-500/10 border-4 border-[var(--bg-card)] flex items-center justify-center shadow-sm" />
                    <div className="space-y-1.5">
                      <p className="text-sm font-black text-[var(--text-primary)]">Stage Advanced: {lead.status}</p>
                      <p className="text-xs text-[var(--text-muted)] font-medium leading-relaxed">Lead moved to {lead.status} stage by Alex Riviera.</p>
                      <span className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-tighter opacity-60">March 12, 2026 - 02:15 PM</span>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--color-border)]/10 shadow-sm space-y-8 transition-colors duration-300">
            <h3 className="text-xs font-black text-[var(--text-primary)] uppercase tracking-widest flex items-center gap-3">
              <DollarSign className="h-4 w-4 text-[var(--text-muted)]" />
              Financial Insight
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[var(--text-muted)]">Potential Value</span>
                <span className="text-xl font-black text-[var(--color-primary)] tracking-tighter">${Number(lead.value).toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]/5">
                <span className="text-sm font-bold text-[var(--text-muted)]">Current Stage</span>
                <Badge variant={lead.status === 'Won' ? 'success' : lead.status === 'Lost' ? 'error' : 'neutral'}>
                  {lead.status}
                </Badge>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]/5">
                <span className="text-sm font-bold text-[var(--text-muted)]">Deal Owner</span>
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center text-[10px] font-black text-[var(--color-primary)] shadow-sm">
                    {lead.assignedTo?.charAt(0) || <User className="h-3 w-3" />}
                  </div>
                  <span className="text-sm font-black text-[var(--text-primary)]">{lead.assignedTo}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--color-border)]/10 shadow-sm space-y-6 transition-colors duration-300">
             <h3 className="text-xs font-black text-[var(--text-primary)] uppercase tracking-widest flex items-center gap-3">
              <Calendar className="h-4 w-4 text-[var(--text-muted)]" />
              Strategic Follow-up
            </h3>
            <div className="p-5 rounded-xl bg-orange-500/5 border border-orange-500/10 space-y-3">
               <p className="text-[10px] font-black text-orange-500 uppercase tracking-[0.2em]">Priority Action</p>
               <p className="text-sm text-[var(--text-primary)] font-bold italic">"Schedule discovery call with {lead.name}"</p>
               <Button size="sm" className="w-full bg-orange-500 hover:bg-orange-600 text-white border-0 mt-2 font-black uppercase tracking-widest text-[10px] h-10 shadow-lg shadow-orange-500/10">
                  Execute Task
               </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeadDetailsPage
