import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { useSelector } from 'react-redux';
import { useLoaderData, ScrollRestoration } from "react-router-dom";

import Tabs from "../parts/Tabs.tsx";

import store from '../redux/store.tsx';
import Header from "../parts/map/Header.tsx";
import Settings from "../parts/map/Settings.tsx";
import Markers from "../parts/map/Markers.tsx";
import Breadcrumbs from "../parts/map/Breadcrumbs.tsx";
import Concept from "../parts/map/Concept.tsx";
import ConceptList from "../parts/map/ConceptList.tsx";

import { isRootMap, getChildMapId, getChildMap } from "../utils/map.ts";
import { filterMaps } from "../utils/redux.ts";

import { KMap } from "../../app.d.ts";


export default function Map() {
  let rootMap: KMap = useSelector((state) => state.map.value);  
  const { isRootMap, childMapId } = useLoaderData();
  const map: KMap = isRootMap ? rootMap : getChildMap(rootMap, childMapId);

  console.log("Map: ", map.name);


  return (
    <>
      <Tabs isLearn={true} />


      {map && <Header map={map} />}
      {map && <Breadcrumbs rootMap={rootMap} currentMap={map}  />}
      {map && <Settings />}
      {map && map.maps && 
        <div className="mapMarkers">
          <Markers map={map} level={1} />
        </div>
      }
      {map && 
        <div className={"conceptMain " + map.maps == null ? "mFinal" : ""}>
          <Concept map={map} markerCSSClass="mTop mBig" />
        </div>
      }

      {map && 
        <div className="conceptList">
          {map.maps && map.maps.map(childMap => <Concept map={childMap} isRecap={false} key={"childMap" + childMap.id} /> )}
        </div>
      }

      {/* When the map was deleted, it becomes null */}
      {!map && <div className="mapEmpty">This map was deleted</div>}

      <ScrollRestoration />
    </>
  )
}



