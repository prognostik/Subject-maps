import { createSlice, current} from '@reduxjs/toolkit';

import { extractCurrentMap, updateChildMap, filterMaps } from "../utils/redux.ts";
import { KMap } from "../app.d.ts";
import { testmap } from "./testmap.ts";

export const mapSlice = createSlice({
  name: 'map',
  initialState: {
    value: window.KMaps.map ? filterMaps(JSON.parse(window.KMaps.map) as KMap, "learn") : null,
  },
  reducers: {
    updateMap: (state, action) => {      
      let rootMap = extractCurrentMap(state);
      let updatedMap = action.payload as KMap;

      updatedMap = filterMaps(updatedMap, "learn");

      if (rootMap.id === updatedMap.id) {
        rootMap = updatedMap;
      } else {
        updateChildMap(rootMap, updatedMap);
      }

      state.value = rootMap;
    }
  },
});


export const { updateMap } = mapSlice.actions;

export default mapSlice.reducer;
