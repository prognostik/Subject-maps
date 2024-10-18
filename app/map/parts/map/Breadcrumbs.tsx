import Marker from "./Marker.tsx";

import { getBreadcrumbs } from "../../utils/breadcrumbs.ts";
import { KMap } from "../../../app.d.ts";


export default function Breadcrumbs({rootMap, currentMap, isFlashcard}:
                                    {rootMap: KMap, currentMap: KMap, isFlashcard: boolean}) {
  const breadcrumbs: KMap[] = getBreadcrumbs(rootMap, currentMap);

  function getArrow(index) {
    if (index < (breadcrumbs.length - 1)) {
      return <div className="mapBreadcrumbs-arrow">&#8594;</div>
    } else {
      return null;
    }
  }


  if (!rootMap || !currentMap) {
    return null;
  } else {
    return (
      <div className="mapBreadcrumbs">
        {breadcrumbs.map((map, i) =>
          <div className="mapBreadcrumbs-block" key={"mapBreadcrumbs" + i}>
            <Marker map={map} isBreadcrumbs={true} isFlashcard={isFlashcard} />
            {getArrow(i)}
          </div>        
        )}
      </div>    
    )    
  }
}