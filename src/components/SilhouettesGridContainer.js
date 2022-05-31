import { useContext } from "react";
import { GameContext } from "../context/GameContext";
import SilhouetteColumn from "./SilhouetteColumn";
import Timer from "./Timer";

export default function SilhouettesGridContainer() {
  const { matchLocation, matchSilhouettesColumns } = useContext(GameContext);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        textAlign: "center",
      }}
    >
      <section className="silhouettesGridContainer">
        {matchSilhouettesColumns.map((column) => (
          <SilhouetteColumn
            key={column.id}
            id={column.id}
            imageUrl={column.imageUrl}
            flag={column.flag}
          />
        ))}
      </section>
    </div>
  );
}
