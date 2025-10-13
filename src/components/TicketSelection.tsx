// src/components/TicketSelection.tsx
/* TicketSelection movieTitle="Spider-Man: No Way Home" onConfirm={handleConfirm} 
*/

import React, { useState } from "react";
import styles from "./TicketSelection.module.css";

interface TicketSelectionProps {
  movieTitle: string;
  onConfirm: (tickets: number) => void;
}

const TicketSelection: React.FC<TicketSelectionProps> = ({ movieTitle, onConfirm }) => {
  const [tickets, setTickets] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(tickets);
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.heading}>Select Tickets for {movieTitle}</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Number of Tickets</label>
          <input
            type="number"
            min={1}
            max={10}
            value={tickets}
            onChange={(e) => setTickets(parseInt(e.target.value))}
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Confirm Tickets
        </button>
      </form>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Age of Tickets</label>
          <input
            type="number"
            min={1}
            max={10}
            value={tickets}
            onChange={(e) => setTickets(parseInt(e.target.value))}
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Confirm Tickets
        </button>
      </form>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Select Seats</label>
          <input
            type="number"
            min={1}
            max={10}
            value={tickets}
            onChange={(e) => setTickets(parseInt(e.target.value))}
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Confirm Tickets
        </button>
      </form>
    </div>
  );
};

export default TicketSelection;
