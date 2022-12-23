import React from "react";
import "./app.scss";
import { FaReact } from "react-icons/fa";
import { Provider } from "./contexts/Provider";
import { motion } from "framer-motion";
import image from "./assets/win.svg";
const App = () => {
  const {
    letters,
    start,
    startGame,
    chosenCat,
    word,
    checkUserChoice,
    win,
    gameOver,
  } = Provider();
  return (
    <div className="app flex flex-column box-shadow">
      <h1 className="main-title txt-c p-2 cl-bl centering-content g-1 ">
        <div className="content fs-large">Hangman Game</div>
        <motion.div
          initial={{ rotate: 0 }}
          animate={{
            rotate: 360,
            transition: {
              yoyo: Infinity,
              duration: 10,
            },
          }}
          className="icon fs-x-large flex"
        >
          <FaReact />
        </motion.div>
      </h1>
      {!startGame ? (
        <div className="centering-content p-2">
          <motion.button
            whileHover={{
              scale: 1.3,
            }}
            className="button main-bg cl-w w-fit txt-c radius "
            onClick={start}
          >
            Start Game
          </motion.button>
        </div>
      ) : (
        <p className="word-cat p-2 bold justify-center flex g-1">
          Word Category : <span className="bold cl-m">{chosenCat}</span>{" "}
        </p>
      )}
      <div className="game-body flex w-100 p-3 justify-center ">
        {win ? (
          <div className="win flex flex-column justify-center g-2 align-center">
            <h1 className="cl-bl">Congratulation</h1>
            <div className="flex g-1">
              The Word Is :<span className="cl-bl bold">{word}</span>
            </div>
            <motion.button
              whileHover={{
                scale: 1.15,
              }}
              className="button green-bg cl-w radius"
              onClick={() => window.location.reload()}
            >
              Play Again
            </motion.button>
          </div>
        ) : gameOver ? (
          <div className="lose flex flex-column justify-center g-2 align-center">
            <h1 className="cl-bl">You Hanged</h1>
            <div className="flex g-1">
              The Word Is :<span className="cl-m bold">{word}</span>
            </div>
            <motion.button
              whileHover={{
                scale: 1.15,
              }}
              className="button red-bg cl-w radius"
              onClick={() => window.location.reload()}
            >
              Play Again
            </motion.button>
          </div>
        ) : (
          <div className="letters flex g-1 flex-wrap flex-1 justify-center">
            {letters.map((letter) => (
              <motion.span
                whileHover={{
                  backgroundColor: "#ffa852",
                }}
                className={`centering-content bold radius blue-bg cl-w pointer letter txt-upper ${
                  !startGame ? "off" : ""
                }`}
                key={letter.toUpperCase()}
                id={letter}
                onClick={checkUserChoice}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        )}
        {win ? (
          <div className="image">
            <img src={image} alt="" />
          </div>
        ) : (
          <div className="hangman centering-content w-50 relative">
            <div className="set relative"></div>
            <div className="hang absolute circle"></div>
            <div className="head absolute circle"></div>
            <div className="body absolute"></div>
            <div className="hands absolute"></div>
            <div className="legs absolute"></div>
          </div>
        )}
      </div>
      <div className="word-guess flex g-2 justify-center p-3">
        {startGame &&
          word.map((letter, id) => (
            <span
              key={id}
              id={letter}
              className={`relative centering-content bold cl-w fs-med centering-content letter-container letter-guess hide txt-upper ${
                letter === " " ? "space" : ""
              }`}
            >
              <span>{letter}</span>
            </span>
          ))}
      </div>
    </div>
  );
};

export default App;
