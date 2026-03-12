import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import { cn } from '../../../utils'
import { 
  Briefcase, 
  CheckCircle2, 
  Target, 
  Users, 
  Circle 
} from 'lucide-react'

interface NotificationItemProps {
  notification: any
  onClick?: () => void
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onClick }) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'project': return <Briefcase className="h-4 w-4 text-blue-500" />
      case 'task': return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case 'crm': return <Target className="h-4 w-4 text-purple-500" />
      case 'team': return <Users className="h-4 w-4 text-orange-500" />
      default: return <Circle className="h-4 w-4 text-gray-500" />
    }
  }

  const getInitials = (name: string) => {
    if (!name) return '?'
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <div 
      onClick={onClick}
      className={cn(
        "flex gap-5 p-6 hover:bg-[var(--color-primary)]/[0.03] transition-all cursor-pointer border-b border-[var(--color-border)]/5 last:border-0 relative group",
        !notification.isRead && "bg-[var(--color-primary)]/[0.02]"
      )}
    >
      <div className="flex-shrink-0 relative">
        {notification.userAvatar ? (
          <img 
            src={notification.userAvatar} 
            alt={notification.userName} 
            className="h-12 w-12 rounded-2xl object-cover border border-[var(--color-border)]/10 shadow-sm"
          />
        ) : (
          <div className="h-12 w-12 rounded-2xl bg-[var(--bg-main)] flex items-center justify-center text-xs font-black text-[var(--text-muted)] border border-[var(--color-border)]/10 shadow-sm">
            {getInitials(notification.userName)}
          </div>
        )}
        <div className="absolute -bottom-1.5 -right-1.5 bg-[var(--bg-card)] p-1.5 rounded-xl border border-[var(--color-border)]/10 shadow-lg transform group-hover:scale-110 transition-transform">
          {getIcon()}
        </div>
      </div>

      <div className="flex-1 space-y-1.5">
        <p className={cn(
          "text-[13px] leading-relaxed tracking-tight transition-colors",
          !notification.isRead ? "font-black text-[var(--text-primary)]" : "font-semibold text-[var(--text-secondary)]"
        )}>
          {notification.message}
        </p>
        <div className="flex items-center gap-3">
          <p className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-widest opacity-60">
            {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
          </p>
          {notification.type && (
            <span className="h-1 w-1 rounded-full bg-[var(--text-muted)] opacity-30" />
          )}
          <span className="text-[10px] text-[var(--color-primary)] font-black uppercase tracking-widest opacity-80">
            {notification.type}
          </span>
        </div>
      </div>

      {!notification.isRead && (
        <div className="flex-shrink-0 flex items-center pr-2">
          <div className="h-2.5 w-2.5 rounded-full bg-[var(--color-primary)] shadow-[0_0_12px_rgba(var(--color-primary-rgb),0.5)] animate-pulse" />
        </div>
      )}
    </div>
  )
}

export default NotificationItem
