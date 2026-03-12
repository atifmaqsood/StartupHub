import React, { useState } from 'react'
import { User, Mail, Briefcase, FileText, Camera, Loader2, Check } from 'lucide-react'
import { useAppSelector, useAppDispatch } from '../../hooks/redux'
import { updateProfile } from '../../store/settingsSlice'
import { useForm } from 'react-hook-form'

const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch()
  const profile = useAppSelector(state => state.settings.profile)
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const { register, handleSubmit, reset } = useForm({
    defaultValues: profile
  })

  const onFormSubmit = async (data: any) => {
    setIsSaving(true)
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800))
    dispatch(updateProfile(data))
    setIsSaving(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="p-8 space-y-10 animate-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-center gap-8 pb-10 border-b border-[var(--color-border)]/5">
        <div className="relative group">
          <img 
            src={profile.avatar} 
            alt="Avatar" 
            className="h-24 w-24 rounded-2xl object-cover ring-4 ring-[var(--bg-main)] group-hover:ring-[var(--color-primary)]/20 transition-all cursor-pointer shadow-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
            <Camera className="h-6 w-6 text-white" />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-black text-[var(--text-primary)] tracking-tight">Identity & Profile</h2>
          <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] opacity-70">Control how you appear across the organization.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1">Full Name</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
            <input 
              type="text" 
              {...register('name')}
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-[var(--color-border)]/10 bg-[var(--bg-main)]/50 text-sm font-bold text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all placeholder:text-[var(--text-muted)]"
            />
          </div>
        </div>
        <div className="space-y-3">
          <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
            <input 
              type="email" 
              {...register('email')}
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-[var(--color-border)]/10 bg-[var(--bg-main)]/50 text-sm font-bold text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all placeholder:text-[var(--text-muted)]"
            />
          </div>
        </div>
        <div className="space-y-3">
          <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1">Job Title</label>
          <div className="relative">
            <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
            <input 
              type="text" 
              {...register('title')}
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-[var(--color-border)]/10 bg-[var(--bg-main)]/50 text-sm font-bold text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all placeholder:text-[var(--text-muted)]"
            />
          </div>
        </div>
        <div className="space-y-3 md:col-span-2">
          <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1">Short Bio</label>
          <div className="relative">
            <FileText className="absolute left-4 top-4 h-4 w-4 text-[var(--text-muted)]" />
            <textarea 
              rows={4}
              {...register('bio')}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-[var(--color-border)]/10 bg-[var(--bg-main)]/50 text-sm font-bold text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all resize-none placeholder:text-[var(--text-muted)]"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-10 border-t border-[var(--color-border)]/5">
        <button 
          type="button" 
          onClick={() => reset()}
          className="px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-main)] transition-all"
        >
          Discard
        </button>
        <button 
          type="submit" 
          disabled={isSaving}
          className="px-8 py-3 bg-[var(--color-primary)] text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-[var(--color-primary)]/20 hover:shadow-xl hover:translate-y-[-1px] transition-all active:scale-95 disabled:opacity-70 flex items-center gap-2"
        >
          {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : showSuccess ? <Check className="h-4 w-4" /> : null}
          {isSaving ? 'Synchronizing...' : showSuccess ? 'Synchronized' : 'Synchronize Changes'}
        </button>
      </div>
    </form>
  )
}

export default ProfilePage
