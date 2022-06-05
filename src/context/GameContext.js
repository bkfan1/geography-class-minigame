import { createContext, useEffect, useState } from "react";
import { levels } from "../utils/levels";
import shuffle from "../utils/shuffleArray";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [startMatch, setStartMatch] = useState(false);
  const [matchEnded, setMatchEnded] = useState(false);

  const [currentLevel, setCurrentLevel] = useState(null);
  const [playerWon, setPlayerWon] = useState(false);

  const [matchSilhouettesColumns, setMatchSilhouettesColumns] = useState([]);
  const [matchDraggableFlags, setMatchDraggableFlags] = useState([
    { id: "placeholder" },
  ]);

  const [matchLocation, setMatchLocation] = useState("");

  const [guessedCountriesCounter, setGuessedCountriesCounter] = useState(0);
  const [failedGuessingAttempts, setFailedGuessingAttempts] = useState(0);

  const [minutes, setMinutes] = useState(null);
  const [seconds, setSeconds] = useState(null);

  const [error, setError] = useState(null);

  const setMatch = () => {
    let randInt = Math.floor(Math.random() * levels.length);

    if (matchEnded) {
      if (currentLevel === randInt) {
        if (currentLevel <= 0) {
          randInt += 1;
        } else {
          randInt -= 1;
        }
      }
    }

    const level = levels[randInt];
    const { location, countries } = level;

    let silhouettes = [],
      flags = [];

    countries.forEach((country) => {
      silhouettes.push({
        id: country.id,
        name: country.name,

        imageUrl: country.silhouette,
        flag: [],
      });

      flags.push({ id: country.id, imageUrl: country.flag });
    });

    silhouettes = shuffle(silhouettes);
    flags = shuffle(flags);

    setMatchSilhouettesColumns(silhouettes);
    setMatchDraggableFlags(flags);
    setMatchLocation(location);

    setPlayerWon(false);
    setMatchEnded(false);
    setCurrentLevel(randInt);

    setGuessedCountriesCounter(0);
    setFailedGuessingAttempts(0);

    setMinutes(1);
    setSeconds(30);
  };

  useEffect(() => {
    if (startMatch) {
      setMatch();
    }
  }, [startMatch]);

  useEffect(() => {
    let interval;

    const substractTime = (min, sec, setMin, setSec) => {
      if (sec > 0) {
        setSec(sec - 1);
      }

      if (sec === 0) {
        if (min > 0) {
          setMin(min - 1);
          setSec(59);
        }
      }
    };

    if (startMatch) {
      interval = setInterval(() => {
        if (matchEnded) {
          clearInterval(interval);
        } else {
          substractTime(minutes, seconds, setMinutes, setSeconds);
        }
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  });

  useEffect(() => {
    if (minutes === 0 && seconds === 0) {
      setMatchEnded(true);
    }
  }, [minutes, seconds]);

  useEffect(() => {
    if (matchDraggableFlags.length === 0) {
      setMatchEnded(true);
      setPlayerWon(true);
    }

    if (matchEnded) {
      if (matchDraggableFlags.length === 0) {
        setPlayerWon(true);
      }
    }
  }, [matchEnded, matchDraggableFlags]);

  useEffect(() => {
    setTimeout(() => {
      setError(null);
    }, 4000);
  }, [error]);

  const handleOnDragEnd = (result) => {
    console.log(result);
    const { source, destination, draggableId } = result;

    if (!source) {
      return;
    }
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      return;
    }

    if (draggableId === destination.droppableId) {
      const newFlags = [...matchDraggableFlags];
      const newColumns = [...matchSilhouettesColumns];
      const [removed] = newFlags.splice(source.index, 1);
      const columnId = newColumns.findIndex(
        (col) => col.id === destination.droppableId
      );
      //console.log(columnId)

      const currentColumn = newColumns[columnId];
      currentColumn.flag.push(removed);

      setMatchDraggableFlags(newFlags);
      setMatchSilhouettesColumns(newColumns);
      setGuessedCountriesCounter(guessedCountriesCounter + 1);
    }

    if (draggableId !== destination.droppableId) {
      const atLeastOneColumnHasFlag = matchSilhouettesColumns.some(
        (column) => column.flag.length === 1
      );

      if (atLeastOneColumnHasFlag) {
        //console.log("yes")
        const newFlags = [...matchDraggableFlags];
        const newColumns = [...matchSilhouettesColumns];
        const columnWithFlag = newColumns.find(
          (column) => column.flag.length === 1
        );
        //console.log(columnWithFlag)
        const [removed] = columnWithFlag.flag.splice(0, 1);
        //console.log(columnWithFlag)
        //console.log(newColumns)
        setMatchSilhouettesColumns(newColumns);
        setMatchDraggableFlags([...newFlags, removed]);

        setGuessedCountriesCounter(guessedCountriesCounter - 1);
        setFailedGuessingAttempts(failedGuessingAttempts + 1);

        setError("Wrong guess!, you lose a guessed country");
      } else {
        setError("Wrong guess!, try again");
      }
    }
  };

  return (
    <>
      <GameContext.Provider
        value={{
          startMatch,
          setMatch,
          setStartMatch,
          matchEnded,
          playerWon,
          matchSilhouettesColumns,
          matchDraggableFlags,
          matchLocation,
          handleOnDragEnd,
          guessedCountriesCounter,
          failedGuessingAttempts,
          minutes,
          setMinutes,
          seconds,
          setSeconds,
          error,
          setError,
        }}
      >
        {children}
      </GameContext.Provider>
    </>
  );
};
