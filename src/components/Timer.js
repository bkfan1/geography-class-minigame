import { useState, useEffect, useContext } from "react";
import { GameContext } from "../context/GameContext";

export default function Timer() {
  const { matchDraggableFlags, minutes, seconds } = useContext(GameContext);

  return (
    <div className="timer">
      {minutes === 0 && seconds === 0 ? null : (
        <>
          <h1 className="timerTitle">Time Left</h1>
          <h1 className={`timerNumbers ${minutes <= 0 ? "warning" : ""}`}>
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </h1>
        </>
      )}
    </div>
  );
}
