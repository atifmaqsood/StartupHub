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
        "bg-[var(--bg-card)] p-5 rounded-2xl border border-[var(--color-border)]/10 shadow-sm transition-all group hover:border-[var(--color-primary)]/30",
        isDragging && "ring-2 ring-[var(--color-primary)] border-transparent scale-[1.02]"
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <button 
            {...listeners} 
            {...attributes} 
            className="cursor-grab active:cursor-grabbing text-[var(--text-muted)] hover:text-[var(--text-primary)] p-1 rounded-lg transition-colors"
          >
            <GripVertical className="h-4 w-4" />
          </button>
          <Badge variant={getSourceBadgeVariant(lead.source)} className="text-[10px] uppercase font-black px-2.5 py-0.5">
            {lead.source || 'General'}
          </Badge>
        </div>
        <button className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors p-1">
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-4">
        <Link to={`/crm/${lead.id}`} virtual-href={`/crm/${lead.id}`} className="block">
          <h4 className="text-base font-bold text-[var(--text-primary)] line-clamp-1 group-hover:text-[var(--color-primary)] transition-colors flex items-center gap-2">
            {lead.name}
            <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </h4>
        </Link>
        
        <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
          <Building2 className="h-3.5 w-3.5" />
          <span className="font-bold truncate">{lead.company}</span>
        </div>

        <div className="flex flex-col gap-2 pt-1 border-l-2 border-[var(--color-border)]/10 pl-3">
          <div className="flex items-center gap-2 text-[11px] font-medium text-[var(--text-muted)]">
            <Mail className="h-3 w-3" />
            <span className="truncate">{lead.email}</span>
          </div>
          {lead.phone && (
            <div className="flex items-center gap-2 text-[11px] font-medium text-[var(--text-muted)]">
              <Phone className="h-3 w-3" />
              <span>{lead.phone}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mt-6 pt-4 border-t border-[var(--color-border)]/5">
        <div className="flex flex-col">
          <span className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-wider">Potential</span>
          <span className="text-sm font-black text-[var(--text-primary)]">{formatCurrency(lead.value)}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[var(--bg-main)] border-2 border-[var(--bg-card)] shadow-sm flex items-center justify-center text-[10px] font-black text-[var(--color-primary)] overflow-hidden">
            {lead.assignedTo?.charAt(0) || <User className="h-3 w-3" />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeadCard
