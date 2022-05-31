import { createContext, useEffect, useState } from "react";
import { levels } from "../utils/levels";
import shuffle from "../utils/shuffleArray";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [matchSilhouettesColumns, setMatchSilhouettesColumns] = useState([]);
  const [matchDraggableFlags, setMatchDraggableFlags] = useState([]);
  const [matchLocation, setMatchLocation] = useState("");
  const [guessedCountriesCounter, setGuessedCountriesCounter] = useState(0);
  const [failedGuessingAttempts, setFailedGuessingAttempts] = useState(0);
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(30);

  const setMatch = () => {
    const randInt = Math.floor(Math.random() * levels.length);
    const level = levels[randInt];
    const { location, countries } = level;

    let silhouettes = [],
      flags = [];

    countries.forEach((country) => {
      silhouettes.push({
        id: country.id,
        imageUrl: country.silhouette,
        flag: [],
      });
      flags.push({ id: country.id, imageUrl: country.flag });
    });

    setMinutes(1);
    setSeconds(30);

    setMatchSilhouettesColumns(shuffle(silhouettes));
    setMatchDraggableFlags(shuffle(flags));
    setGuessedCountriesCounter(0);

    setMatchLocation(location);
  };

  useEffect(() => {
    setMatch();
  }, []);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0 || matchDraggableFlags.length === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

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
        setFailedGuessingAttempts(failedGuessingAttempts+1);
      }
    }
  };

  return (
    <>
      <GameContext.Provider
        value={{
          matchSilhouettesColumns,
          matchDraggableFlags,
          matchLocation,
          setMatch,
          handleOnDragEnd,
          guessedCountriesCounter,
          failedGuessingAttempts,
          minutes,
          setMinutes,
          seconds,
          setSeconds,
        }}
      >
        {children}
      </GameContext.Provider>
    </>
  );
};
