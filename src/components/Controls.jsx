import React from "react";

const Controls = ({ onSubmit, onCheck, onReset }) => {
  return (
    <div style={{ marginTop: "20px" }}>
      <button onClick={onSubmit} style={btnStyle}>Submit</button>
      <button onClick={onCheck} style={btnStyle}>Check Answer</button>
      <button onClick={onReset} style={btnStyle}>Reset</button>
    </div>
  );
};

const btnStyle = {
  margin: "0 10px",
  padding: "10px 15px",
  fontSize: "16px",
  cursor: "pointer"
};

export default Controls;
