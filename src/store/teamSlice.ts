import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { teamService } from '../services/teamService'

export interface TeamMember {
  id: string
  name: string
  email: string
  role: string
  status: 'Active' | 'Pending'
  joinedDate: string
  avatar?: string
}

interface TeamState {
  members: TeamMember[]
  loading: boolean
  error: string | null
}

const initialState: TeamState = {
  members: [],
  loading: false,
  error: null,
}

export const fetchMembers = createAsyncThunk('team/fetchAll', async () => {
  return await teamService.getMembers();
});

export const inviteMember = createAsyncThunk('team/invite', async (data: Partial<TeamMember>) => {
  return await teamService.inviteMember(data);
});

export const updateMemberAsync = createAsyncThunk('team/update', async ({ id, data }: { id: string, data: Partial<TeamMember> }) => {
  return await teamService.updateMember(id, data);
});

export const deleteMemberAsync = createAsyncThunk('team/delete', async (id: string) => {
  await teamService.deleteMember(id);
  return id;
});

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    optimisticAddMember: (state, action: PayloadAction<TeamMember>) => {
      state.members.unshift(action.payload)
    },
    optimisticUpdateMember: (state, action: PayloadAction<{ id: string; updates: Partial<TeamMember> }>) => {
      const index = state.members.findIndex(m => m.id === action.payload.id)
      if (index !== -1) {
        state.members[index] = { ...state.members[index], ...action.payload.updates }
      }
    },
    optimisticRemoveMember: (state, action: PayloadAction<string>) => {
      state.members = state.members.filter(m => m.id !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMembers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.members = action.payload as TeamMember[];
        state.loading = false;
      })
      .addCase(inviteMember.fulfilled, (state, action) => {
        const index = state.members.findIndex(m => m.id === action.payload.id);
        if (index === -1) {
          state.members.unshift(action.payload as TeamMember);
        } else {
          state.members[index] = action.payload as TeamMember;
        }
      })
      .addCase(updateMemberAsync.fulfilled, (state, action) => {
        const index = state.members.findIndex(m => m.id === action.payload.id);
        if (index !== -1) {
          state.members[index] = action.payload as TeamMember;
        }
      })
      .addCase(deleteMemberAsync.fulfilled, (state, action) => {
        state.members = state.members.filter(m => m.id !== action.payload);
      });
  },
})

export const { optimisticAddMember, optimisticUpdateMember, optimisticRemoveMember } = teamSlice.actions
export default teamSlice.reducer
