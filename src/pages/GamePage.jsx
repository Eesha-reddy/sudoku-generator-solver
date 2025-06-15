import React, { useState, useContext, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { GameContext } from "../context/GameContext";
import SudokuGrid from "../components/SudokuGrid";
import Controls from "../components/Controls";
import ResultModal from "../components/ResultModal";
import { puzzles } from "../puzzles";

const emptyGrid = () => Array(9).fill(null).map(() => Array(9).fill(""));
const normalizePuzzle = (puzzle) =>
    puzzle.map(row =>
      row.map(cell => (cell === 0 || cell === "" ? "" : cell.toString()))
    );
  
const isSafe = (grid, row, col, num) => {
  for (let x = 0; x < 9; x++) {
    if (grid[row][x] === num || grid[x][col] === num) return false;
  }

  const startRow = row - (row % 3);
  const startCol = col - (col % 3);

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[startRow + i][startCol + j] === num) return false;
    }
  }

  return true;
};

const solveSudoku = (grid) => {
    const copy = grid.map(row =>
        row.map(cell => {
          const num = Number(cell);
          return isNaN(num) || num === 0 ? "" : num;
        })
      );
      

  const solve = () => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (copy[row][col] === "") {
          for (let num = 1; num <= 9; num++) {
            if (isSafe(copy, row, col, num)) {
              copy[row][col] = num;
              if (solve()) return true;
              copy[row][col] = "";
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  solve();
  return copy.map(row => row.map(String)); // convert to string for input compatibility
};

const GamePage = () => {
  const { selectedLevel, solvedCount, setSolvedCount } = useContext(GameContext);
  const [grid, setGrid] = useState(emptyGrid());
  const [originalPuzzle, setOriginalPuzzle] = useState(emptyGrid());
  const [checked, setChecked] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [resultText, setResultText] = useState("");
  const [shouldNavigateHome, setShouldNavigateHome] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedLevel) {
      navigate("/");
    } else {
      const puzzle = puzzles[selectedLevel][0];
      const filledGrid = puzzle.map(row =>
        row.map(cell => (cell === 0 || cell === "" ? "" : cell.toString()))
      );
      setGrid(filledGrid);
      setOriginalPuzzle(filledGrid);
    }
  }, [selectedLevel, navigate]);
  
  

  const isCorrect = () => {
    const hasAllDigits = (arr) => {
      const nums = new Set(arr);
      return nums.size === 9 && [...nums].every(n => n >= 1 && n <= 9);
    };

    for (let i = 0; i < 9; i++) {
      const row = grid[i].map(Number);
      const col = grid.map(row => Number(row[i]));
      if (!hasAllDigits(row) || !hasAllDigits(col)) return false;
    }

    for (let r = 0; r < 9; r += 3) {
      for (let c = 0; c < 9; c += 3) {
        const box = [];
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            box.push(Number(grid[r + i][c + j]));
          }
        }
        if (!hasAllDigits(box)) return false;
      }
    }

    return true;
  };

  const handleSubmit = () => {
    if (isCorrect()) {
      if (!checked) {
        setSolvedCount(prev => ({ ...prev, [selectedLevel]: prev[selectedLevel] + 1 }));
        setResultText("🎉 You solved it!");
      } else {
        setResultText("✅ Correct, but not counted because you used 'Check Answer'.");
      }
    } else {
      setResultText("❌ Incorrect. Try again!");
    }
    setShowResult(true);
    setShouldNavigateHome(true); // will go home after OK
  };

  const handleCheckAnswer = () => {
    const solved = solveSudoku(originalPuzzle);
    setGrid(solved);
    setChecked(true);
    setResultText("✅ Here's the correct solution!");
    setShowResult(true);
    setShouldNavigateHome(false); // stay on page
  };

  const handleReset = () => {
    const resetGrid = originalPuzzle.map(row => [...row]);
    setGrid(resetGrid);
    setChecked(false);
  };

  const handleCloseModal = () => {
    setShowResult(false);
    if (shouldNavigateHome) {
      navigate("/");
    }
  };

  return (
    <div className="game-page">
      <h2>Level: {selectedLevel}</h2>
      <SudokuGrid
        grid={grid}
        setGrid={setGrid}
        originalPuzzle={originalPuzzle}
      />
      <Controls
        onSubmit={handleSubmit}
        onCheck={handleCheckAnswer}
        onReset={handleReset}
      />
      {showResult && (
        <ResultModal
          message={resultText}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default GamePage;
