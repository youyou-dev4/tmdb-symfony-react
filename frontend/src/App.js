import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MoviesPage from "./pages/MoviesPage";
import TvPage from "./pages/TvPage";
import Header from "./components/Header";
import SearchPage from "./pages/SearchPage";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/tv" element={<TvPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;