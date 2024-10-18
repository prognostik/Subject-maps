import { configureStore } from '@reduxjs/toolkit';
import topicsReducer from './topicsSlice.tsx';

export default configureStore({
  reducer: {
    topics: topicsReducer
  },
});