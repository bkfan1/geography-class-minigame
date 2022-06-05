import { Droppable } from "react-beautiful-dnd";
import StaticFlag from "./StaticFlag";

export default function SilhouetteColumn({ id, imageUrl, flag, countryName }) {
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
            {flag.length === 1 ? (
              <>
                {flag.map((flag) => (
                  <StaticFlag key={flag.id} imageUrl={flag.imageUrl} />
                ))}

                <p className="countryNameParagraph">{countryName}</p>
              </>
            ) : null}
            {provided.placeholder}
          </figure>
        )}
      </Droppable>
    </>
  );
}
