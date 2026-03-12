import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { taskService } from '../services/taskService'

export interface Task {
  id: string
  projectId: string
  title: string
  assignee: string
  status: 'Todo' | 'In Progress' | 'Review' | 'Completed'
  priority: 'Low' | 'Medium' | 'High'
  dueDate: string
  projectName?: string
  description?: string
}

interface TaskState {
  items: Task[]
  loading: boolean
  error: string | null
}

const initialState: TaskState = {
  items: [],
  loading: false,
  error: null,
}

export const fetchTasks = createAsyncThunk('tasks/fetchAll', async () => {
  return await taskService.getTasks();
});

export const createTask = createAsyncThunk('tasks/create', async (data: Partial<Task>) => {
  return await taskService.createTask(data);
});

export const updateTaskAsync = createAsyncThunk('tasks/update', async ({ id, data }: { id: string, data: Partial<Task> }) => {
  return await taskService.updateTask(id, data);
});

export const deleteTaskAsync = createAsyncThunk('tasks/delete', async (id: string) => {
  await taskService.deleteTask(id);
  return id;
});

export const reorderTasksAsync = createAsyncThunk('tasks/reorder', async (newTasks: Task[]) => {
  return await taskService.reorderTasks(newTasks);
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    optimisticAddTask: (state, action: PayloadAction<Task>) => {
      state.items.unshift(action.payload)
    },
    optimisticUpdateTask: (state, action: PayloadAction<{ id: string; updates: Partial<Task> }>) => {
      const index = state.items.findIndex(t => t.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload.updates }
      }
    },
    optimisticDeleteTask: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(t => t.id !== action.payload)
    },
    optimisticMoveTask: (state, action: PayloadAction<{ id: string; status: Task['status'] }>) => {
      const task = state.items.find(t => t.id === action.payload.id)
      if (task) {
        task.status = action.payload.status
      }
    },
    optimisticReorderTasks: (state, action: PayloadAction<Task[]>) => {
      state.items = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.items = action.payload as Task[];
        state.loading = false;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        const index = state.items.findIndex(t => t.id === action.payload.id);
        if (index === -1) {
          state.items.unshift(action.payload as Task);
        } else {
          state.items[index] = action.payload as Task;
        }
      })
      .addCase(updateTaskAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex(t => t.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload as Task;
        }
      })
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(t => t.id !== action.payload);
      })
      .addCase(reorderTasksAsync.fulfilled, (state, action) => {
        state.items = action.payload as Task[];
      });
  },
})

export const { optimisticAddTask, optimisticUpdateTask, optimisticDeleteTask, optimisticMoveTask, optimisticReorderTasks } = taskSlice.actions
export default taskSlice.reducer
