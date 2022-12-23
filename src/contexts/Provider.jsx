/* eslint-disable no-unused-vars */
import { createContext, useState, useEffect, useContext } from "react";
import { lettersArray, wordsCat } from "../data/data";
const context = createContext();
export const ContextProvider = ({ children }) => {
  //states
  const [letters, setLetters] = useState(lettersArray);
  const [wordsCategory, setWordsCategory] = useState(Object.keys(wordsCat));
  const [chosenCat, setChosenCat] = useState(
    wordsCategory[Math.floor(Math.random() * wordsCategory.length)]
  );
  const [words, setWords] = useState(wordsCat[chosenCat]);
  const [word, setWord] = useState(
    words[Math.floor(Math.random() * words.length)].split("")
  );
  const [startGame, setStartGame] = useState(false);
  const [failCount, setFailCount] = useState(0);
  const [fail, setFail] = useState(false);
  const [click, setClick] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [winCount, setWinCount] = useState(-1);
  // functions
  // [1] Start Game
  const start = () => {
    setStartGame(true);
  };
  // [2] Check User Choice
  const checkUserChoice = (e) => {
    setClick((prev) => !prev);
    setFail(true);
    let chosenLetter = e.target.id.toLowerCase();
    word.forEach((letter, index) => {
      if (letter.toLowerCase() === chosenLetter) {
        e.target.classList.add("true");
        setFail(false);
        document
          .querySelectorAll(".word-guess .letter-guess")
          .forEach((guessLetter, guessLetterIndex) => {
            if (index === guessLetterIndex) {
              guessLetter.classList.remove("hide");
            }
          });
      } else {
        e.target.classList.add("false");
      }
    });
  };
  useEffect(() => {
    if (fail) {
      setFailCount((prev) => (prev += 1));
      document.querySelector(".hangman").classList.add(`fail-${failCount}`);
    } else {
      setWinCount((prev) => (prev += 1));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [click]);
  useEffect(() => {
    if (failCount === 6) {
      setGameOver(true);
    }
  }, [failCount]);
  useEffect(() => {
    let wordLowerCase = word.map((e) => e.toLowerCase());
    let wordWithoutRepeat = new Set(
      wordLowerCase.filter((letter) => letter !== " ")
    );
    if (winCount === Array.from(wordWithoutRepeat).length) {
      setWin(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winCount]);
  return (
    <context.Provider
      value={{
        letters,
        start,
        startGame,
        chosenCat,
        word,
        checkUserChoice,
        win,
        gameOver,
      }}
    >
      {children}
    </context.Provider>
  );
};
export const Provider = () => useContext(context);
