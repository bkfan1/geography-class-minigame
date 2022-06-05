import { useContext } from "react";
import { GameContext } from "../context/GameContext";

export default function Timer() {
  const { minutes, seconds } = useContext(GameContext);

  return (
    <div className="timer">
      <h1 className="timerTitle">Time Left</h1>
      <h1 className={`timerNumbers ${minutes <= 0 ? "warning" : ""}`}>
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </h1>
    </div>
  );
}
