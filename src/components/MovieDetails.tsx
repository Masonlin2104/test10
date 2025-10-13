import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Movie } from "../models/Movie";
import styles from "./MovieDetails.module.css";


const MovieDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const movie = location.state?.movie as Movie;

  if (!movie) {
    return <p>Movie not found. Please go back.</p>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{movie.title}</h2>
      <img src={movie.posterUrl} alt={`${movie.title} poster`} className={styles.poster} />

      {/* ✅ Add your unique movie description */}
      <p className={styles.description}>{movie.description}</p>

      {/* Optional: other metadata */}
      {/* <p className={styles.details}>
        <strong>Genre:</strong> {movie.genre} <br />
        <strong>Duration:</strong> {movie.duration} <br />
        <strong>Rating:</strong> {movie.rating}
      </p> */}

      <h3>Showtimes:</h3>
      {movie.showtimes && movie.showtimes.length > 0 ? (
        <ul className={styles.showTimeList}>
          {movie.showtimes.map((time) => (
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
