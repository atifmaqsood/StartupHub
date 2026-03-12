import React, { useMemo } from 'react'
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  AreaChart, 
  Area,
  BarChart,
  Bar
} from 'recharts'
import AnalyticsCard from './AnalyticsCard'

interface TaskAnalyticsProps {
  tasks: any[]
}

const COLORS = ['#94a3b8', '#f59e0b', '#3b82f6', '#10b981']
const PRIORITY_COLORS = {
  High: '#ef4444',
  Medium: '#f59e0b',
  Low: '#10b981'
}

const TaskAnalytics: React.FC<TaskAnalyticsProps> = ({ tasks: rawTasks }) => {
  const tasks = rawTasks.length > 0 ? rawTasks : [
    { status: 'Todo', priority: 'High', title: 'Task 1' },
    { status: 'In Progress', priority: 'Medium', title: 'Task 2' },
    { status: 'Completed', priority: 'Low', title: 'Task 3' },
  ]

  const statusData = useMemo(() => {
    return [
      { name: 'Todo', value: tasks.filter(t => t.status === 'Todo').length },
      { name: 'In Progress', value: tasks.filter(t => t.status === 'In Progress').length },
      { name: 'Review', value: tasks.filter(t => t.status === 'Review').length },
      { name: 'Completed', value: tasks.filter(t => t.status === 'Completed').length },
    ]
  }, [tasks])

  const priorityData = useMemo(() => {
    return [
      { name: 'High', value: tasks.filter(t => t.priority === 'High').length },
      { name: 'Medium', value: tasks.filter(t => t.priority === 'Medium').length },
      { name: 'Low', value: tasks.filter(t => t.priority === 'Low').length },
    ]
  }, [tasks])

  const completionTrend = [
    { day: 'Mon', completed: 2 },
    { day: 'Tue', completed: 5 },
    { day: 'Wed', completed: 3 },
    { day: 'Thu', completed: 8 },
    { day: 'Fri', completed: 12 },
    { day: 'Sat', completed: 4 },
    { day: 'Sun', completed: 6 },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <AnalyticsCard 
        title="Task Distribution" 
        subtitle="Tasks per workflow stage"
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              stroke="transparent"
              label={({ name, percent }) => `${name} ${(Number(percent || 0) * 100).toFixed(0)}%`}
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
          </PieChart>
        </ResponsiveContainer>
      </AnalyticsCard>

      <AnalyticsCard 
        title="Priority Breakdown" 
        subtitle="Volume of tasks by priority"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={priorityData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="var(--color-border)" opacity={0.1} />
            <XAxis type="number" hide />
            <YAxis 
              dataKey="name" 
              type="category" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: 'var(--text-muted)', fontWeight: 600 }} 
            />
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
            <Bar 
              dataKey="value" 
              radius={[0, 6, 6, 0]} 
              barSize={32}
            >
              {priorityData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={PRIORITY_COLORS[entry.name as keyof typeof PRIORITY_COLORS]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </AnalyticsCard>

      <AnalyticsCard 
        title="Completion Velocity" 
        subtitle="Tasks completed over the last 7 days"
        className="lg:col-span-2"
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={completionTrend}>
            <defs>
              <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" opacity={0.1} />
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text-muted)', fontWeight: 600 }} />
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
            <Area 
              type="monotone" 
              dataKey="completed" 
              stroke="var(--color-primary)" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorCompleted)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </AnalyticsCard>
    </div>
  )
}

export default TaskAnalytics
