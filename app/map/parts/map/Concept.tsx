import { useEffect, useContext } from "react";
import { useSelector } from "react-redux";

import Marker from "./Marker.tsx";
import Controls from "./Controls.tsx";
import { KMap, MapDisplaySettings } from "../../../app.d.ts";
import UserContext from "../../data/UserContext.tsx";

export default function Concept({map, markerCSSClass, isRecap}: 
                                {map: KMap, markerCSSClass: text, isRecap: boolean}) {
  const settings: MapDisplaySettings = useSelector((state) => state.settings.value);
  const isSelfVisitor = useContext(UserContext);

  console.log("Concept");
  console.log(map);

  // Prism executes itself automatically after having loaded on the page
  // but looks like there is some asyncronicity effect when React may render
  // after Prism is loaded. In this case Prism fails to find elements on the page to highlight them.
  useEffect(() => {
    Prism.highlightAll();
  }, [map]); // call Prism after editing text

  if (settings.displayImportance < map.importance) {
    return null;
  }  

  return (
    <div className="concept">
      <div className="concept-name">
        <div className="concept-header">
            <div className="concept-header-title">
              <Marker map={map} cssClass={markerCSSClass} isRecap={isRecap} />
            </div>
            {isSelfVisitor && <Controls map={map} isRecap={isRecap} />}
        </div>
      </div>
      <div className="concept-contents">
        {map.text != null && <div className="concept-contents-text" dangerouslySetInnerHTML={{ __html: map.text }}></div>}

        {map.maps != null && map.maps.length > 0 && <div className="concept-contents-markers">
          {map.maps.map(childMap => <Marker map={childMap} cssClass="" key={"marker" + childMap.id} />)}
        </div>}        
      </div>
    </div>     
  )
}