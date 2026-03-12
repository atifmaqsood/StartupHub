import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Task {
  id: string
  projectId: string
  title: string
  assignee: string
  status: string
  dueDate: string
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
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.items.push(action.payload)
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.items.findIndex(t => t.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = action.payload
      }
    },
  },
})

export const { setTasks, addTask, updateTask } = taskSlice.actions
export default taskSlice.reducer
