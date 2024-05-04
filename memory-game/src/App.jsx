import { useState } from "react";

import "./styles/App.css";
import "./styles/reset.css";
import Header from "./header";
import Container from "./container";

function App() {
  return (
    <div className="main">
      <Header />
      <Container />
    </div>
  );
}

export default App;
