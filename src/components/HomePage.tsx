// src/components/HomePage.tsx

import React, { useState } from "react";
import { sampleMovies } from "../data/movies";
import { Movie } from "../models/Movie";
import styles from "./HomePage.module.css";
import {Link} from "react-router-dom"



const HomePage: React.FC = () => {
  const [search, setSearch] = useState("");

  // Filter movies based on search
  const filteredMovies: Movie[] = sampleMovies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  const currentlyRunning: Movie[] = filteredMovies.filter((movie) => movie.status === "running");
  const comingSoon: Movie[] = filteredMovies.filter((movie) => movie.status === "comingSoon");

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>Cinema E-Booking System</h1>
        <Link to="/login">
          <button className={styles.loginButton}>Login</button>
        </Link>
        
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
                <button className={styles.bookButton}>Book Movie</button>
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
                <button className={styles.bookButton}>Book Movie</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
