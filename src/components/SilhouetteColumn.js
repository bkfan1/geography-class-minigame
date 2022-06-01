import { useContext, useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { GameContext } from "../context/GameContext";
import StaticFlag from "./StaticFlag";

export default function SilhouetteColumn({ id, imageUrl, flag }) {
  return (
    <>
      <Droppable droppableId={id}>
        {(provided) => (
          <figure
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="silhouetteColumn"
            style={{ backgroundImage: `url(assets/silhouettes/${imageUrl})` }}
          >
            {flag.length === 1
              ? flag.map((flag) => (
                  <StaticFlag key={flag.id} imageUrl={flag.imageUrl} />
                ))
              : null}
            {provided.placeholder}
          </figure>
        )}
      </Droppable>
    </>
  );
}
