import React from "react";

const ResultModal = ({ message, onClose }) => {
  return (
    <div style={modalOverlay}>
      <div style={modalBox}>
        <p>{message}</p>
        <button onClick={onClose} style={{ marginTop: "10px" }}>OK</button>
      </div>
    </div>
  );
};

const modalOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  height: "100%",
  width: "100%",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const modalBox = {
  background: "#fff",
  padding: "20px",
  borderRadius: "8px",
  textAlign: "center"
};

export default ResultModal;
