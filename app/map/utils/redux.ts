import { KMap } from "../../app.d.ts";

// state is a Redux Proxy object
export function extractCurrentMap(state) {
  const mapString = JSON.stringify(state.value);
  const rootMap: KMap = JSON.parse(mapString);

  return rootMap;  
}

export function updateChildMap(rootMap: KMap, childMap: KMap) {
  let maps: KMap[] = [];
  let updated = false;

  maps.push(rootMap);

  while (updated === false) {
    let currentMap = maps.shift();

    if (currentMap.id === childMap.id) {
      for (let key in currentMap) {
        currentMap[key] = childMap[key];
      }

      updated = true;
    } else {
      if (currentMap.maps && currentMap.maps.length) {
        currentMap.maps.forEach(map => {
          maps.push(map);
        });
      }
    }
  }
}

export function filterMaps(rootMap: KMap, type: "learn" | "recap") {
  let result: KMap[] = [];

  if (rootMap.maps && rootMap.maps.length) {
    rootMap.maps.forEach(map => {
      if (type === "learn" && map.isRecap === false) {
        result.push(map);
      }

      if (type === "recap" && map.isRecap === true) {
        result.push(map);
      }
    });   
  }

  rootMap.maps = result;

  return rootMap;
}



