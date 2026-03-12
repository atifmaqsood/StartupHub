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
import { useDispatch } from 'react-redux'
import { deleteLead } from '../../store/crmSlice.ts'

const LeadDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useDispatch()
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

  const handleDelete = async () => {
    if (!id || !window.confirm('Are you sure you want to delete this lead?')) return
    try {
      await crmService.deleteLead(id)
      dispatch(deleteLead(id))
      navigate('/crm')
    } catch (error) {
      console.error('Failed to delete lead', error)
    }
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
        className="flex items-center text-sm text-gray-500 hover:text-primary transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to pipeline
      </Link>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary border border-primary/20">
            {lead.name?.charAt(0)}
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-gray-900">{lead.name}</h1>
            <div className="flex items-center gap-2 text-gray-500">
               <Building2 className="h-4 w-4" />
               <span className="font-medium">{lead.company}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="outline" className="text-red-500 hover:text-red-600 border-red-100 hover:border-red-200" onClick={handleDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-4">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                      <Mail className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium text-gray-900">{lead.email}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                      <Phone className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium text-gray-900">{lead.phone || 'No phone provided'}</span>
                    </div>
                  </div>
               </div>
               <div className="space-y-4">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Lead Origin</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                      <Target className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium text-gray-900">{lead.source}</span>
                    </div>
                  </div>
               </div>
            </div>

            <hr className="border-gray-50" />

            <div className="space-y-6">
               <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <History className="h-5 w-5 text-gray-400" />
                    Interaction History
                  </h3>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-3.5 w-3.5 mr-2" />
                    Log Note
                  </Button>
               </div>
               <div className="relative pl-8 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-gray-100">
                  <div className="relative">
                    <div className="absolute -left-8 mt-1.5 w-6 h-6 rounded-full bg-blue-100 border-4 border-white flex items-center justify-center" />
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-gray-900">Lead Created</p>
                      <p className="text-xs text-gray-500">Initial registration via {lead.source} system.</p>
                      <span className="text-[10px] text-gray-400 font-medium">March 10, 2026 - 10:45 AM</span>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-8 mt-1.5 w-6 h-6 rounded-full bg-yellow-100 border-4 border-white flex items-center justify-center" />
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-gray-900">Status Changed to {lead.status}</p>
                      <p className="text-xs text-gray-500">Lead moved to {lead.status} stage by Alex Rivera.</p>
                      <span className="text-[10px] text-gray-400 font-medium">March 12, 2026 - 02:15 PM</span>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-gray-400" />
              Deal Insight
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-500">Estimated Value</span>
                <span className="text-lg font-bold text-primary">${Number(lead.value).toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-t border-gray-50">
                <span className="text-sm text-gray-500">Current Stage</span>
                <Badge variant={lead.status === 'Won' ? 'success' : lead.status === 'Lost' ? 'error' : 'neutral'}>
                  {lead.status}
                </Badge>
              </div>
              <div className="flex items-center justify-between py-2 border-t border-gray-50">
                <span className="text-sm text-gray-500">Assigned Sales</span>
                <div className="flex items-center gap-2">
                   <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                    {lead.assignedTo?.charAt(0) || <User className="h-3 w-3" />}
                  </div>
                  <span className="text-sm font-medium text-gray-900">{lead.assignedTo}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
             <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              Follow-up
            </h3>
            <div className="p-4 rounded-xl bg-orange-50 border border-orange-100 space-y-2">
               <p className="text-xs font-bold text-orange-700 uppercase tracking-widest">Next Action Required</p>
               <p className="text-sm text-orange-900 font-medium">Schedule discovery call with {lead.name}</p>
               <Button size="sm" className="w-full bg-orange-600 hover:bg-orange-700 text-white border-0 mt-2">
                  Complete Task
               </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeadDetailsPage
