import { configureStore } from '@reduxjs/toolkit';
import mapReducer from './mapSlice.tsx';
import settingsReducer from './settingsSlice.tsx';
import recapReducer from './recapSlice.tsx';
import flashcardReducer from './flashcardSlice.tsx';

export default configureStore({
  reducer: {
    map: mapReducer,
    recap: recapReducer,
    flashcard: flashcardReducer,
    settings: settingsReducer
  },
});