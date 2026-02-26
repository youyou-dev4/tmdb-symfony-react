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
  const [selectedItem, setSelectedItem] = useState(null);
  const [heroItem, setHeroItem] = useState(null);

  useEffect(() => {
  const fetchData = async () => {
      try {
        const [moviesRes, tvRes] = await Promise.all([
          fetch("http://localhost:8000/api/movies?page=1"),
          fetch("http://localhost:8000/api/tv?page=1"),
        ]);

        const moviesData = await moviesRes.json();
        const tvData = await tvRes.json();

        const movies = moviesData.results ?? [];
        const tvShows = tvData.results ?? [];

        setMovies(movies);
        setTvShows(tvShows);

        if (movies.length > 0) {
          const randomMovie =
            movies[Math.floor(Math.random() * movies.length)];
          setHeroItem(randomMovie);
        }

      } catch (error) {
        console.error("Erreur lors du fetch :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  

  if (loading) return <Spinner />;

  return (
    <div className="home">

      <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />

      {heroItem && (
        <div
          className="hero"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w1280${heroItem.backdrop_path})`
          }}
        >
          <div className="hero-overlay">

            <div className="hero-content">
              <p className="hero-label">⭐ Top Rated</p>

              {/*Présentation de site*/}
              <div className="hero-intro">
                <p>
                  Discover the <span>best rated movies and TV shows</span> from around the world. 
                  Browse top titles, explore details, and search any movie or series instantly.
                </p>
              </div>

              <h1 className="hero-title">
                {heroItem.title}
              </h1>
              <p className="hero-subtitle">
                {/* On limite 160 caractères pour pas surcharger */}
                {heroItem.overview?.slice(0, 160)}...
              </p>

              <div className="hero-actions">
                {/* Ouvre la modal du film */}
                <button
                  className="hero-btn-primary"
                  onClick={() => setSelectedItem(heroItem)}
                >
                  ▶ More Details
                </button>

                {/* Va vers la page des films */}
                <button
                  className="hero-btn-secondary"
                  onClick={() => navigate("/movies")}
                >
                  Browse All Movies
                </button>
              </div>
            </div>

          </div>
        </div>
      )}


      {/*Section film*/}
      <div className="home-section">
        <Section title="Top Rated Movies" items={movies} onItemClick={setSelectedItem} />
        <div className="home-btn-wrapper">
          <button className="btn-more" onClick={() => navigate("/movies")}>
            View More Movies
          </button>
        </div>
      </div>

      {/* ---- Section Séries ---- */}
      <div className="home-section">
        <Section title="Top Rated TV Shows" items={tvShows} onItemClick={setSelectedItem} />
        <div className="home-btn-wrapper">
          <button className="btn-more" onClick={() => navigate("/tv")}>
            View More TV Shows
          </button>
        </div>
      </div>

    </div>
  );
}

export default Home;