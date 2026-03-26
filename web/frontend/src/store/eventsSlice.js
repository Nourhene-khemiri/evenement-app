import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { eventService } from '../src/services/eventService';

export const fetchEvents = createAsyncThunk(
  'events/fetchAll',
  async () => await eventService.getAll()
);

export const createEvent = createAsyncThunk(
  'events/create',
  async (data) => await eventService.create(data)
);

export const deleteEvent = createAsyncThunk(
  'events/delete',
  async (id) => {
    await eventService.delete(id);
    return id;
  }
);

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Erreur';
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.items = state.items.filter(e => e.id !== action.payload);
      });
  },
});

export default eventsSlice.reducer;