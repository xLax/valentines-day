import { useState } from "react";
import "./App.css";
import NoButton from "./NoButton";

function App() {
  const [answer, setAnswer] = useState(false);

  return (
    <>
      <h1 className="valentine-title">Will you be my Valentine? 💘</h1>

      {!answer && (
        <div className="valentine-container">
          <p>
            Life is better with you, and I’d love to make this Valentine’s Day
            special together.
          </p>

          <div className="buttons">
            <button className="yes-btn" onClick={() => setAnswer(true)}>
              Yes 💖
            </button>
            <NoButton className="no-btn">No 🙈</NoButton>
          </div>
        </div>
      )}

      {answer && (
        <div className="teddy-overlay">
          <img
            src="https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif"
            alt="Teddy sending a kiss"
            className="gif"
          />
          <p className="teddy-text">Yay!! 💖 I knew it!</p>

          <img
            src="https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3aHJ1eThoc2l3dGU2NXAwaGlybTJ6cHMzdjdwamNlbDdxempiNTFqMyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/8tWFiyF4thmIqgDD0q/giphy.gif"
            alt="Teddy sending a kiss"
            className="teddy-gif"
          />
        </div>
      )}
    </>
  );
}

export default App;
