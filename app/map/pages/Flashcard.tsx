import { useState } from "react";
import { useSelector } from 'react-redux';
import { useLoaderData, ScrollRestoration } from "react-router-dom";

import Tabs from "../parts/Tabs.tsx";
import Breadcrumbs from "../parts/map/Breadcrumbs.tsx";
import Markers from "../parts/map/Markers.tsx";
import FlashcardTabs from "../parts/flashcard/FlashcardTabs.tsx";
import FlashcardHeader from "../parts/flashcard/FlashcardHeader.tsx";
import FlashcardsList from "../parts/flashcard/FlashcardsList.tsx";
import FlashcardsGame from "../parts/flashcard/FlashcardsGame.tsx";

import { getChildMap } from "../utils/map.ts";
import { 
  extractMapsToList, 
  countFlashcardsTopLevel 
} from "../utils/flashcard.ts";

import "../../../../css/map/flashcard/flashcard.css";


export default function Flashcard() {    
  const rootMap: KMap = useSelector((state) => state.flashcard.value); 
  const { isRootMap, childMapId } = useLoaderData();

  const currentMap: KMap = isRootMap ? rootMap : 
                                      getChildMap(rootMap, childMapId); 

  console.log("flashcard");
  console.log("rootMap: ", rootMap);                                      
  console.log("currentMap: ", currentMap);                                      

  const flashcards: KMap[] = currentMap != null ? extractMapsToList(currentMap) : null;
  const flashcardsCount: Map<number, number> = currentMap != null ? countFlashcardsTopLevel(currentMap): 0;

  const [isGame, setIsGame] = useState(true);
  const [isList, setIsList] = useState(false);



  function setActiveTab(tab) {
    if (tab === "game") {
      setIsGame(true);
      setIsList(false);
    } else {
      setIsGame(false);
      setIsList(true);      
    }
  }
    

  return (
    <>
      <Tabs isFlashcard={true} />
      
      <FlashcardHeader map={currentMap} />
      <Breadcrumbs rootMap={rootMap} currentMap={currentMap} isFlashcard={true} />


      {flashcards &&
        <>
          {currentMap && 
            <div className="mapMarkers">
              <Markers 
                map={currentMap} 
                level={1} 
                isFlashcard={true}
                flashcardsCount={flashcardsCount} 
              />
            </div>
          }

          <FlashcardTabs callback={setActiveTab} isGame={isGame} isList={isList} />

          {isGame && <FlashcardsGame maps={flashcards} />}
          {isList && <FlashcardsList maps={flashcards} />}    
        </>
      }

      {!flashcards &&
        <div style={{padding: "30px"}}>There are no flashcards yet.<p /> 
        To create flashcards, add questions to corresponding concepts.</div>
      }



      <ScrollRestoration />        
    </>
  )
}