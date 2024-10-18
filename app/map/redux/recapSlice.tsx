import { createSlice } from '@reduxjs/toolkit';

import { extractCurrentMap, updateChildMap, filterMaps } from "../utils/redux.ts";
import { KMap } from "../app.d.ts";

export const recapSlice = createSlice({
  name: 'recapMap',
  initialState: {
    value: window.KMaps.map ? filterMaps(JSON.parse(window.KMaps.map) as KMap, "recap") : null
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

export const { updateMap } = recapSlice.actions;


export default recapSlice.reducer;
