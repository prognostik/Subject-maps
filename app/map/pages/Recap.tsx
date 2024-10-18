import React from "react";
import { useSelector } from "react-redux";
import { useLoaderData, ScrollRestoration } from "react-router-dom";

import Tabs from "../parts/Tabs.tsx";
import Header from "../parts/map/Header.tsx";
import RecapBreadcrumbs from "../parts/recap/RecapBreadcrumbs.tsx";
import RecapMarkers from "../parts/recap/RecapMarkers.tsx";
import RecapConcept from "../parts/recap/RecapConcept.tsx";
import Controls from "../parts/map/Controls.tsx";

import { getChildMap } from "../utils/map.ts";

import "../../../../css/map/recap/recap.css";
import "../../../../css/map/recap/recap-markers.css";
import "../../../../css/map/recap/recap-concept-list.css";
import "../../../../css/map/recap/recap-concept-border.css";


export default function Recap() {
  let rootMap: KMap = useSelector((state) => state.recap.value);
  const { isRootMap, childMapId } = useLoaderData();
  const map: KMap = isRootMap ? rootMap : getChildMap(rootMap, childMapId);
  const childMapsPresent = map && !!map.maps?.length;

  console.log("Open recap page: ", map);

  return (
    <>
      <Tabs isRecap={true} level={0} />

      {map && <Header map={map} isRecap={true} />}

      <RecapBreadcrumbs rootMap={rootMap} currentMap={map}  />

      {childMapsPresent && 
        <div className="recapMarkers">
          <RecapMarkers map={map} level={0} />
        </div>
      }

      <div className="recapConceptList">
        {map.isRoot && <RecapConcept map={map} type="root" />}

        {!map.isRoot && <RecapConcept map={map} />}

        {!map.isRoot && childMapsPresent && <div className="recapConceptBorder"></div>}

        {childMapsPresent && map.maps.map(recapMap => 
          <RecapConcept map={recapMap} key={recapMap.id} /> )
        }
      </div>

      <ScrollRestoration />      

    </>
  )
}