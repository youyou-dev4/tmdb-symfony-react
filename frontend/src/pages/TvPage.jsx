import React, { useEffect, useState } from "react";
import Section from "../components/Section";
import Spinner from "../components/Spinner";
import Modal from "../components/Modal";
import Pagination from "../components/Pagination";

function TvPage() {
  const [tvShows, setTvShows] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchTv = async (pageNumber) => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:8000/api/tv?page=${pageNumber}`);
        const data = await res.json();
        setTvShows(data.results || []);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Erreur fetch:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTv(page);
  }, [page]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  

  return (
    <div className="page">

      <div className="page-header">
        <h1 className="page-title">Top Rated TV Shows</h1>
      </div>

      <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />

      {loading ? (
        <Spinner />
      ) : (
        <Section items={tvShows} onItemClick={setSelectedItem} />
      )}

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

    </div>
  );
}

export default TvPage;