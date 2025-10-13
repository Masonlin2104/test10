// src/components/HomePage.tsx

import React, { useState } from "react";
import { sampleMovies as movies } from "../data/movies";
import { Movie } from "../models/Movie";
import styles from "./HomePage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const User: React.FC = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  // Filter movies based on search
  const filteredMovies: Movie[] = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  const currentlyRunning: Movie[] = filteredMovies.filter((movie) => movie.status === "running");
  const comingSoon: Movie[] = filteredMovies.filter((movie) => movie.status === "comingSoon");

  // Navigate to MovieDetails and pass the selected movie
  const handleBookMovie = (movie: Movie) => {
    navigate("/MovieDetails", { state: { movie } });
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>Cinema E-Booking System</h1>
        <div>
          {user && (
            <h2 className={styles.greeting}>
                Hello, {user.name}!
            </h2>
        )}
        </div>
      </header>

      {/* Search Bar */}
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {/* Currently Running Movies */}
      <section>
        <h2 className={styles.sectionTitle}>Currently Running</h2>
        <div className={styles.movieGrid}>
          {currentlyRunning.map((movie: Movie) => (
            <div key={movie.id} className={styles.movieCard}>
              <img src={movie.posterUrl} alt={movie.title} className={styles.poster} />
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

      {/* Coming Soon Movies */}
      <section style={{ marginTop: "40px" }}>
        <h2 className={styles.sectionTitle}>Coming Soon</h2>
        <div className={styles.movieGrid}>
          {comingSoon.map((movie: Movie) => (
            <div key={movie.id} className={styles.movieCard}>
              <img src={movie.posterUrl} alt={movie.title} className={styles.poster} />
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

export default User;