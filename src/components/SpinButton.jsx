import React from "react";

const SpinButton = ({ isSpinning, onClick }) => {
  return (
    <button type="button" className="btn spin-btn" onClick={onClick}>
      {isSpinning ? "Stop" : "Spin"}
    </button>
  );
};

export default SpinButton;
