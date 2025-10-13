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
      {/* <p className={styles.description}>{movie.genre}</p> */}

      {/* Optional: other metadata */}
      {/* <p className={styles.details}>
        <strong>Genre:</strong> {movie.genre} <br />
        <strong>Duration:</strong> {movie.duration} <br />
        <strong>Rating:</strong> {movie.rating}
      </p> */}

      <header className={"Showtimes"}>
        <h1>Showtimes</h1>
        <div>
          <Link to="/TicketSelection">
            <button className={styles.loginButton}>5:00</button>
          </Link>
          <Link to="/TicketSelection">
            <button className={styles.loginButton}>8:00</button>
          </Link>
          <Link to="/TicketSelection">
            <button className={styles.loginButton}>10:00</button>
          </Link>
        </div>
      </header>

    </div>
  );
};

export default MovieDetails;
