import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Section from "../components/Section";
import Spinner from "../components/Spinner";
import Modal from "../components/Modal";
import Pagination from "../components/Pagination";

function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (!query) return;
    const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:8000/api/search?query=${encodeURIComponent(query)}&page=${page}`
      );
      const data = await res.json();
      setResults(data.results || []);
      setTotalPages(data.total_pages || 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
  }, [query, page]);

  

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page, query]);

  return (
    <div className="page">

      <div className="page-header">
        <h1 className="page-title">
          Results for <span className="page-query">"{query}"</span>
        </h1>
      </div>

      <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />

      {loading ? (
        <Spinner />
      ) : results.length === 0 ? (
        <p className="no-results">No results found for "{query}".</p>
      ) : (
        <>
          <Section items={results} onItemClick={setSelectedItem} />
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}

    </div>
  );
}

export default SearchPage;