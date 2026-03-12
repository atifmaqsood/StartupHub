import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { projectService } from '../../services/projectService.ts'
import { taskService } from '../../services/taskService.ts'
import Button from '../../components/ui/Button.tsx'
import Badge from '../../components/ui/Badge.tsx'
import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  CheckSquare, 
  Clock,
  ChevronRight,
  Loader2
} from 'lucide-react'

const ProjectDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [project, setProject] = useState<any>(null)
  const [tasks, setTasks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjectData = async () => {
      if (!id) return
      setLoading(true)
      try {
        const [projData, taskData] = await Promise.all([
          projectService.getProjectById(id),
          taskService.getTasksByProject(id)
        ])
        setProject(projData)
        setTasks(taskData as any[])
      } catch (error) {
        console.error('Failed to fetch project details', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProjectData()
  }, [id])

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold">Project not found</h2>
        <Link to="/projects" virtual-href="/projects" className="text-primary hover:underline mt-4 inline-block">
          Back to Projects
        </Link>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <Link 
        to="/projects" 
        virtual-href="/projects"
        className="flex items-center text-sm font-bold text-[var(--text-muted)] hover:text-[var(--color-primary)] transition-colors text-wrap"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to projects
      </Link>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-[var(--text-primary)]">{project.name}</h1>
            <Badge variant={project.status === 'Completed' ? 'success' : 'warning'}>
              {project.status}
            </Badge>
          </div>
          <p className="text-[var(--text-secondary)] font-medium max-w-2xl">{project.description}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="ring-1 ring-[var(--color-border)]/10">Edit Project</Button>
          <Button className="shadow-lg shadow-[var(--color-primary)]/20">Update Status</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Progress Section */}
          <div className="bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--color-border)]/10 shadow-sm space-y-6 transition-colors duration-300">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-[var(--text-primary)]">Project Completion</h3>
              <span className="text-sm font-black text-[var(--color-primary)]">{project.progression}%</span>
            </div>
            <div className="w-full bg-[var(--bg-main)] rounded-full h-3 overflow-hidden">
              <div 
                className="bg-[var(--color-primary)] h-3 rounded-full transition-all duration-1000 shadow-sm shadow-[var(--color-primary)]/20" 
                style={{ width: `${project.progression}%` }}
              />
            </div>
          </div>

          {/* Tasks Section */}
          <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--color-border)]/10 shadow-sm overflow-hidden transition-colors duration-300">
            <div className="p-6 border-b border-[var(--color-border)]/10 flex items-center justify-between bg-[var(--bg-main)]/50">
              <h3 className="font-bold text-[var(--text-primary)]">Project Tasks</h3>
              <Button size="sm" variant="outline" className="h-9 px-4">View All Tasks</Button>
            </div>
            <div className="divide-y divide-[var(--color-border)]/5">
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <div key={task.id} className="p-5 hover:bg-[var(--bg-main)]/50 transition-colors flex items-center justify-between group">
                    <div className="flex items-center gap-5">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        task.status === 'Completed' ? 'bg-green-500/10 text-green-500' : 'bg-[var(--bg-main)] text-[var(--text-muted)]'
                      }`}>
                        <CheckSquare className="h-5 w-5" />
                      </div>
                      <div>
                        <p className={`text-sm font-bold ${task.status === 'Completed' ? 'text-[var(--text-muted)] line-through' : 'text-[var(--text-primary)]'}`}>
                          {task.title}
                        </p>
                        <div className="flex items-center gap-4 mt-1.5">
                          <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1.5">
                            <Clock className="h-3 w-3" />
                            {task.dueDate}
                          </span>
                          <span className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">{task.assignee}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-[var(--text-muted)] group-hover:text-[var(--color-primary)] transition-colors" />
                  </div>
                ))
              ) : (
                <div className="p-12 text-center text-[var(--text-muted)] font-bold">No tasks assigned to this project.</div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8">
          <div className="bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--color-border)]/10 shadow-sm space-y-8 transition-colors duration-300">
            <h3 className="font-bold text-[var(--text-primary)]">Project Information</h3>
            
            <div className="space-y-5">
              <div className="flex items-center gap-4 text-sm">
                <Users className="h-4 w-4 text-[var(--text-muted)]" />
                <span className="text-[var(--text-secondary)] font-bold">Owner:</span>
                <span className="font-black text-[var(--text-primary)] ml-auto">{project.owner}</span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <Calendar className="h-4 w-4 text-[var(--text-muted)]" />
                <span className="text-[var(--text-secondary)] font-bold">Deadline:</span>
                <span className="font-black text-[var(--text-primary)] ml-auto">{project.deadline}</span>
              </div>
            </div>

            <hr className="border-[var(--color-border)]/10" />

            <div className="space-y-5">
              <p className="text-xs font-black text-[var(--text-primary)] uppercase tracking-widest">Project Members</p>
              <div className="flex -space-x-2.5 overflow-hidden">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="inline-block h-9 w-9 rounded-full border-2 border-[var(--bg-card)] bg-[var(--bg-main)] overflow-hidden shadow-sm">
                    <img 
                      src={`https://i.pravatar.cc/150?u=${i + 1}`} 
                      alt="member"
                      className="h-full w-full object-cover" 
                    />
                  </div>
                ))}
                <div className="inline-block h-9 w-9 rounded-full border-2 border-[var(--bg-card)] bg-[var(--color-primary)]/10 flex items-center justify-center text-[10px] font-black text-[var(--color-primary)] shadow-sm">
                  +2
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetailsPage
