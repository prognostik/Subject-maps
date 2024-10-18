import RecapMarker from "./RecapMarker.tsx";
import { KMap } from "../../../app.d.ts";

import "../../../../../css/map/recap/recap-markers-block.css";


export default function RecapMarkers({map, level}: 
                                {map: KMap, level: number}) {

  const markersBlockClass = level > 0 ? "recapMarkersBlock mLevel" 
                                      : "recapMarkersBlock";

                              
  return (
    <div className={markersBlockClass}>
      {map.maps && map.maps.map(map => 
        <div key={map.id}>
          <RecapMarker map={map} />

          <RecapMarkers map={map} level={level + 1} />
        </div>           
      )}
    </div>
  )

}