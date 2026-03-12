import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Mail, Phone, Building2, User, MoreVertical, GripVertical, ExternalLink } from 'lucide-react'
import { cn } from '../../../utils/index.ts'
import { Link } from 'react-router-dom'
import Badge from '../../../components/ui/Badge.tsx'

interface LeadCardProps {
  lead: any
}

const LeadCard: React.FC<LeadCardProps> = ({ lead }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: lead.id,
  })

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
    opacity: isDragging ? 0.5 : undefined,
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value)
  }

  const getSourceBadgeVariant = (source: string) => {
    switch (source?.toLowerCase()) {
      case 'linkedin': return 'neutral'
      case 'website': return 'success'
      case 'referral': return 'warning'
      default: return 'neutral'
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "bg-white p-5 rounded-2xl border border-gray-100 shadow-sm transition-all group hover:border-primary/30",
        isDragging && "ring-2 ring-primary border-transparent scale-[1.02]"
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <button 
            {...listeners} 
            {...attributes} 
            className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-400 p-0.5 rounded transition-colors"
          >
            <GripVertical className="h-4 w-4" />
          </button>
          <Badge variant={getSourceBadgeVariant(lead.source)} className="text-[10px] uppercase font-bold px-2">
            {lead.source || 'General'}
          </Badge>
        </div>
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-3">
        <Link to={`/crm/${lead.id}`} virtual-href={`/crm/${lead.id}`} className="block">
          <h4 className="text-base font-bold text-gray-900 line-clamp-1 group-hover:text-primary transition-colors flex items-center gap-1.5">
            {lead.name}
            <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </h4>
        </Link>
        
        <div className="flex items-center gap-1.5 text-sm text-gray-500">
          <Building2 className="h-3.5 w-3.5" />
          <span className="font-medium truncate">{lead.company}</span>
        </div>

        <div className="flex flex-col gap-1.5 pt-1">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Mail className="h-3 w-3" />
            <span className="truncate">{lead.email}</span>
          </div>
          {lead.phone && (
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <Phone className="h-3 w-3" />
              <span>{lead.phone}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-50">
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Value</span>
          <span className="text-sm font-bold text-gray-900">{formatCurrency(lead.value)}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-gray-600">
            {lead.assignedTo?.charAt(0) || <User className="h-3 w-3" />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeadCard
