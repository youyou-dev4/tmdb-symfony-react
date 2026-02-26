import React from "react";

function Modal({ item, onClose }) {
  if (!item) return null;

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  };

  const modalStyle = {
    background: "white",
    color: "black",
    padding: "20px",
    borderRadius: "10px",
    width: "400px",
    maxHeight: "80vh",
    overflowY: "auto",
    textAlign: "center"
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <img
          src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
          alt={item.title || item.name}
          style={{ width: "200px", borderRadius: "8px" }}
        />

        <h2>{item.title || item.name}</h2>
        <p>⭐ {item.vote_average}</p>
        <p>{item.overview}</p>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Modal;