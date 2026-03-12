import React from 'react'
import { Building2, Globe, FileText, Calendar, Users, FolderKanban } from 'lucide-react'
import { useAppSelector } from '../../hooks/redux'

const OrganizationPage: React.FC = () => {
  const { organization } = useAppSelector(state => state.settings)
  const { members } = useAppSelector(state => state.team)
  const { items: projects } = useAppSelector(state => state.projects)

  return (
    <div className="p-8 space-y-10 animate-in slide-in-from-bottom-2 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-[var(--bg-main)]/50 p-8 rounded-3xl border border-[var(--color-border)]/10 flex flex-col items-center justify-center text-center gap-3 shadow-inner">
           <Users className="h-8 w-8 text-blue-500 opacity-80" />
           <p className="text-3xl font-black text-[var(--text-primary)] tracking-tighter">{members.length}</p>
           <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest leading-none">Global Team</p>
        </div>
        <div className="bg-[var(--bg-main)]/50 p-8 rounded-3xl border border-[var(--color-border)]/10 flex flex-col items-center justify-center text-center gap-3 shadow-inner">
           <FolderKanban className="h-8 w-8 text-purple-500 opacity-80" />
           <p className="text-3xl font-black text-[var(--text-primary)] tracking-tighter">{projects.length}</p>
           <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest leading-none">Active Projects</p>
        </div>
        <div className="bg-[var(--bg-main)]/50 p-8 rounded-3xl border border-[var(--color-border)]/10 flex flex-col items-center justify-center text-center gap-3 shadow-inner">
           <Calendar className="h-8 w-8 text-green-500 opacity-80" />
           <p className="text-3xl font-black text-[var(--text-primary)] tracking-tighter">May 2024</p>
           <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest leading-none">Genesis Date</p>
        </div>
      </div>

      <div className="h-px bg-[var(--color-border)]/5" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1">Organization Name</label>
          <div className="relative">
            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
            <input 
              type="text" 
              defaultValue={organization.name}
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-[var(--color-border)]/10 bg-[var(--bg-main)]/50 text-sm font-bold text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all placeholder:text-[var(--text-muted)]"
            />
          </div>
        </div>
        <div className="space-y-3">
          <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1">Website URL</label>
          <div className="relative">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
            <input 
              type="url" 
              defaultValue={organization.website}
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-[var(--color-border)]/10 bg-[var(--bg-main)]/50 text-sm font-bold text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all placeholder:text-[var(--text-muted)]"
            />
          </div>
        </div>
        <div className="space-y-3 md:col-span-2">
          <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1">Company Description</label>
          <div className="relative">
            <FileText className="absolute left-4 top-4 h-4 w-4 text-[var(--text-muted)]" />
            <textarea 
              rows={4}
              defaultValue={organization.description}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-[var(--color-border)]/10 bg-[var(--bg-main)]/50 text-sm font-bold text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all resize-none placeholder:text-[var(--text-muted)]"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-10 border-t border-[var(--color-border)]/5">
        <button className="px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-main)] transition-all">Discard</button>
        <button className="px-8 py-3 bg-[var(--color-primary)] text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-[var(--color-primary)]/20 hover:shadow-xl hover:translate-y-[-1px] transition-all active:scale-95 h-12">Commit Core Details</button>
      </div>
    </div>
  )
}

export default OrganizationPage
