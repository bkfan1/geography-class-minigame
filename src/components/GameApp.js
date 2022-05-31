import { useContext } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { GameContext } from "../context/GameContext";
import DraggableFlagsContainer from "./DraggableFlagsContainer";
import EndMatchStats from "./EndMatchStats";
import HowToPlayBox from "./HowToPlayBox";
import SilhouettesGridContainer from "./SilhouettesGridContainer";
import Timer from "./Timer";

export default function GameApp() {
  const {
    setMatch,
    minutes,
    seconds,
    matchDraggableFlags,
    handleOnDragEnd,
    matchLocation,
  } = useContext(GameContext);
  return (
    <>
      <DragDropContext onDragEnd={(result) => handleOnDragEnd(result)}>
        <main>
          {(minutes === 0 && seconds === 0) ||
          matchDraggableFlags.length === 0 ? (
            <>
              <EndMatchStats />
              <button onClick={setMatch} className="playAgainBtn">
                Play again
              </button>
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
            </>
          )}
          <footer>
            <h3>Geography Class Minigame</h3>
            <h5>Created by Jackson Paredes Ferranti</h5>
            <ul>
              <a title="Github profile" href="https://www.github.com/bkfan1">
                <i className="bi bi-github" />
              </a>
              <a title="Send email" href="mailto:jacksonpf177@gmail.com">
                <i className="bi bi-envelope" />
              </a>
            </ul>
          </footer>
        </main>
      </DragDropContext>
    </>
  );
}
