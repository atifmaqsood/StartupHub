import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { crmService } from '../services/crmService'

export interface Lead {
  id: string
  name: string
  company: string
  email: string
  phone?: string
  status: 'New Lead' | 'Contacted' | 'Negotiation' | 'Won' | 'Lost'
  value: number
  source?: string
  assignedTo?: string
}

interface CRMState {
  leads: Lead[]
  loading: boolean
  error: string | null
}

const initialState: CRMState = {
  leads: [],
  loading: false,
  error: null,
}

export const fetchLeads = createAsyncThunk('crm/fetchAll', async () => {
  return await crmService.getLeads();
});

export const createLead = createAsyncThunk('crm/create', async (data: Partial<Lead>) => {
  return await crmService.createLead(data);
});

export const updateLeadAsync = createAsyncThunk('crm/update', async ({ id, data }: { id: string, data: Partial<Lead> }) => {
  return await crmService.updateLead(id, data);
});

export const deleteLeadAsync = createAsyncThunk('crm/delete', async (id: string) => {
  await crmService.deleteLead(id);
  return id;
});

export const reorderLeadsAsync = createAsyncThunk('crm/reorder', async (newLeads: Lead[]) => {
  return await crmService.reorderLeads(newLeads);
});

const crmSlice = createSlice({
  name: 'crm',
  initialState,
  reducers: {
    optimisticAddLead: (state, action: PayloadAction<Lead>) => {
      state.leads.unshift(action.payload)
    },
    optimisticUpdateLead: (state, action: PayloadAction<{ id: string; updates: Partial<Lead> }>) => {
      const index = state.leads.findIndex(l => l.id === action.payload.id)
      if (index !== -1) {
        state.leads[index] = { ...state.leads[index], ...action.payload.updates }
      }
    },
    optimisticDeleteLead: (state, action: PayloadAction<string>) => {
      state.leads = state.leads.filter(l => l.id !== action.payload)
    },
    optimisticReorderLeads: (state, action: PayloadAction<Lead[]>) => {
      state.leads = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeads.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.leads = action.payload as Lead[];
        state.loading = false;
      })
      .addCase(createLead.fulfilled, (state, action) => {
        const index = state.leads.findIndex(l => l.id === action.payload.id);
        if (index === -1) {
          state.leads.unshift(action.payload as Lead);
        } else {
          state.leads[index] = action.payload as Lead;
        }
      })
      .addCase(updateLeadAsync.fulfilled, (state, action) => {
        const index = state.leads.findIndex(l => l.id === action.payload.id);
        if (index !== -1) {
          state.leads[index] = action.payload as Lead;
        }
      })
      .addCase(deleteLeadAsync.fulfilled, (state, action) => {
        state.leads = state.leads.filter(l => l.id !== action.payload);
      })
      .addCase(reorderLeadsAsync.fulfilled, (state, action) => {
        state.leads = action.payload as Lead[];
      });
  },
})

export const { optimisticAddLead, optimisticUpdateLead, optimisticDeleteLead, optimisticReorderLeads } = crmSlice.actions
export default crmSlice.reducer
