import React from "react";
import MediaCard from "./Card";

function Section({ title, items, type, onItemClick }) {
  return (
    <div style={{ marginBottom: "40px" }}>
      <h2>{title}</h2>
      <div style={gridStyle}>
        {items.map((item) => (
          <MediaCard key={item.id} item={item} type={type} onClick={() => onItemClick(item)} />
        ))}
      </div>
    </div>
  );
}

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
  gap: "60px"
};

export default Section;