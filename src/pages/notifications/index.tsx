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
        "flex items-center gap-3 px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border",
        filter === type 
          ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-lg shadow-[var(--color-primary)]/20 scale-105" 
          : "bg-[var(--bg-main)] text-[var(--text-muted)] border-[var(--color-border)]/10 hover:border-[var(--color-primary)]/30 hover:text-[var(--text-primary)]"
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
      <span className={cn(
        "px-2 py-0.5 rounded-lg text-[9px] ml-auto font-black",
        filter === type ? "bg-white/20 text-white" : "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
      )}>
        {stats[type as keyof typeof stats]}
      </span>
    </button>
  )

  return (
    <div className="p-8 h-full space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-black tracking-tight text-[var(--text-primary)] flex items-center gap-4">
            <div className="p-3 bg-[var(--color-primary)]/10 rounded-2xl shadow-sm">
              <Bell className="h-8 w-8 text-[var(--color-primary)]" />
            </div>
            Activity Feed
          </h1>
          <p className="text-[var(--text-muted)] font-black uppercase tracking-widest text-[10px] pl-16">Keep track of everything happening in your workspace.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={handleMarkAllRead} className="h-12 px-6 ring-1 ring-[var(--color-border)]/10 font-black uppercase tracking-widest text-[10px]">
            <CheckCheck className="mr-2 h-4 w-4" />
            Mark All as Read
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-1 space-y-10">
          <div className="bg-[var(--bg-card)] p-8 rounded-3xl border border-[var(--color-border)]/10 shadow-sm space-y-10 transition-colors duration-300">
            <div className="space-y-6">
               <h3 className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.2em] flex items-center gap-2.5">
                <Filter className="h-3.5 w-3.5" />
                Intelligence Filters
               </h3>
               <div className="grid grid-cols-1 gap-3">
                 <FilterButton type="all" label="Full Stream" icon={Calendar} />
                 <FilterButton type="project" label="Project Ops" icon={Briefcase} />
                 <FilterButton type="task" label="Workflow" icon={CheckCircle2} />
                 <FilterButton type="crm" label="Pipeline" icon={Target} />
                 <FilterButton type="team" label="Human Ops" icon={Users} />
               </div>
            </div>
            
            <div className="pt-10 border-t border-[var(--color-border)]/5 space-y-6">
               <h3 className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.2em]">Global Index Search</h3>
               <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
                  <input
                    placeholder="Keywords..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 w-full rounded-2xl border border-[var(--color-border)]/10 bg-[var(--bg-main)]/50 px-4 py-2 text-sm font-bold text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/20 focus-visible:border-[var(--color-primary)] transition-all placeholder:text-[var(--text-muted)]"
                  />
               </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
           <div className="bg-[var(--bg-card)] rounded-3xl border border-[var(--color-border)]/10 shadow-sm overflow-hidden min-h-[600px] transition-colors duration-300">
              {loading && items.length === 0 ? (
                <div className="h-[600px] flex items-center justify-center">
                  <div className="flex flex-col items-center gap-6">
                    <Loader2 className="h-12 w-12 animate-spin text-[var(--color-primary)]" />
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)] animate-pulse">Syncing neural feed...</p>
                  </div>
                </div>
              ) : filteredNotifications.length > 0 ? (
                <div className="divide-y divide-[var(--color-border)]/5">
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
                <div className="h-[600px] flex flex-col items-center justify-center text-center p-12">
                  <div className="p-6 bg-[var(--bg-main)] rounded-3xl border border-[var(--color-border)]/10 mb-6 shadow-inner">
                    <Bell className="h-12 w-12 text-[var(--text-muted)] opacity-20" />
                  </div>
                  <h3 className="text-xl font-black text-[var(--text-primary)] uppercase tracking-widest">Feed Empty</h3>
                  <p className="text-xs text-[var(--text-muted)] max-w-sm mt-4 font-bold leading-relaxed">
                    The intelligence stream currently has no data matching these parameters. Try refining your global search.
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
