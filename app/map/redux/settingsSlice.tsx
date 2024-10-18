import { createSlice } from '@reduxjs/toolkit';

import { MapDisplaySettings } from "../app.d.ts";

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    value: {
      displayImportance: 4,
      displayLevels: 2
    } as MapDisplaySettings,
  },
  reducers: {
    setDisplayImportance: (state, action) => {
      state.value.displayImportance = action.payload;
    },
    setDisplayLevels: (state, action) => {
      state.value.displayLevels = action.payload;
    },    
  },
});

export const { setDisplayImportance, setDisplayLevels } = settingsSlice.actions;

export default settingsSlice.reducer;
