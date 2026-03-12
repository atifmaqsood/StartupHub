import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../hooks/redux.ts'
import { setProjects, setLoading as setProjectsLoading } from '../../store/projectSlice.ts'
import { setTasks, setLoading as setTasksLoading } from '../../store/taskSlice.ts'
import { setLeads, setLoading as setLeadsLoading } from '../../store/crmSlice.ts'
import { projectService } from '../../services/projectService.ts'
import { taskService } from '../../services/taskService.ts'
import { crmService } from '../../services/crmService.ts'
import StatCard from '../../components/cards/StatCard.tsx'
import DashboardCharts from '../../features/dashboard/components/DashboardCharts.tsx'
import { 
  Briefcase, 
  CheckSquare, 
  Users, 
  TrendingUp, 
  Target,
  Loader2
} from 'lucide-react'

const DashboardOverview: React.FC = () => {
  const dispatch = useAppDispatch()
  const { items: projects, loading: projectsLoading } = useAppSelector((state) => state.projects)
  const { items: tasks, loading: tasksLoading } = useAppSelector((state) => state.tasks)
  const { leads, loading: leadsLoading } = useAppSelector((state) => state.crm)

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setProjectsLoading(true))
      dispatch(setTasksLoading(true))
      dispatch(setLeadsLoading(true))

      try {
        const [projectsData, tasksData, leadsData] = await Promise.all([
          projectService.getProjects(),
          taskService.getTasks(),
          crmService.getLeads()
        ])

        dispatch(setProjects(projectsData as any))
        dispatch(setTasks(tasksData as any))
        dispatch(setLeads(leadsData as any))
      } catch (error) {
        console.error('Failed to fetch dashboard data', error)
      } finally {
        dispatch(setProjectsLoading(false))
        dispatch(setTasksLoading(false))
        dispatch(setLeadsLoading(false))
      }
    }

    fetchData()
  }, [dispatch])

  const isLoading = projectsLoading || tasksLoading || leadsLoading

  if (isLoading && projects.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // Calculate stats
  const totalProjects = projects.length
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(t => t.status === 'Completed').length
  const totalLeads = leads.length
  const activeMembers = 12 // Mock data for now

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)]">Dashboard</h1>
        <p className="text-[var(--text-secondary)] font-medium">Welcome back to StartupHub. Here's what's happening with your projects today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        <StatCard 
          title="Total Projects" 
          value={totalProjects} 
          icon={Briefcase} 
          trend="+20.1%" 
          trendType="up" 
        />
        <StatCard 
          title="Total Tasks" 
          value={totalTasks} 
          icon={CheckSquare} 
          trend="+15%" 
          trendType="up" 
        />
        <StatCard 
          title="Completed" 
          value={completedTasks} 
          icon={Target} 
          trend="+5.4%" 
          trendType="up" 
        />
        <StatCard 
          title="Total Leads" 
          value={totalLeads} 
          icon={TrendingUp} 
          trend="+12%" 
          trendType="up" 
        />
        <StatCard 
          title="Active Team" 
          value={activeMembers} 
          icon={Users} 
        />
      </div>

      <DashboardCharts 
        projects={projects} 
        tasks={tasks} 
        leads={leads} 
      />
    </div>
  )
}

export default DashboardOverview
