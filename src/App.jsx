import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";
import { GameProvider } from "./context/GameContext";

function App() {
  return (
    <GameProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game" element={<GamePage />} />
        </Routes>
      </Router>
    </GameProvider>
  );
}

export default App;
