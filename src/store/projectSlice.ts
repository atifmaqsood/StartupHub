import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface Project {
  id: string
  name: string
  status: string
  priority: string
  dueDate: string
  progression: number
  members: string[]
}

interface ProjectState {
  items: Project[]
  loading: boolean
}

const initialState: ProjectState = {
  items: [],
  loading: false,
}

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.items = action.payload
      state.loading = false
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    addProject: (state, action: PayloadAction<Project>) => {
      state.items.push(action.payload)
    },
    updateProject: (state, action: PayloadAction<Project>) => {
      const index = state.items.findIndex(p => p.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = action.payload
      }
    },
  },
})

export const { setProjects, setLoading, addProject, updateProject } = projectSlice.actions
export default projectSlice.reducer
