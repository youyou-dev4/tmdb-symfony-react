import React, { useEffect, useState } from "react";
import Section from "./components/Section";

function App() {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.7)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000
  };

  const modalStyle = {
    background: "white",
    color: "black",
    padding: "20px",
    borderRadius: "10px",
    width: "400px",
    maxHeight: "80vh",
    overflowY: "auto",
    textAlign: "center"
  };

  const spinnerStyle = {
  border: "6px solid #f3f3f3",
  borderTop: "6px solid #3498db",
  borderRadius: "50%",
  width: "50px",
  height: "50px",
  animation: "spin 1s linear infinite",
  margin: "100px auto"
  };

  const noResultStyle = {
  textAlign: "center",
  fontSize: "24px",
  marginTop: "60px",
  fontWeight: "bold"
  };

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

    setHasSearched(true);
    setSearchLoading(true);        
    setSearchResults([]);          
    try {
      const res = await fetch(
        `http://localhost:8000/api/search?query=${encodeURIComponent(searchQuery)}`
      );
      const data = await res.json();

      setSearchResults(data.data || []);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setSearchLoading(false);     // 🔥 on arrête le spinner
    }
  };

  if (loading) return <div style={spinnerStyle}></div>;



  return (
    <div style={{ padding: "20px", background: "#121212", minHeight: "100vh", color: "white" }}>
      <h1>TMDB Explorer</h1>

      {selectedItem && (
        <div style={overlayStyle} onClick={() => setSelectedItem(null)}>
          <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
            
            <img
              src={`https://image.tmdb.org/t/p/w300${selectedItem.poster_path}`}
              alt={selectedItem.title || selectedItem.name}
              style={{ width: "200px", borderRadius: "8px" }}
            />

            <h2>{selectedItem.title || selectedItem.name}</h2>

            <p><strong>Note :</strong> ⭐ {selectedItem.vote_average}</p>

            <p style={{ marginTop: "10px" }}>
              {selectedItem.overview}
            </p>

            <button 
              onClick={() => setSelectedItem(null)}
              style={{ marginTop: "15px", padding: "8px" }}
            >
              Fermer
            </button>

          </div>
        </div>
      )}

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {setSearchQuery(e.target.value); if (e.target.value === "") {setHasSearched(false);setSearchResults([]);}}}
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

      {searchLoading && <div style={spinnerStyle}></div>}

      {hasSearched && !searchLoading && searchResults.length === 0 && (
        <div style={noResultStyle}>
          No results found.
        </div>
      )}

      {!hasSearched && (
        <>
          <Section
            title="Top Rated Movies"
            items={movies}
            type="movie"
            onItemClick={setSelectedItem}
          />
          <Section
            title="Top Rated TV Shows"
            items={tvShows}
            type="tv"
            onItemClick={setSelectedItem}
          />
        </>
      )}

      {hasSearched && !searchLoading && searchResults.length > 0 && (
        <Section
          title="Search Results"
          items={searchResults.filter(
            item => item.poster_path && (item.title || item.name)
          )}
          type="movie"
          onItemClick={setSelectedItem}
        />
      )}
    </div>
  );
}

export default App;