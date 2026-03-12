import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface TeamMember {
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
}

const initialState: TeamState = {
  members: [],
  loading: false,
}

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    setMembers: (state, action: PayloadAction<TeamMember[]>) => {
      state.members = action.payload
      state.loading = false
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    addMember: (state, action: PayloadAction<TeamMember>) => {
      state.members.unshift(action.payload)
    },
    updateMember: (state, action: PayloadAction<TeamMember>) => {
      const index = state.members.findIndex(m => m.id === action.payload.id)
      if (index !== -1) {
        state.members[index] = action.payload
      }
    },
    removeMember: (state, action: PayloadAction<string>) => {
      state.members = state.members.filter(m => m.id !== action.payload)
    },
  },
})

export const { setMembers, setLoading, addMember, updateMember, removeMember } = teamSlice.actions
export default teamSlice.reducer
