import React, { useMemo } from 'react'
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  LineChart, 
  Line, 
  Legend 
} from 'recharts'
import AnalyticsCard from './AnalyticsCard'

interface ProjectAnalyticsProps {
  projects: any[]
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444']

const ProjectAnalytics: React.FC<ProjectAnalyticsProps> = ({ projects: rawProjects }) => {
  const projects = rawProjects.length > 0 ? rawProjects : [
    { name: 'Project A', progression: 50 },
    { name: 'Project B', progression: 100 },
    { name: 'Project C', progression: 25 },
  ]

  const statusData = useMemo(() => {
    const counts = projects.reduce((acc: any, p) => {
      const status = p.progression === 100 ? 'Completed' : p.progression === 0 ? 'Pending' : 'In Progress'
      acc[status] = (acc[status] || 0) + 1
      return acc
    }, {})
    
    const data = Object.entries(counts).map(([name, value]) => ({ name, value }))
    return data.length > 0 ? data : [{ name: 'No Data', value: 1 }]
  }, [projects])

  const progressData = useMemo(() => {
    return projects.map(p => ({
      name: p.name.length > 15 ? p.name.substring(0, 12) + '...' : p.name,
      progress: p.progression
    }))
  }, [projects])

  // Mock trend data since projects.json doesn't have creation dates for all
  const trendData = [
    { month: 'Jan', count: 2 },
    { month: 'Feb', count: 5 },
    { month: 'Mar', count: 3 },
    { month: 'Apr', count: 8 },
    { month: 'May', count: 6 },
    { month: 'Jun', count: projects.length },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <AnalyticsCard 
        title="Project Status" 
        subtitle="Distribution across lifecycle stages"
        className="lg:col-span-1"
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
              stroke="transparent"
            >
              {statusData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--bg-card)', 
                border: '1px solid var(--color-border)', 
                borderRadius: '12px',
                color: 'var(--text-primary)'
              }}
              itemStyle={{ color: 'var(--text-primary)' }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ paddingTop: '20px', color: 'var(--text-muted)', fontSize: '12px', fontWeight: 600 }} />
          </PieChart>
        </ResponsiveContainer>
      </AnalyticsCard>

      <AnalyticsCard 
        title="Progress Overview" 
        subtitle="Completion percentage per project"
        className="lg:col-span-1"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={progressData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" opacity={0.1} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--text-muted)', fontWeight: 600 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--text-muted)', fontWeight: 600 }} />
            <Tooltip 
              cursor={{ fill: 'var(--color-primary)', opacity: 0.05 }}
              contentStyle={{ 
                backgroundColor: 'var(--bg-card)', 
                border: '1px solid var(--color-border)', 
                borderRadius: '12px',
                color: 'var(--text-primary)'
              }}
              itemStyle={{ color: 'var(--text-primary)' }}
            />
            <Bar dataKey="progress" fill="var(--color-primary)" radius={[6, 6, 0, 0]} barSize={24} />
          </BarChart>
        </ResponsiveContainer>
      </AnalyticsCard>

      <AnalyticsCard 
        title="Creation Trend" 
        subtitle="Monthly project growth"
        className="lg:col-span-2"
      >
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" opacity={0.1} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text-muted)', fontWeight: 600 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text-muted)', fontWeight: 600 }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--bg-card)', 
                border: '1px solid var(--color-border)', 
                borderRadius: '12px',
                color: 'var(--text-primary)'
              }}
              itemStyle={{ color: 'var(--text-primary)' }}
            />
            <Line 
              type="monotone" 
              dataKey="count" 
              stroke="var(--color-primary)" 
              strokeWidth={4} 
              dot={{ r: 6, fill: 'var(--color-primary)', strokeWidth: 2, stroke: 'var(--bg-card)' }}
              activeDot={{ r: 8, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </AnalyticsCard>
    </div>
  )
}

export default ProjectAnalytics
