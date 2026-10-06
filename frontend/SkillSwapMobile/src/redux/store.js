import { configureStore } from '@reduxjs/toolkit';
import gigReducer from './gigSlice';

export const store = configureStore({
  reducer: {
    gigs: gigReducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false
  })
});



export default store;