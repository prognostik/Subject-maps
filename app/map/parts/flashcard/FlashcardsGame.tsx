import { useState, useEffect } from "react";
import { flushSync } from 'react-dom';

import { KMap } from "../../../app.d.ts";

import "../../../../../css/map/flashcard/game.css";


export default function FlashcardsGame({maps}: {maps: KMap[]}) {
  const [flashcards, setFlashcards] = useState(maps);
  const [currentCard, setCurrentCard] = useState(null);
  const [count, setCount] = useState(1);
  const [isLastCard, setIsLastCard] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  

  useEffect(() => {
    initGame();
  }, [maps])



  function initGame() {
    const shuffled = shuffle(flashcards);

    // Need to set "currentCard" based on the "shuffled" value
    // because React applies changes asynchronously, sp that they
    // don't get flushed immediately - flashcards[0] at this moment will
    // most likely still contain an outdated value
    setFlashcards(shuffled);
    setCurrentCard(shuffled[0]);
  }

  function shuffle(cards: KMap[]) {
    console.log("Shuffle");   
    let currentIndex = cards.length;
    let cardsNew = copyCards(cards);

    //While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);

      currentIndex--;

      // And swap it with the current element.
      [cardsNew[currentIndex], cardsNew[randomIndex]] = [
        cardsNew[randomIndex], cardsNew[currentIndex]];
    }

    cardsNew.forEach((card, i) => {console.log(`${i} ${card.questions}`)});

    return cardsNew;
  }

  function copyCards(cards: KMap[]) {
    let cardsNew = [];

    cards.forEach((card: KMap) => {
      const cardCopy = {...card};

      cardsNew.push(cardCopy);
    });

    return cardsNew;
  }

  function next() {
    setShowAnswer(false);

    if (count < maps.length) {
      const countNext = count + 1;
      const index = countNext - 1;  

      setCurrentCard(flashcards[index]);
      setCount(countNext);
    } 

    if (count === maps.length - 1) {
      setIsLastCard(true);
    }
  }

  function showAnswerBlock() {
    // immediately apply updates to the DOM
    flushSync(() => {
      setShowAnswer(true);
    });

    Prism.highlightAll();
  } 

  function restart() {
    console.log("Restart");

    const shuffled = shuffle(flashcards);

    setFlashcards(shuffled);
    setCurrentCard(shuffled[0]);

    //flashcards.forEach((card, i) => {console.log(`${i} ${card.questions}`)});
    //console.log("Current card: ", currentCard.questions);    

    setCount(1);
    setIsLastCard(false);
  } 

  if (flashcards === null) {
    return null;
  } else {
    return (
      <div className="game">
        <div className="game-controls">
          <div className="game-controls-column mLeft">
          </div>
          <div className="game-controls-column mCenter">
            <button className="game-controls-button" onClick={restart}>Restart</button>
            <button className="game-controls-button" onClick={showAnswerBlock}>Show answer</button>
            <button className={isLastCard ? "game-controls-button mDisabled" : "game-controls-button"} 
                    onClick={next}>Next</button>          
          </div>
          <div className="game-controls-column mRight">
            {/* NB: if we set this to flashcards.length, the value on screen will not
            update when switching between views - i.e. switching to a different map */}
            <span className="game-controls-count">{count}/{maps.length}</span>
          </div>
          
        </div>

        <div className="game-questions">{currentCard?.questions}</div>

        {showAnswer && <div className="game-answer" dangerouslySetInnerHTML={{ __html: currentCard?.text }}></div>}


      </div>  
    ) 
  }
}