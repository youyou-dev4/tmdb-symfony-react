import React, { useEffect, useState } from "react";
import Section from "./components/Section";

function App() {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moviesRes = await fetch("http://localhost:8000/api/movies");
        const moviesData = await moviesRes.json();
        setMovies(moviesData.data || []);

        const tvRes = await fetch("http://localhost:8000/api/tv");
        const tvData = await tvRes.json();
        setTvShows(tvData.data || []);

        setLoading(false);
      } catch (error) {
        console.error("Erreur fetch:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = async () => {
      if (!searchQuery) return;

      try {
        const res = await fetch(
          `http://localhost:8000/api/search?query=${encodeURIComponent(searchQuery)}`
        );
        const data = await res.json();
        setSearchResults(data.data || []);
      } catch (error) {
        console.error("Search error:", error);
      }
    };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px", background: "#121212", minHeight: "100vh", color: "white" }}>
      <h1>TMDB Explorer</h1>

      <div style={{ marginBottom: "20px" }}>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Rechercher un film ou une série..."
        style={{ padding: "8px", width: "250px" }}
      />
      <button
        onClick={handleSearch}
        style={{ padding: "8px", marginLeft: "10px" }}
      >
        Rechercher
      </button>
    </div>

          {searchResults.length > 0 ? (
      <Section
        title="Search Results"
        items={searchResults.filter(
          item => item.poster_path && (item.title || item.name)
        )}
        type="movie"
      />
    ) : (
      <>
        <Section title="Top Rated Movies" items={movies} type="movie" />
        <Section title="Top Rated TV Shows" items={tvShows} type="tv" />
      </>
    )}
    </div>
  );
}

export default App;