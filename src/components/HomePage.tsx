import React, { useEffect, useState } from "react";
import styles from "./HomePage.module.css";
import { Link, useNavigate } from "react-router-dom";

interface Movie {
  id: number;
  title: string;
  description: string;
  posterUrl: string;
  trailerUrl: string;
  status: string; // running / comingSoon
}

const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Fetch movies from backend
  useEffect(() => {
  fetch("http://localhost:8080/movies")
    .then((res) => res.json())
    .then((data) => {
      if (Array.isArray(data)) {
        setMovies(data);
      } else {
        console.warn("Unexpected data from backend:", data);
        setMovies([]); // fallback
      }
    })
    .catch((err) => {
      console.error("Error fetching movies:", err);
      setMovies([]); // prevent crash
    });
}, []);


  // Filter based on search
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  // Divide by status
  const currentlyRunning = filteredMovies.filter(
    (movie) => movie.status === "running"
  );
  const comingSoon = filteredMovies.filter(
    (movie) => movie.status === "comingSoon"
  );

  // Navigate to MovieDetails
  const handleBookMovie = (movie: Movie) => {
    navigate("/MovieDetails", { state: { movie } });
  };

  return (
    <div className={styles.container}>
      {/* ===== Header ===== */}
      <header className={styles.header}>
        <h1 className={styles.title}>Cinema E-Booking System</h1>
        <div>
          <Link to="/login">
            <button className={styles.loginButton}>Login</button>
          </Link>
          <Link to="/CreateAccount">
            <button className={styles.createButton}>Create Account</button>
          </Link>
        </div>
      </header>

      {/* ===== Search Bar ===== */}
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {/* ===== Currently Running Movies ===== */}
      <section>
        <h2 className={styles.sectionTitle}>Currently Running</h2>
        <div className={styles.movieGrid}>
          {currentlyRunning.map((movie) => (
            <div key={movie.id} className={styles.movieCard}>
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className={styles.poster}
              />
              <div className={styles.movieInfo}>
                <h3 className={styles.movieTitle}>{movie.title}</h3>
                <iframe
                  src={movie.trailerUrl}
                  title={movie.title}
                  className={styles.trailer}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <button
                  className={styles.bookButton}
                  onClick={() => handleBookMovie(movie)}
                >
                  Book Movie
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Coming Soon Movies ===== */}
      <section style={{ marginTop: "40px" }}>
        <h2 className={styles.sectionTitle}>Coming Soon</h2>
        <div className={styles.movieGrid}>
          {comingSoon.map((movie) => (
            <div key={movie.id} className={styles.movieCard}>
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className={styles.poster}
              />
              <div className={styles.movieInfo}>
                <h3 className={styles.movieTitle}>{movie.title}</h3>
                <iframe
                  src={movie.trailerUrl}
                  title={movie.title}
                  className={styles.trailer}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <button
                  className={styles.bookButton}
                  onClick={() => handleBookMovie(movie)}
                >
                  Book Movie
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
