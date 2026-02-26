import React from "react";

function Pagination({ page, totalPages, onPageChange }) {

  const pages = [];
  for (let i = Math.max(1, page - 2); i <= Math.min(totalPages, page + 2); i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">

      <button
        className="pagination-btn"
        disabled={page === 1}              
        onClick={() => onPageChange(page - 1)}
      >
        ← Previous
      </button>

      {pages.map((p) => (
        <button
          key={p}
          className={`pagination-btn ${p === page ? "pagination-btn--active" : ""}`}
          onClick={() => onPageChange(p)}
        >
          {p}
        </button>
      ))}

      <button
        className="pagination-btn"
        disabled={page === totalPages}      
        onClick={() => onPageChange(page + 1)}
      >
        Next →
      </button>

    </div>
  );
}

export default Pagination;