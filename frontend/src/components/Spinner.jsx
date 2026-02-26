import React from "react";

function Spinner() {
  const spinnerStyle = {
    border: "6px solid #f3f3f3",
    borderTop: "6px solid #3498db",
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    animation: "spin 1s linear infinite",
    margin: "100px auto"
  };

  return <div style={spinnerStyle}></div>;
}

export default Spinner;