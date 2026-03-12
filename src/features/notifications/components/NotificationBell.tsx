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
          "relative p-2.5 rounded-xl transition-all duration-200 border",
          isOpen 
            ? "bg-primary/10 border-primary text-primary shadow-inner" 
            : "bg-white border-gray-100 text-gray-400 hover:text-gray-900 hover:border-gray-200 hover:shadow-sm"
        )}
      >
        <Bell className={cn("h-5 w-5", isOpen && "animate-none")} />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 h-4 w-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white animate-in zoom-in-0 duration-300">
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
