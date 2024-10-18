import {useContext} from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import UserContext from "../../data/UserContext.tsx";
import { updateMap } from '../../redux/mapSlice.tsx';
import { updateMapParentAsync } from '../../redux/rest-api.ts';
import { onDragMap, allowDrop, onDropMap } from "../../utils/marker-actions.ts";
import { getMapLink, getCSSClass } from "../../utils/marker.ts";

import { KMap, MapDisplaySettings } from "../../../app.d.ts";


export default function Marker({map, level, isBreadcrumbs, isFlashcard, flashcardsCount, cssClass}: 
                                {map: KMap, level: number, isBreadcrumbs?: boolean, 
                                isFlashcard?: boolean, flashcardsCount?: Map<number, number>,
                                cssClass?: text}) {
  const isSelfVisitor = useContext(UserContext);
  const settings: MapDisplaySettings = useSelector((state) => state.settings.value);
  const dispatch = useDispatch();
  let levels = [];
  let cssClasses = getCSSClass(map, level, isBreadcrumbs, cssClass);

  const rootMapId = window.KMaps.rootMapId;
  const mapLink = getMapLink(map, rootMapId, isFlashcard);
  const showMarkerData = (isBreadcrumbs || isFlashcard) ? false : true;


  if (map.levels != null) {
    // don't count first level
    for (let i = 0; i < map.levels; i++) {
      levels.push(<div className="marker-levels-level" key={"level" + i}></div>);
    }
  }



  function sendData(mapId, newParentMapId) {
    dispatch(updateMapParentAsync(mapId, newParentMapId, updateMap));
  }


  if (settings.displayImportance < map.importance) {
    return null;
  }

  return (
    // setting draggable=false doesn't prevent dragging the marker 
    // so had to put !isFlashcard into other properties 
    <div 
      className={"marker " + cssClasses}  
      
      draggable={(isSelfVisitor && !isFlashcard) ? true : false}
      onDragStart={e => {if (isSelfVisitor && !isFlashcard) { onDragMap(e, map.id) }}}
      onDragOver={(isSelfVisitor && !isFlashcard) ? allowDrop : undefined}
      onDrop={e => {if (isSelfVisitor && !isFlashcard) { onDropMap(e, "learn", map.id, sendData) }}}
    >
      <div className={"marker-importance" + " " + "mImportance" + map.importance}>
        {map.difficulty >= 1 && <div className="marker-importance-difficulty">
          <img class="marker-importance-difficulty-icon" src="/img-app/lightning.svg" />
        </div>}
        {map.difficulty == 2 && <div className="marker-importance-difficulty">
          <img class="marker-importance-difficulty-icon mSecondLightning" src="/img-app/lightning.svg" />
        </div>}

        {map.notabene && <div className="marker-importance-notabene">!</div>}        
      </div>

      <div className="marker-title">
        <NavLink to={mapLink} className="marker-title-link">{map.name}</NavLink>
      </div>

      {showMarkerData && 
        <>

        {map.questions != null && <div className="marker-questions">?</div>} 

        {map.maps == null && (map.text == null || map.text == '') ? <div className="marker-empty">&#9675;</div> : null}

        <div className="marker-levels">
            {levels} 
        </div>

        <div className="marker-total"></div>

        {(isSelfVisitor && map.position != null) && <div className="marker-position">{map.position}</div>}

        {level == 1 && map.counter > 0 && <div className="marker-counter">{map.counter}</div>} 
        </>
      }

      {isFlashcard && level == 1 &&  
        <div className="marker-counter mLeftMargin">{flashcardsCount.get(map.id)}</div>
      }


    </div>                   

    )
}