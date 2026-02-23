import React from "react";
import MediaCard from "./Card";

function Section({ title, items, type }) {
  return (
    <div style={{ marginBottom: "40px" }}>
      <h2>{title}</h2>
      <div style={gridStyle}>
        {items.map((item) => (
          <MediaCard key={item.id} item={item} type={type} />
        ))}
      </div>
    </div>
  );
}

const gridStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
};

export default Section;