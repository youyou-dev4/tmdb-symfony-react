import React from "react";

function Modal({ item, onClose }) {
  if (!item) return null;

  const title = item.title || item.name;
  const rating = item.vote_average?.toFixed(1);

  return (
    <div className="modal-overlay" onClick={onClose}>

      <div className="modal-box" onClick={(e) => e.stopPropagation()}>

        <img
          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
          alt={title}
          className="modal-img"
        />

        <div className="modal-content">
          <h2 className="modal-title">{title}</h2>
          <span className="modal-rating">⭐ {rating}</span>
          <p className="modal-overview">{item.overview}</p>

          <button className="modal-close-btn" onClick={onClose}>
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

export default Modal;