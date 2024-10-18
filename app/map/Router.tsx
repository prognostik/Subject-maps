import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Main from "./Main.tsx";
import Map from "./pages/Map.tsx";
import Recap from "./pages/Recap.tsx";
import Flashcard from "./pages/Flashcard.tsx";



const router = createBrowserRouter([  
  {
    path: "/map/:rootMapId",
    element: <Main />,
    children: [
      {
        path: "/map/:rootMapId",
        element: <Map />,
        loader: () => { 
          return { 
            isRootMap: true 
          }
        }        
      },
      {
        path: "/map/:rootMapId/child/:childMapId",
        element: <Map />,
        loader: ({ params }) => { 
          return {
            isRootMap: false,
            childMapId: Number(params.childMapId)
          }
        }
      },
      {
        path: "/map/:rootMapId/service/recap",
        element: <Recap />,
        loader: () => { 
          return { 
            isRootMap: true 
          }
        }
      },
      {
        path: "/map/:rootMapId/service/recap/:childMapId",
        element: <Recap />,
        loader: ({ params }) => { 
          return {
            isRootMap: false,
            childMapId: Number(params.childMapId)
          }
        }
      },           
      {
        path: "/map/:rootMapId/service/flashcard",
        element: <Flashcard />,
        loader: () => { 
          return { 
            isRootMap: true 
          }
        }        
      },
      {
        path: "/map/:rootMapId/service/flashcard/:childMapId",
        element: <Flashcard />,
        loader: ({ params }) => { 
          return {
            isRootMap: false,
            childMapId: Number(params.childMapId)
          }
        }
      },       
    ]
  }         
]);


function RouterSetup() {
  return <RouterProvider router={router} />
}

  
let mapEl = document.getElementById("map");

if (mapEl) {
  ReactDOM.createRoot(mapEl).render(<RouterSetup />);
}
