import React from "react";
import Card from "./Card";

function Section({ title, items, onItemClick }) {

  
  return (
    <div className="section">

      <h2 className="section-title">{title}</h2>

      <div className="section-grid">
        {items.map((item) => (
          
          <Card
            key={item.id}
            item={item}
            onClick={() => onItemClick(item)}
          />
        ))}
      </div>

    </div>
  );
}

export default Section;