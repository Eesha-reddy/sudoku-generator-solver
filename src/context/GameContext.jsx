import React, { createContext, useState, useEffect } from "react";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [solvedCount, setSolvedCount] = useState(() => {
    const saved = localStorage.getItem("solvedCount");
    return saved ? JSON.parse(saved) : { easy: 0, medium: 0, hard: 0 };
  });

  useEffect(() => {
    localStorage.setItem("solvedCount", JSON.stringify(solvedCount));
  }, [solvedCount]);

  return (
    <GameContext.Provider value={{ selectedLevel, setSelectedLevel, solvedCount, setSolvedCount }}>
      {children}
    </GameContext.Provider>
  );
};

