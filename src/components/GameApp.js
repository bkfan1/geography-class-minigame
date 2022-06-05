import { useContext } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { GameContext } from "../context/GameContext";
import DraggableFlagsContainer from "./DraggableFlagsContainer";
import EndMatchStats from "./EndMatchStats";
import Footer from "./Footer";
import HowToPlayBox from "./HowToPlayBox";
import SilhouettesGridContainer from "./SilhouettesGridContainer";
import Timer from "./Timer";

export default function GameApp() {
  const {
    startMatch,
    setStartMatch,
    matchEnded,
    setMatch,
    handleOnDragEnd,
    matchLocation,
  } = useContext(GameContext);
  return (
    <>
      <DragDropContext onDragEnd={(result) => handleOnDragEnd(result)}>
        <main>
          {!startMatch ? (
            <>
              <Footer />
              <img
                src={"assets/misc/globe.svg"}
                height={180}
                alt="Game Preview"
                style={{ margin: "15px 0px" }}
              />
              <button
                className="playAgainBtn"
                onClick={() => setStartMatch(true)}
              >
                Play
              </button>
              <HowToPlayBox />
            </>
          ) : matchEnded ? (
            <>
              <EndMatchStats />
              <button onClick={setMatch} className="playAgainBtn">
                Play again
              </button>
              <Footer />
            </>
          ) : (
            <>
              <figure className="locationBox">
                <h1>Location:</h1>
                <p>{matchLocation}</p>
              </figure>

              <section className="gameplaySection">
                <SilhouettesGridContainer />
                <aside>
                  <Timer />
                  <DraggableFlagsContainer />
                </aside>
              </section>
              <HowToPlayBox />
              <Footer />
            </>
          )}
        </main>
      </DragDropContext>
    </>
  );
}
