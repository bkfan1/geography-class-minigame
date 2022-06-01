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
          <p>
            You must correctly match the flags to the unlabeled countries on the larger map. Each mistake made takes away a guessed flag (in case you have guessed one or more).

          </p>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
