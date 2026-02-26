import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import tmdbLogo from "../tmdb-logo.svg";

function Header() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "light";
  });

  useEffect(() => {
    if (isDark) {
      document.body.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.add("light");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?query=${query}`);
  };

  return (
    <header className="header">

      {/* Logo TMDB cliquable */}
      <img
        src={tmdbLogo}
        alt="TMDB Logo"
        className="header-logo-img"
        onClick={() => navigate("/")}
      />

      <div className="header-right">
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search movies or TV..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">Search</button>
        </form>

        <button
          className="theme-toggle"
          onClick={() => setIsDark(!isDark)}
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDark ? "☀️" : "🌙"}
        </button>
      </div>

    </header>
  );
}

export default Header;