import React, { useEffect, useRef } from "react";

const SudokuCell = ({
  value,
  onChange,
  row,
  col,
  isSelected,
  onSelect,
  inputRef,
}) => {
  const localRef = useRef(null);

  // Auto-focus if this is the selected cell
  useEffect(() => {
    if (isSelected && localRef.current) {
      localRef.current.focus();
    }
  }, [isSelected]);

  const handleInput = (e) => {
    const input = e.target.value;
    if (/^[1-9]?$/.test(input)) {
      onChange(row, col, input);
    }
  };

  return (
    <input
      type="text"
      maxLength={1}
      value={value}
      onChange={handleInput}
      onClick={onSelect}
      ref={(el) => {
        localRef.current = el;
        if (inputRef) inputRef(el); // pass reference to parent grid
      }}
      className="cell"
      style={{
        width: "40px",
        height: "40px",
        textAlign: "center",
        fontSize: "20px",
        border: isSelected ? "2px solid #007bff" : "1px solid #999",
        outline: "none",
        boxSizing: "border-box",
        backgroundColor: isSelected ? "#e8f0fe" : "#fff",
      }}
    />
  );
};

export default SudokuCell;
