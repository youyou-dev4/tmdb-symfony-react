import React, { useEffect, useState } from "react";
import Section from "../components/Section";
import Spinner from "../components/Spinner";
import Modal from "../components/Modal";

function TvPage() {
  const [tvShows, setTvShows] = useState([]);
  const [page, setPage] = useState(2);
  const [selectedItem, setSelectedItem] = useState(null);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTv(page);
  }, [page]);

  const fetchTv = async (pageNumber) => {
    try{
        setLoading(true);
    const res = await fetch(
      `http://localhost:8000/api/tv?page=${pageNumber}`
    );
    const data = await res.json();
    setTvShows(data.data || []);
    } catch (error) {
            console.error("Erreur fetch:", error);
            setLoading(false);
        }
  };

  return (
    <div style={{ padding: "20px", background: "#121212", minHeight: "100vh", color: "white" }}>
      <h1>All TV Shows - Page {page}</h1>

      <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />

        {loading ? (
        <Spinner />
        ) : (
        <Section items={tvShows} onItemClick={setSelectedItem} />
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

export default TvPage;