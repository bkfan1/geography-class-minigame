import { Draggable } from "react-beautiful-dnd";

export default function DraggableFlag({ id, index, imageUrl }) {
  return (
    <>
      <Draggable draggableId={id} index={index}>
        {(provided, snapshot) => (
          <img
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`draggableFlag ${
              snapshot.isDragging ? "isDragging" : ""
            }`}
            src={`assets/flags/${imageUrl}`}
            alt={`flag-${id}`}
          />
        )}
      </Draggable>
    </>
  );
}
