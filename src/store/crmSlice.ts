import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Lead {
  id: string
  name: string
  company: string
  email: string
  status: string
  value: number
}

interface CRMState {
  leads: Lead[]
  loading: boolean
}

const initialState: CRMState = {
  leads: [],
  loading: false,
}

const crmSlice = createSlice({
  name: 'crm',
  initialState,
  reducers: {
    setLeads: (state, action: PayloadAction<Lead[]>) => {
      state.leads = action.payload
    },
    addLead: (state, action: PayloadAction<Lead>) => {
      state.leads.push(action.payload)
    },
    updateLead: (state, action: PayloadAction<Lead>) => {
      const index = state.leads.findIndex(l => l.id === action.payload.id)
      if (index !== -1) {
        state.leads[index] = action.payload
      }
    },
  },
})

export const { setLeads, addLead, updateLead } = crmSlice.actions
export default crmSlice.reducer
