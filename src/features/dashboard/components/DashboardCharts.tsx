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

const COLORS = ['#aa3bff', '#6b6375', '#00C49F', '#FFBB28', '#FF8042']

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
      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h3 className="text-lg font-semibold mb-6">Project Progress (%)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={projectProgressData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
              <Tooltip cursor={{fill: '#f9fafb'}} />
              <Bar dataKey="progress" fill="#aa3bff" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h3 className="text-lg font-semibold mb-6">Lead Values Overview</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={leadValueData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#aa3bff" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#aa3bff" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="#aa3bff" fillOpacity={1} fill="url(#colorValue)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border shadow-sm lg:col-span-2">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Task Status Distribution</h3>
        </div>
        <div className="h-64 grid grid-cols-1 md:grid-cols-2 gap-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={taskStatusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {taskStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col justify-center space-y-4">
            {taskStatusData.map((item, index) => (
              <div key={item.name} className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                <span className="text-sm text-gray-600">{item.name}</span>
                <span className="text-sm font-semibold ml-auto">{item.value} tasks</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardCharts
