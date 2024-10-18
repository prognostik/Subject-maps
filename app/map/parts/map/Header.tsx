import {useContext} from "react";

import UserContext from "../../data/UserContext.tsx";

import { getFlashcardsTotal } from "../../utils/flashcard.ts";

import { KMap } from "../../../app.d.ts";

export default function Header({map, isRecap}: {map: KMap, isRecap?: boolean}) {
  const isSelfVisitor = useContext(UserContext);
  const totalFlashcards = getFlashcardsTotal(map);

  return (
    <div className="mapHeader">
      {!map.isRoot && !map.isRecap ? <div className={"mapHeader-importance" + " " + "mImportance" + map.importance} 
        ></div> : null}  
        <span className="mapHeader-title">{map.name}</span>
        {!isRecap && <span className="mapHeader-count">{map.counter} / {totalFlashcards}</span>}
        {isSelfVisitor && map.isPublic && <span className="mapHeader-mapIsPublic"></span>} 
    </div>
  )
}