import { useState } from "react";

export default function HowToPlayBox() {
  const [clicked, setClicked] = useState(false);
  return (
    <>
      <div className="howToPlayBox">
        <header onClick={() => setClicked(!clicked)}>
          <h1>How to play</h1>
          <button>
            <i
              className={clicked ? "bi bi-chevron-up" : "bi bi-chevron-down"}
            />
          </button>
        </header>
        {clicked ? (
          <>
            <p style={{ marginBottom: "0px" }}>
              You must correctly match the flags to the unlabeled countries on
              the larger map before time runs out.
            </p>
            <img
              src={"assets/misc/gamePreview.png"}
              style={{
                margin: "25px 0px",
                border: "2px solid #b16d4d",
                borderRadius: "5px",
              }}
              alt="Game Preview"
            />
            <h1 style={{ fontSize: "18px", margin: "0px", marginTop:"10px" }}>Rules:</h1>
            <li>
              <p>
                - Each mistake made removes a guessed flag (in case you have
                guessed one or more).
              </p>
            </li>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
