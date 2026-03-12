import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { markAsReadAsync, markAllAsReadAsync, optimisticMarkAsRead, optimisticMarkAllAsRead } from '../../../store/notificationSlice'
import NotificationItem from './NotificationItem'
import Button from '../../../components/ui/Button'
import { CheckCheck, Settings, BellOff } from 'lucide-react'

interface NotificationDropdownProps {
  onClose: () => void
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ onClose }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { items } = useAppSelector(state => state.notifications)
  
  const latestNotifications = items.slice(0, 5)
  const unreadCount = items.filter(n => !n.isRead).length

  const handleMarkAllRead = () => {
    dispatch(optimisticMarkAllAsRead())
    dispatch(markAllAsReadAsync())
  }

  const handleItemClick = (notif: any) => {
    if (!notif.isRead) {
      dispatch(optimisticMarkAsRead(notif.id))
      dispatch(markAsReadAsync(notif.id))
    }
    
    onClose()
  }

  return (
    <div className="absolute top-14 right-0 w-80 sm:w-[420px] bg-[var(--bg-card)] rounded-3xl border border-[var(--color-border)]/10 shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-300 origin-top-right transition-colors duration-300">
      <div className="px-6 py-5 border-b border-[var(--color-border)]/5 flex items-center justify-between bg-[var(--bg-main)]/50">
        <div>
          <h3 className="text-sm font-black text-[var(--text-primary)] uppercase tracking-widest">Neural Feed</h3>
          <p className="text-[9px] font-black text-[var(--text-muted)] opacity-50 uppercase tracking-widest mt-1">Real-time intelligence</p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button 
              onClick={handleMarkAllRead}
              className="p-2 hover:bg-[var(--bg-card)] rounded-xl text-[var(--color-primary)] transition-all hover:shadow-lg active:scale-95 border border-transparent hover:border-[var(--color-border)]/10"
              title="Mark all as read"
            >
              <CheckCheck className="h-4 w-4" />
            </button>
          )}
          <button 
            onClick={() => {
              navigate('/settings/notifications')
              onClose()
            }}
            className="p-2 hover:bg-[var(--bg-card)] rounded-xl text-[var(--text-muted)] transition-all hover:text-[var(--text-primary)] border border-transparent hover:border-[var(--color-border)]/10 active:scale-95"
          >
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="max-h-[450px] overflow-y-auto custom-scrollbar">
        {items.length > 0 ? (
          <div className="divide-y divide-[var(--color-border)]/5">
            {latestNotifications.map(notif => (
              <NotificationItem 
                key={notif.id} 
                notification={notif} 
                onClick={() => handleItemClick(notif)}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 flex flex-col items-center justify-center space-y-4">
            <div className="p-6 bg-[var(--bg-main)] rounded-2xl border border-[var(--color-border)]/10">
              <BellOff className="h-10 w-10 text-[var(--text-muted)] opacity-20" />
            </div>
            <div className="text-center">
              <h4 className="text-xs font-black text-[var(--text-primary)] uppercase tracking-widest">Feed Zero</h4>
              <p className="text-[10px] font-bold text-[var(--text-muted)] mt-1 italic">No new signals detected.</p>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-[var(--color-border)]/5 bg-[var(--bg-main)]/30">
        <Button 
          variant="outline" 
          fullWidth 
          className="h-12 text-[var(--text-muted)] border-[var(--color-border)]/10 hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)] font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl"
          onClick={() => {
            navigate('/notifications')
            onClose()
          }}
        >
          Access Full Stream
        </Button>
      </div>
    </div>
  )
}

export default NotificationDropdown
