import React, { useState, useRef, useEffect } from 'react'
import { Bell } from 'lucide-react'
import { useAppSelector, useAppDispatch } from '../../../hooks/redux'
import { setNotifications, setLoading } from '../../../store/notificationSlice'
import { notificationService } from '../../../services/notificationService'
import NotificationDropdown from './NotificationDropdown'
import { cn } from '../../../utils'

const NotificationBell: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()
  const { items } = useAppSelector(state => state.notifications)
  
  const unreadCount = items.filter(n => !n.isRead).length

  useEffect(() => {
    const fetchNotifications = async () => {
      dispatch(setLoading(true))
      try {
        const data = await notificationService.getNotifications()
        dispatch(setNotifications(data as any))
      } finally {
        dispatch(setLoading(false))
      }
    }
    fetchNotifications()
  }, [dispatch])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "relative p-3 rounded-2xl transition-all duration-300 border",
          isOpen 
            ? "bg-[var(--color-primary)]/10 border-[var(--color-primary)] text-[var(--color-primary)] shadow-sm" 
            : "bg-[var(--bg-main)]/50 border-[var(--color-border)]/10 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--color-primary)]/30 hover:shadow-md"
        )}
      >
        <Bell className={cn("h-5 w-5", isOpen && "scale-110")} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-[9px] font-black flex items-center justify-center rounded-xl border-2 border-[var(--bg-card)] shadow-lg animate-in zoom-in duration-500">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <NotificationDropdown onClose={() => setIsOpen(false)} />
      )}
    </div>
  )
}

export default NotificationBell
