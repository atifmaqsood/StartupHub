import React from 'react'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts'

interface DashboardChartsProps {
  projects: any[]
  tasks: any[]
  leads: any[]
}


const DashboardCharts: React.FC<DashboardChartsProps> = ({ projects, tasks, leads }) => {
  // Process data for charts
  const projectProgressData = projects.slice(0, 5).map(p => ({
    name: p.name.length > 10 ? p.name.substring(0, 10) + '...' : p.name,
    progress: p.progression
  }))

  const taskStatusData = [
    { name: 'Completed', value: tasks.filter(t => t.status === 'Completed').length },
    { name: 'In Progress', value: tasks.filter(t => t.status === 'In Progress').length },
    { name: 'Todo', value: tasks.filter(t => t.status === 'Todo').length },
  ]

  const leadValueData = leads.slice(0, 6).map(l => ({
    name: l.company,
    value: l.value
  }))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-[var(--bg-card)] p-6 rounded-xl border border-[var(--color-border)]/10 shadow-sm transition-colors duration-300">
        <h3 className="text-lg font-bold mb-6 text-[var(--text-primary)]">Project Progress (%)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={projectProgressData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" opacity={0.1} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: 'var(--text-secondary)', fontWeight: 600}} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: 'var(--text-secondary)', fontWeight: 600}} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--color-border)', borderRadius: '12px', color: 'var(--text-primary)' }}
                itemStyle={{ color: 'var(--text-primary)' }}
                cursor={{fill: 'var(--color-primary)', opacity: 0.05}} 
              />
              <Bar dataKey="progress" fill="var(--color-primary)" radius={[6, 6, 0, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-[var(--bg-card)] p-6 rounded-xl border border-[var(--color-border)]/10 shadow-sm transition-colors duration-300">
        <h3 className="text-lg font-bold mb-6 text-[var(--text-primary)]">Lead Values Overview</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={leadValueData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" opacity={0.1} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: 'var(--text-secondary)', fontWeight: 600}} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: 'var(--text-secondary)', fontWeight: 600}} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--color-border)', borderRadius: '12px', color: 'var(--text-primary)' }}
                itemStyle={{ color: 'var(--text-primary)' }}
              />
              <Area type="monotone" dataKey="value" stroke="var(--color-primary)" fillOpacity={1} fill="url(#colorValue)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-[var(--bg-card)] p-6 rounded-xl border border-[var(--color-border)]/10 shadow-sm lg:col-span-2 transition-colors duration-300">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-[var(--text-primary)]">Task Status Distribution</h3>
        </div>
        <div className="h-64 grid grid-cols-1 md:grid-cols-2 gap-8">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={taskStatusData}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={85}
                paddingAngle={8}
                dataKey="value"
                stroke="none"
              >
                {taskStatusData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? 'var(--color-primary)' : index === 1 ? 'var(--color-accent)' : 'var(--color-secondary)'} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--color-border)', borderRadius: '12px', color: 'var(--text-primary)' }}
                itemStyle={{ color: 'var(--text-primary)' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col justify-center space-y-5">
            {taskStatusData.map((item, index) => (
              <div key={item.name} className="flex items-center gap-4 group">
                <div className="w-4 h-4 rounded-full shadow-sm shadow-black/10" style={{ backgroundColor: index === 0 ? 'var(--color-primary)' : index === 1 ? 'var(--color-accent)' : 'var(--color-secondary)' }} />
                <span className="text-sm text-[var(--text-secondary)] font-bold group-hover:text-[var(--text-primary)] transition-colors">{item.name}</span>
                <span className="text-sm font-black ml-auto text-[var(--text-primary)]">{item.value} <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">tasks</span></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardCharts
