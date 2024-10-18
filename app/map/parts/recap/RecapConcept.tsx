import { useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";

import UserContext from "../../data/UserContext.tsx";
import Controls from "../map/Controls.tsx";
import { getRecapMapLink } from '../../utils/map.ts';

import "../../../../../css/map/recap/recap-concept.css";
import "../../../../../css/map/recap/elements/concept-border.css";
import "../../../../../css/map/recap/elements/table.css";
import "../../../../../css/map/recap/elements/area.css";

export default function RecapConcept({map, type} : {map: KMap, type?: string}) {
  const isSelfVisitor = useContext(UserContext);
  const rootMapId = window.KMaps.rootMapId;
  const mapLink = getRecapMapLink(rootMapId, map);

  // Prism executes itself automatically after having loaded on the page
  // but looks like there is some asyncronicity effect when React may render
  // after Prism is loaded. In this case Prism fails to find elements on the page to highlight them.
  useEffect(() => {
    Prism.highlightAll();
  }, [map]); // call Prism after editing text
  

  if (type === "root") {
    return (
      <div className="recapConcept">
        <div className="recapConcept-header">
          <div className="recapConcept-header-title">
            {/* <div className="recapConcept-header-title-wrapper">
            <NavLink to={mapLink} className="recapConcept-header-title-link">{map.name}</NavLink>
            </div> */}
          </div>
          {isSelfVisitor && <Controls map={map} isRecap={true} isRecapHeader={true} />}
        </div>
      </div>
    )
  } else {
    return (
      <div className="recapConcept">
        <div className="recapConcept-header">
          <div className="recapConcept-header-title">
            <div className="recapConcept-header-title-wrapper">
            <NavLink to={mapLink} className="recapConcept-header-title-link">{map.name}</NavLink>
            </div>
          </div>
          {isSelfVisitor && <Controls map={map} isRecap={true} />}
        </div>
        <div className="recapConcept-body" dangerouslySetInnerHTML={{ __html: map.text }}>
        </div>
      </div>
    )    
  } 
}