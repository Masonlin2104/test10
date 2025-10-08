// src/components/MovieDetails.tsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./MovieDetails.module.css";

interface Movie {
  id: number;
  title: string;
  posterUrl: string;
  showTimes: string[];
}

const MovieDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const movie = location.state?.movie as Movie | undefined;

  if (!movie) {
    return <div className={styles.container}><p>Movie not found.</p></div>;
  }
  
  return (
    <div className={styles.container}>
      <h2>{movie.title}</h2>
      <img src={movie.posterUrl} alt={`${movie.title} poster`} className={styles.poster} />
      <h3>Showtimes:</h3>
      {movie.showTimes && movie.showTimes.length > 0 ? (
        <ul className={styles.showTimeList}>
          {movie.showTimes.map((time) => (
            <li key={time} className={styles.showTimeItem}>{time}</li>
          ))}
        </ul>
      ) : (
        <p>No showtimes available.</p>
      )}
      <button onClick={() => navigate(-1)} className={styles.backButton}>Back</button>
    </div>
  );
};

export default MovieDetails;