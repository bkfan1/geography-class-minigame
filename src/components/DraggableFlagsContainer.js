import { useContext, useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { GameContext } from "../context/GameContext";
import DraggableFlag from "./DraggableFlag";
import Timer from "./Timer";

export default function DraggableFlagsContainer() {
  const { matchDraggableFlags } = useContext(GameContext);

  return (
    <>
      <Droppable droppableId={`draggableFlagsContainer`} direction={"vertical"}>
        {(provided) => (
          <menu
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="draggableFlagsContainer"
          >
            {matchDraggableFlags.map((draggableFlag, index) => (
              <DraggableFlag
                key={draggableFlag.id}
                id={draggableFlag.id}
                index={index}
                imageUrl={draggableFlag.imageUrl}
              />
            ))}
            {provided.placeholder}
          </menu>
        )}
      </Droppable>
    </>
  );
}
