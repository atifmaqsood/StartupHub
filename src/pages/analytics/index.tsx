import React, { useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../hooks/redux'
import { fetchProjects } from '../../store/projectSlice'
import { fetchTasks } from '../../store/taskSlice'
import { fetchLeads } from '../../store/crmSlice'
import { fetchMembers } from '../../store/teamSlice'
import { selectDashboardStats } from '../../store/selectors'
import MetricWidget from '../../features/analytics/components/MetricWidget'
import ProjectAnalytics from '../../features/analytics/components/ProjectAnalytics'
import TaskAnalytics from '../../features/analytics/components/TaskAnalytics'
import CRMAnalytics from '../../features/analytics/components/CRMAnalytics'
import TeamAnalytics from '../../features/analytics/components/TeamAnalytics'
import AnalyticsFilters from '../../features/analytics/components/AnalyticsFilters'
import { 
  Briefcase, 
  CheckCircle2, 
  Target, 
  Users,
  TrendingUp,
  PieChart as PieChartIcon
} from 'lucide-react'
import { cn } from '../../utils'

const AnalyticsPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { items: projects } = useAppSelector(state => state.projects)
  const { items: tasks } = useAppSelector(state => state.tasks)
  const { leads } = useAppSelector(state => state.crm)
  const { members } = useAppSelector(state => state.team)
  const stats = useAppSelector(selectDashboardStats)

  const [activeTab, setActiveTab] = useState<'projects' | 'tasks' | 'crm' | 'team'>('projects')

  useEffect(() => {
    dispatch(fetchProjects())
    dispatch(fetchTasks())
    dispatch(fetchLeads())
    dispatch(fetchMembers())
  }, [dispatch])

  // stats are now from useAppSelector(selectDashboardStats)

  const TabButton = ({ id, label, icon: Icon }: any) => (
    <button
      onClick={() => setActiveTab(id)}
      className={cn(
        "flex items-center gap-2 px-6 py-4 border-b-2 font-bold transition-all",
        activeTab === id 
          ? "border-[var(--color-primary)] text-[var(--color-primary)]" 
          : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--color-border)]/20"
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  )

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] flex items-center gap-3">
            <PieChartIcon className="h-8 w-8 text-[var(--color-primary)]" />
            Analytics & Insights
          </h1>
          <p className="text-[var(--text-secondary)] font-medium">Visual intelligence for your business performance.</p>
        </div>
        <AnalyticsFilters onRefresh={() => window.location.reload()} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricWidget 
          title="Total Projects" 
          value={stats.totalProjects} 
          change={12} 
          trend="up" 
          icon={Briefcase} 
          color="bg-blue-500/10 text-blue-500" 
        />
        <MetricWidget 
          title="Tasks Completed" 
          value={stats.completedTasks} 
          change={8} 
          trend="up" 
          icon={CheckCircle2} 
          color="bg-green-500/10 text-green-500" 
        />
        <MetricWidget 
          title="Pipeline Value" 
          value={`$${(stats.totalLeadValue / 1000).toFixed(1)}k`} 
          change={5} 
          trend="up" 
          icon={Target} 
          color="bg-purple-500/10 text-purple-500" 
        />
        <MetricWidget 
          title="Active Members" 
          value={stats.activeMembers} 
          trend="neutral" 
          icon={Users} 
          color="bg-orange-500/10 text-orange-500" 
        />
      </div>

      <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--color-border)]/10 shadow-sm overflow-hidden min-h-[600px] flex flex-col transition-colors duration-300">
        <div className="flex border-b border-[var(--color-border)]/10 bg-[var(--bg-main)]/50 px-4">
          <TabButton id="projects" label="Projects" icon={Briefcase} />
          <TabButton id="tasks" label="Tasks" icon={CheckCircle2} />
          <TabButton id="crm" label="CRM" icon={Target} />
          <TabButton id="team" label="Team Performance" icon={TrendingUp} />
        </div>

        <div className="p-8 flex-1">
          {activeTab === 'projects' && <ProjectAnalytics projects={projects} />}
          {activeTab === 'tasks' && <TaskAnalytics tasks={tasks} />}
          {activeTab === 'crm' && <CRMAnalytics leads={leads} />}
          {activeTab === 'team' && <TeamAnalytics members={members} tasks={tasks} />}
        </div>
      </div>
    </div>
  )
}

export default AnalyticsPage
