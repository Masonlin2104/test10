// src/components/MovieList.tsx
/* MovieList movies={sampleMovies} */

import React from "react";
import { Movie } from "../models/Movie";
import styles from "./MovieList.module.css";

interface MovieListProps {
  movies: Movie[];
  onBook?: (movie: Movie) => void; 
}

const MovieList: React.FC<MovieListProps> = ({ movies, onBook }) => {
  return (
    <div className={styles.listContainer}>
      {/* Heading above the movie grid */}
      <h2 className={styles.listHeading}>Movie List</h2>

      <div className={styles.movieGrid}>
        {movies.map((movie) => (
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
                onClick={() => onBook && onBook(movie)}
              >
                Book Movie
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;