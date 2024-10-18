import { KMap } from "../../app.d.ts";

export function getFlashcardsTotal(map: KMap) {
  if (map.maps === null || map.maps.length === 0) {
    if (map.questions === null) {
      return 0;
    } else {
      return 1;
    }
  } else {
    let total = 0;

    map.maps.forEach(map => {
      const currentTotal = getFlashcardsTotal(map);

      total += currentTotal;
    });

    if (map.questions != null) {
      total += 1;
    }

    return total;
  }
}

export function filterFlashcards(map: KMap) {
  if (!map.maps) {
    if (map.questions == null) {
      return null;
    } else {
      return map;
    }   
  }

  if (map.maps && map.maps.length) {
    const mapsFiltered = [];

    map.maps.forEach(map => {
      const result = filterFlashcards(map);

      if (result != null) {
        mapsFiltered.push(result);
      }
    });

    if (mapsFiltered.length > 0) {
      map.maps = mapsFiltered;
    } else {
      map.maps = null;
    }
  }

  // map can have its own question or its children can have questions
  if (map.maps != null || map.questions != null) {
    return map;
  } else {
    return null;
  }
}

export function extractMapsToList(map: KMap) {
  let result: KMap[] = [];
  let queue: KMap[] = [];

  queue.push(map);

  while (queue.length > 0) {
    const currentMap = queue.shift();

    if (currentMap.questions != null) {
      result.push(currentMap);
    }

    if (currentMap.maps && currentMap.maps.length) {
      currentMap.maps.forEach((map: KMap) => {
        queue.push(map);
      });
    }            
  }

  return result;
}


/**
 * Result is Map<map id, total>
 */
export function countFlashcardsTopLevel(map: KMap): Map<number, number> {
  let totalMap = new Map();

  if (map.maps && map.maps.length) {
    map.maps.forEach((map: KMap) => {
      const total = countTotal(map);

      totalMap.set(map.id, total);
    });
  }

  return totalMap;
}

function countTotal(map: KMap) {
  if (map.maps === null || !map.maps?.length) {
    return 1;
  } else {
    let sum = 0;

    map.maps.forEach((map: KMap) => {
      const total = countTotal(map);

      sum += total;
    });

    return sum + 1;
  }
}