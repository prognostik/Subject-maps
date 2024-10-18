import {useContext} from "react";

import UserContext from "../../data/UserContext.tsx";

import { getFlashcardsTotal } from "../../utils/flashcard.ts";

import { KMap } from "../../../app.d.ts";


export default function FlashcardHeader({map}: {map: KMap}) {
  const isSelfVisitor = useContext(UserContext);
  const totalFlashcards = map != null ? getFlashcardsTotal(map) : 0;


  if (!map) {
    return null;
  } else {
    return (
      <div className="mapHeader">
        <span className="mapHeader-title">{map.name}</span>
        <span className="mapHeader-count">{totalFlashcards}</span>
        
        {isSelfVisitor && map.isPublic && <span className="mapHeader-mapIsPublic"></span>} 
      </div>
    )    
  }
}