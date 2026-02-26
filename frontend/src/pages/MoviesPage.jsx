import React, { useEffect, useState } from "react";
import Section from "../components/Section";
import Spinner from "../components/Spinner";
import Modal from "../components/Modal";

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(2);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies(page);
    }, [page]);

    
    const fetchMovies = async (pageNumber) => {
        try{
        setLoading(true);
        const res = await fetch(
        `http://localhost:8000/api/movies?page=${pageNumber}`
        );
        const data = await res.json();
        setMovies(data.data || []);
        setLoading(false);
        } catch (error) {
            console.error("Erreur fetch:", error);
            setLoading(false);
        }
    };

  return (
    <div style={{ padding: "20px", background: "#121212", minHeight: "100vh", color: "white" }}>
      <h1>All Movies - Page {page}</h1>

      <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />

        {loading ? (
        <Spinner />
        ) : (
        <Section items={movies} onItemClick={setSelectedItem} />
        )}

      <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>
        Previous
      </button>

      <button onClick={() => setPage(p => p + 1)}>
        Next
      </button>
    </div>
  );
}

export default MoviesPage;