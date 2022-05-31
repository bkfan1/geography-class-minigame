import { useContext } from "react";
import { GameContext } from "../context/GameContext";

export default function EndMatchStats() {
  const { matchSilhouettesColumns,guessedCountriesCounter, failedGuessingAttempts } =
    useContext(GameContext);

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
          <h2>
            {failedGuessingAttempts}
          </h2>
        </div>
      </figure>
    </>
  );
}
