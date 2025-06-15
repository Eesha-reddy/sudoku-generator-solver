import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GameContext } from "../context/GameContext";


const HomePage = () => {
  const navigate = useNavigate();
  const { setSelectedLevel } = useContext(GameContext);

  const startGame = (level) => {
    setSelectedLevel(level);
    navigate("/game");
  };

  return (
    <div className="home-container">
      <h1 className="home-title">🎯 Welcome to Sudoku Master!</h1>
      <p className="home-subtitle">Choose your difficulty level</p>
      <div className="level-buttons">
        <button onClick={() => startGame("easy")}>Easy</button>
        <button onClick={() => startGame("medium")}>Medium</button>
        <button onClick={() => startGame("hard")}>Hard</button>
      </div>
    </div>
  );
};

export default HomePage;

