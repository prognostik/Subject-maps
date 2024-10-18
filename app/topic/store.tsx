import { configureStore } from '@reduxjs/toolkit';
import topicReducer from './topicSlice.tsx';

export default configureStore({
  reducer: {
    topic: topicReducer
  },
});