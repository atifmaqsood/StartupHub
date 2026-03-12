import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { markAsRead, markAllAsRead } from '../../../store/notificationSlice'
import { notificationService } from '../../../services/notificationService'
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

  const handleMarkAllRead = async () => {
    try {
      await notificationService.markAllAsRead()
      dispatch(markAllAsRead())
    } catch (error) {
      console.error('Failed to mark all as read', error)
    }
  }

  const handleItemClick = async (notif: any) => {
    if (!notif.isRead) {
      try {
        await notificationService.markAsRead(notif.id)
        dispatch(markAsRead(notif.id))
      } catch (error) {
        console.error('Failed to mark as read', error)
      }
    }
    
    // Logic for redirection if needed
    // if (notif.type === 'project') navigate(`/projects/${notif.entityId}`)
    
    onClose()
  }

  return (
    <div className="absolute top-12 right-0 w-80 sm:w-96 bg-white rounded-2xl border border-gray-100 shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
      <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
        <h3 className="font-bold text-gray-900">Notifications</h3>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button 
              onClick={handleMarkAllRead}
              className="p-1.5 hover:bg-white rounded-lg text-primary transition-colors hover:shadow-sm"
              title="Mark all as read"
            >
              <CheckCheck className="h-4 w-4" />
            </button>
          )}
          <button className="p-1.5 hover:bg-white rounded-lg text-gray-400 transition-colors hover:text-gray-600">
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="max-h-[400px] overflow-y-auto scrollbar-hide">
        {items.length > 0 ? (
          <div>
            {latestNotifications.map(notif => (
              <NotificationItem 
                key={notif.id} 
                notification={notif} 
                onClick={() => handleItemClick(notif)}
              />
            ))}
          </div>
        ) : (
          <div className="py-12 flex flex-col items-center justify-center space-y-3">
            <div className="p-4 bg-gray-50 rounded-full">
              <BellOff className="h-8 w-8 text-gray-300" />
            </div>
            <p className="text-sm font-medium text-gray-400">All caught up!</p>
          </div>
        )}
      </div>

      <div className="p-3 border-t border-gray-50 bg-gray-50/30">
        <Button 
          variant="outline" 
          fullWidth 
          className="h-10 text-gray-600 border-0 hover:bg-white"
          onClick={() => {
            navigate('/notifications')
            onClose()
          }}
        >
          View All Activity
        </Button>
      </div>
    </div>
  )
}

export default NotificationDropdown
