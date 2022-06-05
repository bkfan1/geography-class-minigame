import { useContext } from "react";
import { GameContext } from "../context/GameContext";

export default function EndMatchStats() {
  const {
    playerWon,
    matchSilhouettesColumns,
    guessedCountriesCounter,
    failedGuessingAttempts,
    minutes,
    seconds,
  } = useContext(GameContext);

  return (
    <>
      <figure className="endMatchStats">
        <h1>Match Stats</h1>
        <div className="individualStat">
          <h1>Guessed countries:</h1>
          <h2>
            {guessedCountriesCounter}/{matchSilhouettesColumns.length}
          </h2>
        </div>
        <div className="individualStat">
          <h1>Failed guessing attempts:</h1>
          <h2>{failedGuessingAttempts}</h2>
        </div>

        {playerWon ? (
          <div className="individualStat">
            <h1>Match duration:</h1>
            <h2>
              <p>
                {minutes}m:{seconds}s
              </p>
            </h2>
          </div>
        ) : null}
      </figure>
    </>
  );
}
