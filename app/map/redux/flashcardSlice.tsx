import { createSlice } from '@reduxjs/toolkit';

import { filterFlashcards } from "../utils/flashcard.ts";
import { KMap } from "../app.d.ts";

export const flashcardSlice = createSlice({
  name: 'flashcardMap',
  initialState: {
    value: window.KMaps.map ? filterFlashcards(JSON.parse(window.KMaps.map) as KMap) : null
  },
  reducers: {
    updateMap: (state, action) => {
      let rootMap = extractCurrentMap(state);
      let updatedMap = action.payload as KMap;

      updatedMap = filterMaps(updatedMap, "recap");

      if (rootMap.id === updatedMap.id) {
        rootMap = updatedMap;
      } else {
        updateChildMap(rootMap, updatedMap);
      }

      state.value = rootMap;
    }
  },
});

export const { updateMap } = flashcardSlice.actions;


export default flashcardSlice.reducer;
