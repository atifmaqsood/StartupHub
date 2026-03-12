import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface Task {
  id: string
  projectId: string
  title: string
  assignee: string
  status: 'Todo' | 'In Progress' | 'Review' | 'Completed'
  priority: 'Low' | 'Medium' | 'High'
  dueDate: string
  projectName?: string
}

interface TaskState {
  items: Task[]
  loading: boolean
}

const initialState: TaskState = {
  items: [],
  loading: false,
}

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.items = action.payload
      state.loading = false
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.items.unshift(action.payload)
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.items.findIndex(t => t.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = action.payload
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(t => t.id !== action.payload)
    },
    moveTask: (state, action: PayloadAction<{ id: string; status: Task['status'] }>) => {
      const task = state.items.find(t => t.id === action.payload.id)
      if (task) {
        task.status = action.payload.status
      }
    },
    reorderTasks: (state, action: PayloadAction<Task[]>) => {
      state.items = action.payload
    },
  },
})

export const { setTasks, setLoading, addTask, updateTask, deleteTask, moveTask, reorderTasks } = taskSlice.actions
export default taskSlice.reducer
