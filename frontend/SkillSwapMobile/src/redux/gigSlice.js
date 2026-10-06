import { createSlice } from '@reduxjs/toolkit';
import storage from '../utils/storage';














const initialState = {
  saved: [],
  totalCost: 0
};

export const gigSlice = createSlice({
  name: 'gigs',
  initialState,
  reducers: {
    saveGig: (state, action) => {
      const exists = state.saved.find((g) => g.id === action.payload.id);
      if (!exists) {
        state.saved.push(action.payload);
        state.totalCost = state.saved.reduce((acc, curr) => acc + (curr.price || 0), 0);
        storage.setSavedGigs(state.saved);
      }
    },
    removeGig: (state, action) => {
      state.saved = state.saved.filter((g) => g.id !== action.payload);
      state.totalCost = state.saved.reduce((acc, curr) => acc + (curr.price || 0), 0);
      storage.setSavedGigs(state.saved);
    },
    hydrateSaved: (state, action) => {
      state.saved = action.payload || [];
      state.totalCost = state.saved.reduce((acc, curr) => acc + (curr.price || 0), 0);
    }
  }
});

export const { saveGig, removeGig, hydrateSaved } = gigSlice.actions;
export default gigSlice.reducer;