import { useEffect } from "react";
import { KMap } from "../../../app.d.ts";

import "../../../../../css/map/flashcard/flashcards-list.css";

export default function FlashcardsList({maps}: {maps: KMap[]}) {
  useEffect(() => {
    Prism.highlightAll();
  }, [maps]); 


  if (!maps) {
    return null;
  } else {
    return (
      <div className="flashcardsList">
        {maps.map((map, index) =>
          <div className="flashcardsList-card" key={map.id}>
            <div className="flashcardsList-card-questions">
              <span className="flashcardsList-card-questions-counter">{index+1}.</span>
              <span dangerouslySetInnerHTML={{ __html: map.questions }}></span>
            </div>
            <div className="flashcardsList-card-concept" 
                  dangerouslySetInnerHTML={{ __html: map.text }}>
            </div>
          </div>
        )}
      </div>
    )
  }  
}