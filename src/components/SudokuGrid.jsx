import React, { useState, useEffect, useRef } from "react";
import SudokuCell from "./SudokuCell";

const SudokuGrid = ({ grid, setGrid, originalPuzzle }) => {
  const [selectedCell, setSelectedCell] = useState({ row: 0, col: 0 });
  const cellRefs = useRef(Array(9).fill(null).map(() => Array(9).fill(null)));

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      const { row, col } = selectedCell;
      if (e.key === "ArrowUp" && row > 0) setSelectedCell({ row: row - 1, col });
      if (e.key === "ArrowDown" && row < 8) setSelectedCell({ row: row + 1, col });
      if (e.key === "ArrowLeft" && col > 0) setSelectedCell({ row, col: col - 1 });
      if (e.key === "ArrowRight" && col < 8) setSelectedCell({ row, col: col + 1 });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCell]);

  const updateCell = (row, col, val) => {
    // Prevent overwriting original puzzle
    if (originalPuzzle[row][col] !== "") return;

    const newGrid = grid.map((r, i) =>
      r.map((cell, j) => (i === row && j === col ? val : cell))
    );
    setGrid(newGrid);
  };

  return (
    <div style={{ display: "inline-block", border: "2px solid #000" }}>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex" }}>
          {row.map((cell, colIndex) => (
            <SudokuCell
              key={`${rowIndex}-${colIndex}`}
              value={cell}
              row={rowIndex}
              col={colIndex}
              onChange={updateCell}
              isSelected={selectedCell.row === rowIndex && selectedCell.col === colIndex}
              onSelect={() => setSelectedCell({ row: rowIndex, col: colIndex })}
              inputRef={(el) => (cellRefs.current[rowIndex][colIndex] = el)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default SudokuGrid;
