import React, { useEffect, useState } from "react";
import Section from "./components/Section";

function App() {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px", background: "#121212", minHeight: "100vh", color: "white" }}>
      <h1>TMDB Explorer</h1>

      <Section title="Top Rated Movies" items={movies} type="movie" />
      <Section title="Top Rated TV Shows" items={tvShows} type="tv" />
    </div>
  );
}

export default App;