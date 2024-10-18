import "../../../css/map/mapBreadcrumbs.css";
import "../../../css/map/mapHeader.css";
import "../../../css/map/settings.css";
import "../../../css/map/mapMarkers.css";
import "../../../css/map/marker.css";
import "../../../css/map/importance.css";
import "../../../css/map/mapEmpty.css";

import "../../../css/map/conceptMain.css";
import "../../../css/map/conceptList.css";
import "../../../css/map/concept.css";
import "../../../css/map/mapControls.css";

import "../../../css/map/popup/popup.css";


import React from "react";
import { Provider } from 'react-redux';
import { Outlet, NavLink } from "react-router-dom";

import EnvContext from "./data/EnvContext.tsx";
import UserContext from "./data/UserContext.tsx";

import store from './redux/store.tsx';

export default function Main() {

  return (
    <Provider store={store}>
      <EnvContext.Provider value={window.KMaps.environment}>
        <UserContext.Provider value={window.KMaps.isSelfVisitor}>    
          <Outlet />
        </UserContext.Provider>
      </EnvContext.Provider>             
    </Provider>      
  )
}
