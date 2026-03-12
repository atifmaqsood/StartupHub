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
        className="flex items-center text-sm text-gray-500 hover:text-primary transition-colors text-wrap"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to projects
      </Link>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
            <Badge variant={project.status === 'Completed' ? 'success' : 'warning'}>
              {project.status}
            </Badge>
          </div>
          <p className="text-gray-500 max-w-2xl">{project.description}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">Edit Project</Button>
          <Button>Update Status</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Progress Section */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Project Completion</h3>
              <span className="text-sm font-bold text-primary">{project.progression}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3">
              <div 
                className="bg-primary h-3 rounded-full transition-all duration-1000" 
                style={{ width: `${project.progression}%` }}
              />
            </div>
          </div>

          {/* Tasks Section */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Project Tasks</h3>
              <Button size="sm" variant="outline">View All Tasks</Button>
            </div>
            <div className="divide-y divide-gray-50">
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <div key={task.id} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        task.status === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                      }`}>
                        <CheckSquare className="h-4 w-4" />
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${task.status === 'Completed' ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                          {task.title}
                        </p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {task.dueDate}
                          </span>
                          <span className="text-xs font-medium text-gray-500">{task.assignee}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-primary transition-colors" />
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500">No tasks assigned to this project.</div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-6">
            <h3 className="font-semibold text-gray-900">Project Information</h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Users className="h-4 w-4 text-gray-400" />
                <span className="text-gray-500">Owner:</span>
                <span className="font-medium text-gray-900 ml-auto">{project.owner}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-gray-500">Deadline:</span>
                <span className="font-medium text-gray-900 ml-auto">{project.deadline}</span>
              </div>
            </div>

            <hr className="border-gray-50" />

            <div className="space-y-4">
              <p className="text-sm font-semibold text-gray-900">Project Members</p>
              <div className="flex -space-x-2 overflow-hidden">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="inline-block h-8 w-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                    <img 
                      src={`https://i.pravatar.cc/150?u=${i + 1}`} 
                      alt="member"
                      className="h-full w-full object-cover" 
                    />
                  </div>
                ))}
                <div className="inline-block h-8 w-8 rounded-full border-2 border-white bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
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
