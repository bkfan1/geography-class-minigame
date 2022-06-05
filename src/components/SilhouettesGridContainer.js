import { useContext } from "react";
import { GameContext } from "../context/GameContext";
import SilhouetteColumn from "./SilhouetteColumn";
import Timer from "./Timer";

export default function SilhouettesGridContainer() {
  const { matchSilhouettesColumns, error, setError } = useContext(GameContext);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      {error ? (
        <p onClick={() => setError(null)} className="errorParagraph">
          <i className="bi bi-x-circle-fill" /> {error}
        </p>
      ) : null}
      <section className="silhouettesGridContainer">
        {matchSilhouettesColumns.map((column) => (
          <SilhouetteColumn
            key={column.id}
            id={column.id}
            imageUrl={column.imageUrl}
            flag={column.flag}
            countryName={column.name}
          />
        ))}
      </section>
    </div>
  );
}
