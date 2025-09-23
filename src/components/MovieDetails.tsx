// src/components/MovieDetails.tsx
/* movie={sampleMovies[0]} */

import React from "react";
import { Movie } from "../models/Movie";
import styles from "./MovieDetails.module.css";

interface MovieDetailsProps {
  movie: Movie; // single movie prop
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{movie.title}</h2>
      <img src={movie.posterUrl} alt={movie.title} className={styles.poster} />
      <iframe
        src={movie.trailerUrl}
        title={movie.title}
        className={styles.trailer}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      {movie.description && <p className={styles.description}>{movie.description}</p>}
    </div>
  );
};

export default MovieDetails;
