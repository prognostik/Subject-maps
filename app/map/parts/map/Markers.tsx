import { useSelector } from 'react-redux';

import Marker from "./Marker.tsx";

import { KMap, MapDisplaySettings } from "../../../app.d.ts";


export default function Markers({map, level, isFlashcard, flashcardsCount}: 
                                  {map: KMap, level: number, isFlashcard?: boolean, 
                                  flashcardsCount?: Map<number, number>}) {
  const settings: MapDisplaySettings = useSelector((state) => state.settings.value);

  if (level > settings.displayLevels) {
    return null;
  } if (isFlashcard && level > 1) {
    // show only first level markers on the flashcards page
    return null;
  } else {
    return (
      <div className={level > 1 ? "mapMarkers-level" : ""}>
        {map.maps && map.maps.map(map => 
          <div key={map.id}>
            <Marker 
              map={map}
              level={level} 
              isFlashcard={isFlashcard}
              flashcardsCount={flashcardsCount} 
            />

            <Markers map={map} level={level + 1} isFlashcard={isFlashcard} />
          </div>
        )}
      </div>
    )    
  }

}