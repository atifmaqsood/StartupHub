import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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

export const { setProjects, addProject, updateProject } = projectSlice.actions
export default projectSlice.reducer
