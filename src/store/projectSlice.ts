import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { projectService } from '../services/projectService'

export interface Project {
  id: string
  name: string
  status: string
  priority: string
  dueDate: string
  progression: number
  members: string[]
  description?: string
  owner?: string
}

interface ProjectState {
  items: Project[]
  loading: boolean
  error: string | null
}

const initialState: ProjectState = {
  items: [],
  loading: false,
  error: null,
}

export const fetchProjects = createAsyncThunk('projects/fetchAll', async () => {
  return await projectService.getProjects();
});

export const createProject = createAsyncThunk('projects/create', async (data: Partial<Project>) => {
  return await projectService.createProject(data);
});

export const updateProjectAsync = createAsyncThunk('projects/update', async ({ id, data }: { id: string, data: Partial<Project> }) => {
  return await projectService.updateProject(id, data);
});

export const deleteProjectAsync = createAsyncThunk('projects/delete', async (id: string) => {
  await projectService.deleteProject(id);
  return id;
});

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    // Optimistic UI Reducers
    optimisticAddProject: (state, action: PayloadAction<Project>) => {
      state.items.push(action.payload);
    },
    optimisticUpdateProject: (state, action: PayloadAction<{ id: string, updates: Partial<Project> }>) => {
      const index = state.items.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload.updates };
      }
    },
    optimisticDeleteProject: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(p => p.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.items = action.payload as Project[];
        state.loading = false;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        const index = state.items.findIndex(p => p.id === action.payload.id);
        if (index === -1) {
          state.items.push(action.payload as Project);
        } else {
          state.items[index] = action.payload as Project;
        }
      })
      .addCase(updateProjectAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload as Project;
        }
      })
      .addCase(deleteProjectAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(p => p.id !== action.payload);
      });
  },
})

export const { optimisticAddProject, optimisticUpdateProject, optimisticDeleteProject } = projectSlice.actions
export default projectSlice.reducer
