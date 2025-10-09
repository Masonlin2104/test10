import React from "react";
import { Movie } from "../models/Movie";
import { sampleMovies } from "../data/movies";
import styles from "./AdminManageMovies.module.css";

const AdminManageMovies: React.FC = () => {
  const handleEdit = (movie: Movie) => {
    console.log("Editing movie:", movie.title);
    // Add edit functionality here
  };

  const handleDelete = (movie: Movie) => {
    console.log("Deleting movie:", movie.title);
    // Add delete functionality here
  };

  return (
    <div className={styles.listContainer}>
      {/* Heading box above grid */}
      <h2 className={styles.listHeading}>Admin: Manage Movies</h2>

      <div className={styles.movieGrid}>
        {sampleMovies.map((movie) => (
          <div key={movie.id} className={styles.movieCard}>
            <img src={movie.posterUrl} alt={movie.title} className={styles.poster} />
            <div className={styles.movieInfo}>
              <h3 className={styles.movieTitle}>{movie.title}</h3>
              <button
                className={`${styles.actionButton} ${styles.editButton}`}
                onClick={() => handleEdit(movie)}
              >
                Edit
              </button>
              <button
                className={`${styles.actionButton} ${styles.deleteButton}`}
                onClick={() => handleDelete(movie)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminManageMovies;
