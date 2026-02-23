import React from "react";

function MediaCard({ item, type }) {
  const title = type === "movie" ? item.title : item.name;

  return (
    <div style={cardStyle}>
      <img
        src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
        alt={title}
        style={{ width: "100%", borderRadius: "8px" }}
      />
      <h4>{title}</h4>
      <p>⭐ {item.vote_average}</p>
    </div>
  );
}

const cardStyle = {
  width: "150px",
  background: "#1e1e1e",
  color: "white",
  padding: "10px",
  borderRadius: "10px",
  textAlign: "center",
};

export default MediaCard;