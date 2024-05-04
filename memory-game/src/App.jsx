import { useState } from "react";

import "./styles/App.css";
import "./styles/reset.css";
import Header from "./header";
import Container from "./container";

function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  function updateScore() {
    setScore(score + 1);
  }
  function resetScore() {
    setScore(0);
  }

  function checkHighScore() {
    if (score > highScore) {
      setHighScore(score);
      console.log("hey", score, highScore);
    }
  }

  return (
    <div className="main">
      <Header score={score} highScore={highScore} />
      <Container
        updateScore={updateScore}
        resetScore={resetScore}
        checkHighScore={checkHighScore}
        score={score}
        highScore={highScore}
      />
    </div>
  );
}

export default App;
