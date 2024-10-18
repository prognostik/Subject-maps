import {useContext} from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import UserContext from "../../data/UserContext.tsx";
import { onDragMap, allowDrop, onDropMap } from "../../utils/marker-actions.ts";
import { updateMap } from '../../redux/recapSlice.tsx';
import { updateMapParentAsync } from '../../redux/rest-api.ts';
import { getRecapMapLink } from '../../utils/map.ts';

import { KMap } from "../../../app.d.ts";

import "../../../../../css/map/recap/recap-marker.css";


export default function RecapMarker({map} : {map: KMap}) {
  const isSelfVisitor = useContext(UserContext);
  const dispatch = useDispatch();
  const rootMapId = window.KMaps.rootMapId;
  const mapLink = getRecapMapLink(rootMapId, map);


  function sendData(mapId, newParentMapId) {
    console.log("Sending data");
    dispatch(updateMapParentAsync(mapId, newParentMapId, updateMap));
  }
    

  return (
    <div 
      className="recapMarker"

      draggable={isSelfVisitor && true}
      onDragStart={e => {if (isSelfVisitor) { onDragMap(e, map.id) }}}
      onDragOver={isSelfVisitor && allowDrop}
      onDrop={e => {if (isSelfVisitor) { onDropMap(e, "learn", map.id, sendData) }}}
    >

      <NavLink to={mapLink} className="recapMarker-link">{map.name}</NavLink>      
    </div>
  )
}