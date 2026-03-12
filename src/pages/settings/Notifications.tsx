import React from 'react'
import { useAppSelector, useAppDispatch } from '../../hooks/redux'
import { updateNotifications } from '../../store/settingsSlice'
import { cn } from '../../utils'

const NotificationPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { notifications } = useAppSelector(state => state.settings)

  const items = [
    { id: 'projectUpdates', label: 'Project Updates', description: 'Receive alerts when new projects are created or archived.' },
    { id: 'taskUpdates', label: 'Task Activities', description: 'Get notified when tasks are assigned, completed, or moved.' },
    { id: 'leadUpdates', label: 'CRM Leads', description: 'Real-time alerts for new leads or pipeline status changes.' },
    { id: 'teamInvitations', label: 'Team Requests', description: 'Notifications for new member invites and role changes.' },
    { id: 'mentions', label: 'Mentions', description: 'Instant alerts when someone tags you in a comment or task.' },
  ] as const

  return (
    <div className="p-8 space-y-10 animate-in slide-in-from-bottom-2 duration-500">
      <div className="space-y-2">
        <h2 className="text-xl font-black text-[var(--text-primary)] tracking-tight">Communication Preferences</h2>
        <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] opacity-70">Control exactly how and when you receive system alerts.</p>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div 
            key={item.id}
            className="flex items-center justify-between p-6 rounded-2xl border border-[var(--color-border)]/10 bg-[var(--bg-main)]/30 hover:bg-[var(--bg-main)]/50 transition-all group"
          >
            <div className="space-y-1.5">
              <h3 className="text-sm font-black text-[var(--text-primary)] tracking-tight">{item.label}</h3>
              <p className="text-[11px] text-[var(--text-muted)] font-bold italic opacity-80">{item.description}</p>
            </div>
            
            <button
              onClick={() => dispatch(updateNotifications({ [item.id]: !notifications[item.id] }))}
              className={cn(
                "relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none ring-offset-2 ring-offset-[var(--bg-card)] focus:ring-2 focus:ring-[var(--color-primary)]/40",
                notifications[item.id] ? "bg-[var(--color-primary)]" : "bg-[var(--color-border)]/20"
              )}
            >
              <span
                className={cn(
                  "inline-block h-5 w-5 transform rounded-full bg-white transition-all shadow-md shadow-black/10",
                  notifications[item.id] ? "translate-x-6" : "translate-x-1"
                )}
              />
            </button>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6 pt-10 border-t border-[var(--color-border)]/5">
        <p className="mr-auto text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] opacity-50 italic">
          System applies these settings to both global UI and SMTP channels.
        </p>
        <button className="px-8 py-3 bg-[var(--bg-main)] text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded-2xl font-black text-[10px] uppercase tracking-widest border border-[var(--color-border)]/10 transition-all active:scale-95">
          Restore Engine Defaults
        </button>
      </div>
    </div>
  )
}

export default NotificationPage
