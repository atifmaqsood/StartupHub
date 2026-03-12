import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { teamService } from '../../services/teamService.ts'
import { projectService } from '../../services/projectService.ts'
import { taskService } from '../../services/taskService.ts'
import Button from '../../components/ui/Button.tsx'
import Badge from '../../components/ui/Badge.tsx'
import MemberRoleBadge from '../../features/team/components/MemberRoleBadge.tsx'
import { 
  ArrowLeft, 
  Mail, 
  Calendar, 
  Shield, 
  Trash2, 
  Loader2,
  Briefcase,
  CheckCircle2,
  Clock,
  ExternalLink
} from 'lucide-react'
import { useDispatch } from 'react-redux'
import { removeMember } from '../../store/teamSlice.ts'

const MemberProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [member, setMember] = useState<any>(null)
  const [assignedProjects, setAssignedProjects] = useState<any[]>([])
  const [assignedTasks, setAssignedTasks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMemberData = async () => {
      if (!id) return
      setLoading(true)
      try {
        const [memberData, projectsData, tasksData]: [any, any, any] = await Promise.all([
          teamService.getMemberById(id),
          projectService.getProjects(),
          taskService.getTasks()
        ])
        
        setMember(memberData)
        // Simulate checking assignments
        setAssignedProjects(projectsData.slice(0, 2)) 
        setAssignedTasks(tasksData.filter((t: any) => t.assignee === memberData?.name))
      } catch (error) {
        console.error('Failed to fetch member details', error)
      } finally {
        setLoading(false)
      }
    }
    fetchMemberData()
  }, [id])

  const handleDelete = async () => {
    if (!id || !window.confirm(`Are you sure you want to remove ${member?.name} from the team?`)) return
    try {
      await teamService.deleteMember(id)
      dispatch(removeMember(id))
      navigate('/team')
    } catch (error) {
      console.error('Failed to delete member', error)
    }
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!member) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold">Member not found</h2>
        <Link to="/team" virtual-href="/team" className="text-primary hover:underline mt-4 inline-block">
          Back to Team
        </Link>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <Link 
        to="/team" 
        virtual-href="/team"
        className="flex items-center text-sm font-bold text-[var(--text-muted)] hover:text-[var(--color-primary)] transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to team
      </Link>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-8">
          <div className="h-24 w-24 rounded-3xl bg-[var(--bg-main)] overflow-hidden border-4 border-[var(--bg-card)] shadow-lg ring-1 ring-[var(--color-border)]/10">
            {member.avatar ? (
               <img src={member.avatar} alt={member.name} className="h-full w-full object-cover" />
            ) : (
               <div className="h-full w-full flex items-center justify-center text-2xl font-black text-[var(--text-muted)]">
                {member.name.charAt(0)}
               </div>
            )}
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-black text-[var(--text-primary)] tracking-tight">{member.name}</h1>
            <div className="flex items-center gap-3">
               <MemberRoleBadge role={member.role} />
               <Badge variant={member.status === 'Active' ? 'success' : 'neutral'} className="text-[10px] font-black uppercase tracking-widest bg-[var(--bg-main)]">
                {member.status}
               </Badge>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="text-red-500 hover:text-red-400 border-red-500/10 hover:border-red-500/20 bg-red-500/5 h-[46px] rounded-xl px-6" onClick={handleDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Remove Member
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-[var(--bg-card)] p-8 rounded-2xl border border-[var(--color-border)]/10 shadow-sm space-y-8 transition-colors duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 <div className="space-y-5">
                    <h3 className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.2em]">Contact Details</h3>
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-[var(--bg-main)] border border-[var(--color-border)]/10 group hover:border-[var(--color-primary)]/20 transition-all">
                      <Mail className="h-4 w-4 text-[var(--color-primary)]" />
                      <span className="text-sm font-black text-[var(--text-primary)]">{member.email}</span>
                    </div>
                 </div>
                 <div className="space-y-5">
                    <h3 className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.2em]">Account Lifecycle</h3>
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-[var(--bg-main)] border border-[var(--color-border)]/10 group hover:border-[var(--color-primary)]/20 transition-all">
                      <Calendar className="h-4 w-4 text-[var(--color-primary)]" />
                      <span className="text-sm font-black text-[var(--text-primary)]">Member since {member.joinedDate}</span>
                    </div>
                 </div>
              </div>
           </div>

           <div className="space-y-6">
              <h3 className="text-xs font-black text-[var(--text-primary)] uppercase tracking-widest flex items-center gap-3">
                <Briefcase className="h-4 w-4 text-[var(--text-muted)]" />
                Assigned Portfolio
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {assignedProjects.map(project => (
                    <div key={project.id} className="bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--color-border)]/10 shadow-sm hover:border-[var(--color-primary)]/30 transition-all group">
                       <div className="flex items-center justify-between mb-4">
                          <div className="p-2.5 bg-[var(--color-primary)]/10 rounded-xl text-[var(--color-primary)] shadow-sm">
                             <Briefcase className="h-4 w-4" />
                          </div>
                          <Link to={`/projects/${project.id}`} virtual-href={`/projects/${project.id}`}>
                            <ExternalLink className="h-4 w-4 text-[var(--text-muted)] hover:text-[var(--color-primary)] transition-colors" />
                          </Link>
                       </div>
                       <h4 className="text-base font-black text-[var(--text-primary)] mb-1.5">{project.name}</h4>
                       <p className="text-xs text-[var(--text-muted)] font-medium line-clamp-2 leading-relaxed">{project.description}</p>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        <div className="space-y-8">
           <div className="bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--color-border)]/10 shadow-sm space-y-8 transition-colors duration-300">
              <h3 className="text-xs font-black text-[var(--text-primary)] uppercase tracking-widest flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-[var(--text-muted)]" />
                Operational Tasks
              </h3>
              <div className="space-y-4">
                 {assignedTasks.length > 0 ? assignedTasks.map(task => (
                    <div key={task.id} className="p-4 rounded-xl border border-[var(--color-border)]/5 bg-[var(--bg-main)] space-y-2 group hover:border-[var(--color-primary)]/20 transition-all">
                       <p className="text-sm font-black text-[var(--text-primary)] line-clamp-1 group-hover:text-[var(--color-primary)] transition-colors">{task.title}</p>
                       <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-[10px] font-bold text-[var(--text-muted)] uppercase">
                             <Clock className="h-3 w-3" />
                             <span>{task.dueDate}</span>
                          </div>
                          <Badge variant={task.status === 'Completed' ? 'success' : 'warning'} className="text-[8px] h-4 font-black">
                             {task.status}
                          </Badge>
                       </div>
                    </div>
                 )) : (
                    <div className="py-12 text-center rounded-2xl border-2 border-dashed border-[var(--color-border)]/10">
                       <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">No Active Assignments</p>
                    </div>
                 )}
              </div>
           </div>

           <div className="bg-[var(--color-primary)]/5 p-6 rounded-2xl border border-[var(--color-primary)]/10 space-y-5">
              <div className="flex items-center gap-3 text-[var(--color-primary)]">
                <Shield className="h-5 w-5" />
                <h4 className="font-black text-xs uppercase tracking-widest">Access Protocol</h4>
              </div>
              <p className="text-xs text-[var(--color-primary)]/80 leading-relaxed font-bold">
                {member.role === 'Owner' || member.role === 'Admin' 
                  ? 'Full administrative access to settings, billing, and team management.'
                  : 'Access to workspace projects and tasks. Limited access to settings.'}
              </p>
           </div>
        </div>
      </div>
    </div>
  )
}

export default MemberProfilePage
