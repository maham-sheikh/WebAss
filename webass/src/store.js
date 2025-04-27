import { configureStore } from '@reduxjs/toolkit';
import candidatesReducer from './components/candidatesSlice';

export const store = configureStore({
  reducer: {
    candidates: candidatesReducer,
  },
});
