import React, { useEffect, useState, useMemo } from 'react'
import { useAppSelector, useAppDispatch } from '../../hooks/redux'
import { setNotifications, setLoading, markAllAsRead } from '../../store/notificationSlice'
import { notificationService } from '../../services/notificationService'
import NotificationItem from '../../features/notifications/components/NotificationItem'
import Button from '../../components/ui/Button'
import { 
  Bell, 
  Filter, 
  CheckCheck, 
  Search, 
  Loader2,
  Calendar,
  Briefcase,
  CheckCircle2,
  Target,
  Users
} from 'lucide-react'
import { cn } from '../../utils'

const ActivityFeedPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { items, loading } = useAppSelector((state) => state.notifications)
  const [filter, setFilter] = useState<'all' | 'project' | 'task' | 'crm' | 'team'>('all')
  const [searchQuery, setSearchQuery] = useState('')

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

  const handleMarkAllRead = async () => {
    try {
      await notificationService.markAllAsRead()
      dispatch(markAllAsRead())
    } catch (error) {
      console.error('Failed to mark all as read', error)
    }
  }

  const filteredNotifications = useMemo(() => {
    return items
      .filter(n => filter === 'all' || n.type === filter)
      .filter(n => n.message.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [items, filter, searchQuery])

  const stats = useMemo(() => ({
    all: items.length,
    project: items.filter(n => n.type === 'project').length,
    task: items.filter(n => n.type === 'task').length,
    crm: items.filter(n => n.type === 'crm').length,
    team: items.filter(n => n.type === 'team').length,
  }), [items])

  const FilterButton = ({ type, label, icon: Icon }: any) => (
    <button
      onClick={() => setFilter(type)}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all border",
        filter === type 
          ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105" 
          : "bg-white text-gray-500 border-gray-100 hover:border-gray-200 hover:bg-gray-50"
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
      <span className={cn(
        "px-1.5 py-0.5 rounded-lg text-[10px] ml-1",
        filter === type ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
      )}>
        {stats[type as keyof typeof stats]}
      </span>
    </button>
  )

  return (
    <div className="p-8 h-full space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-3">
            <Bell className="h-8 w-8 text-primary" />
            Activity Feed
          </h1>
          <p className="text-gray-500 font-medium">Keep track of everything happening in your workspace.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={handleMarkAllRead} className="h-11">
            <CheckCheck className="mr-2 h-4 w-4" />
            Mark All as Read
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <div className="space-y-4">
               <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Filter className="h-3.5 w-3.5" />
                Quick Filters
               </h3>
               <div className="grid grid-cols-1 gap-2">
                 <FilterButton type="all" label="All Activity" icon={Calendar} />
                 <FilterButton type="project" label="Projects" icon={Briefcase} />
                 <FilterButton type="task" label="Tasks" icon={CheckCircle2} />
                 <FilterButton type="crm" label="CRM" icon={Target} />
                 <FilterButton type="team" label="Team" icon={Users} />
               </div>
            </div>
            
            <div className="pt-6 border-t border-gray-50 space-y-4">
               <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Search Log</h3>
               <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    placeholder="Search messages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-10 w-full rounded-xl border border-gray-100 bg-gray-50/50 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary transition-all"
                  />
               </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
           <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-[500px]">
              {loading && items.length === 0 ? (
                <div className="h-96 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    <p className="text-sm font-medium text-gray-400">Syncing activity data...</p>
                  </div>
                </div>
              ) : filteredNotifications.length > 0 ? (
                <div className="divide-y divide-gray-50">
                   {filteredNotifications.map(notif => (
                     <NotificationItem 
                        key={notif.id} 
                        notification={notif} 
                        onClick={() => {
                          if (!notif.isRead) {
                            notificationService.markAsRead(notif.id)
                            dispatch(setNotifications(items.map(n => n.id === notif.id ? {...n, isRead: true} : n)))
                          }
                        }}
                      />
                   ))}
                </div>
              ) : (
                <div className="h-96 flex flex-col items-center justify-center text-center p-8">
                  <div className="p-4 bg-gray-50 rounded-full mb-4">
                    <Bell className="h-10 w-10 text-gray-300" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">No activity found</h3>
                  <p className="text-sm text-gray-500 max-w-xs mt-2 font-medium">
                    Try adjusting your filters or search query to find what you're looking for.
                  </p>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  )
}

export default ActivityFeedPage
