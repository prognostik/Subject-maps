import { KMap } from "../../../app.d.ts";

import "../../../../../css/map/contents.css";


export default function Contents({map}: {map: KMap}) {

  return (
    <>
      {map.maps && map.maps.map((childMap, i) => 
        <div className="contents-map">
          <span className={"contents-map-number " + "m" + childMap.importance}>{i+1}.</span> 
          <span className="contents-map-title">{childMap.name}</span>
        </div>
      )}


    </>    

  )


}