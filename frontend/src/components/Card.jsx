import React from "react";

function Card({ item, onClick }) {
  const title = item.title || item.name;
  const rating = item.vote_average?.toFixed(1);

  return (
    <div className="card" onClick={onClick}>

      <div className="card-img-wrapper">
        <img
          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
          alt={title}
          className="card-img"
        />
        <span className="card-badge">⭐ {rating}</span>
      </div>

      <div className="card-info">
        <h4 className="card-title">{title}</h4>
      </div>

    </div>
  );
}

export default Card;