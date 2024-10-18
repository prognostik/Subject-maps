import RecapMarker from "./RecapMarker.tsx";

import { getBreadcrumbs } from "../../utils/breadcrumbs.ts";
import { KMap } from "../../../app.d.ts";

export default function Breadcrumbs({rootMap, currentMap}:
                            {rootMap: KMap, currentMap: KMap}) {
  const breadcrumbs: KMap[] = getBreadcrumbs(rootMap, currentMap);

  return (
    <div className="mapBreadcrumbs">
      {breadcrumbs.map((map, i) =>
        <div className="mapBreadcrumbs-block" key={"mapBreadcrumbs" + i}>
            <RecapMarker map={map} />
            {i < (breadcrumbs.length - 1) ? <div className="mapBreadcrumbs-arrow">&#8594;</div> : null}
        </div>        
      )}
    </div>    
  )
}