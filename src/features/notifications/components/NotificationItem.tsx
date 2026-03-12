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
        "flex gap-4 p-4 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-50 last:border-0 relative",
        !notification.isRead && "bg-primary/5"
      )}
    >
      <div className="flex-shrink-0 relative">
        {notification.userAvatar ? (
          <img 
            src={notification.userAvatar} 
            alt={notification.userName} 
            className="h-10 w-10 rounded-xl object-cover border border-gray-100 shadow-sm"
          />
        ) : (
          <div className="h-10 w-10 rounded-xl bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-400 border border-gray-100">
            {getInitials(notification.userName)}
          </div>
        )}
        <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-lg border border-gray-100 shadow-sm">
          {getIcon()}
        </div>
      </div>

      <div className="flex-1 space-y-1">
        <p className={cn(
          "text-sm text-gray-900 leading-snug",
          !notification.isRead ? "font-bold" : "font-medium"
        )}>
          {notification.message}
        </p>
        <p className="text-xs text-gray-400 font-medium flex items-center gap-1.5">
          {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
        </p>
      </div>

      {!notification.isRead && (
        <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-primary" />
      )}
    </div>
  )
}

export default NotificationItem
