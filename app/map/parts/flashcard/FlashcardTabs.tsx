import React from "react";

import { NavLink } from "react-router-dom";

import "../../../../../css/map/tabs/tabs.css";


export default function FlashcardTabs({callback, isGame, isList}) {

  function click(e) {
    e.preventDefault();
  }
  
  return (
    <>
      <div className="tabs">
        <div className={isGame ? "tabs-tab mActive mFlashcards" : "tabs-tab mFlashcards"} 
              onClick={() => {callback("game")}}>
          <a className="tabs-tab-link" onClick={click}>Game</a>
        </div>
        <div className={isList ? "tabs-tab mActive mFlashcards" : "tabs-tab mFlashcards"} 
              onClick={() => {callback("list")}}>
          <a className="tabs-tab-link" onClick={click}>List</a>
        </div>
      </div>
    </>   
  )
}
