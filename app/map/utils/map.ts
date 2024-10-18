import { KMap } from "../../app.d.ts";


export function getChildMap(rootMap, id) {
  let found = false;
  let maps = [];
  let childMap: KMap;

  maps.push(rootMap);

  while (maps.length > 0 && found === false) {
    const currentMap: KMap = maps.shift();

    if (currentMap.id === id) {
      found = true;
      childMap = currentMap;
    } else {
      const hasChildMaps = currentMap.maps && currentMap.maps.length > 0;

      hasChildMaps && currentMap.maps.forEach((map: KMap) => {
        maps.push(map);
      });
    }
  }

  return childMap;  
}


export function getRecapMapLink(rootMapId, map) {
  const mapLink = map.isRoot === true ? 
                   `/map/${map.id}/service/recap` : 
                   `/map/${rootMapId}/service/recap/${map.id}`;

  return mapLink;  
}
