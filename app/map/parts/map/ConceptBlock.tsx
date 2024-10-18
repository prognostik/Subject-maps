import { useEffect } from "react";
import { KMap } from "../../../app.d.ts";

import Contents from "./Contents.tsx";
import "../../../../../css/map/concept-block.css";


export default function ConceptBlock({map, level}: 
                                {map: KMap, level: number}) {
  let levels = [];

  if (level != null) {
    // don't count first level
    for (let i = 0; i < level; i++) {
      levels.push(<div className="concept-title-level" key={"level" + i}></div>);
    }
  }  

  useEffect(() => {
    Prism.highlightAll();
  }, [map]); // call Prism after editing text  

  return (
    <>
      {map.maps && map.maps.map((childMap, i) => 
        <div key={childMap.id}>
          <div className="conceptBlock">
            <div className={"conceptBlock-title " + "m" + level}>
              <div className="concept-title-levels">{levels}</div> 
              <div className="concept-title-name">{childMap.name}</div>
              <div className={"conceptBlock-title-importance " + "m" + childMap.importance}></div>

            </div>

            <div className="conceptBlock-text" 
                dangerouslySetInnerHTML={{ __html: childMap.text }}></div>
          </div>

          <ConceptBlock map={childMap} level={level+1} />
        </div>
      )

      }
    </>

  )


}