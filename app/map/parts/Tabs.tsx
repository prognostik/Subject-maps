import React from "react";

import { NavLink } from "react-router-dom";

import "../../../../css/map/tabs/tabs.css";


export default function Tabs({isLearn, isRecap, isFlashcard}) {
  const rootMapId = window.KMaps.rootMapId;
  
  return (
    <div className="tabs">
      <div className={isLearn ? "tabs-tab mActive" : "tabs-tab"}>
        <NavLink to={`/map/${rootMapId}`} className="tabs-tab-link">Maps</NavLink>
      </div>
      <div className={isRecap ? "tabs-tab mActive" : "tabs-tab"}>
        <NavLink to={`/map/${rootMapId}/service/recap`} className="tabs-tab-link">Recaps</NavLink>
      </div>
      <div className={isFlashcard ? "tabs-tab mActive" : "tabs-tab"}>
        <NavLink to={`/map/${rootMapId}/service/flashcard`} className="tabs-tab-link">Flashcards</NavLink>
      </div>
    </div>   
  )
}
