import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Section from "../components/Section";
import Spinner from "../components/Spinner";
import Modal from "../components/Modal";

function Home() {
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchPage, setSearchPage] = useState(1);

  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchTopRated();
  }, []);

  const fetchTopRated = async () => {
    const moviesRes = await fetch("http://localhost:8000/api/movies?page=1");
    const moviesData = await moviesRes.json();
    setMovies(moviesData.data || []);

    const tvRes = await fetch("http://localhost:8000/api/tv?page=1");
    const tvData = await tvRes.json();
    setTvShows(tvData.data || []);

    setLoading(false);
  };

  const handleSearch = async (page = 1) => {
    if (!searchQuery) return;

    setHasSearched(true);
    setSearchLoading(true);
    setSearchPage(page);

    const res = await fetch(
      `http://localhost:8000/api/search?query=${encodeURIComponent(
        searchQuery
      )}&page=${page}`
    );

    const data = await res.json();
    setSearchResults(data.data || []);
    setSearchLoading(false);
  };

  if (loading) return <Spinner />;

  return (
    <div style={{ padding: "20px", background: "#121212", minHeight: "100vh", color: "white" }}>
      <h1>TMDB Explorer</h1>

      <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />

      {/* SEARCH BAR */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          if (e.target.value === "") setHasSearched(false);
        }}
        placeholder="Search..."
      />
      <button onClick={() => handleSearch(1)}>Search</button>

      {searchLoading && <Spinner />}

      {/* SEARCH RESULTS */}
      {hasSearched && !searchLoading && (
        <>
          <Section title={`Search Results - Page ${searchPage}`} items={searchResults} onItemClick={setSelectedItem} />

          <button disabled={searchPage === 1} onClick={() => handleSearch(searchPage - 1)}>
            Previous
          </button>

          <button onClick={() => handleSearch(searchPage + 1)}>
            Next
          </button>
        </>
      )}

      {/* TOP RATED */}
      {!hasSearched && (
        <>
          <Section title="Top Rated Movies" items={movies} onItemClick={setSelectedItem} />
          <button onClick={() => navigate("/movies")}>View More Movies</button>

          <Section title="Top Rated TV Shows" items={tvShows} onItemClick={setSelectedItem} />
          <button onClick={() => navigate("/tv")}>View More TV Shows</button>
        </>
      )}
    </div>
  );
}

export default Home;