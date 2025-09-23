// src/components/CheckoutForm.tsx

import React, { useState } from "react";
import styles from "./CheckoutForm.module.css";

const CheckoutForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!name || !email || !cardNumber) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");
    console.log("Checkout info:", { name, email, cardNumber });
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.heading}>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="name" className={styles.label}>Full Name</label>
          <input
            id="name"
            type="text"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input
            id="email"
            type="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="cardNumber" className={styles.label}>Card Number</label>
          <input
            id="cardNumber"
            type="text"
            className={styles.input}
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="Enter your card number"
          />
        </div>

        {error && <p className={styles.errorMessage}>{error}</p>}

        <button type="submit" className={styles.submitButton}>
          Complete Purchase
        </button>

        <p className={styles.smallText}>Your payment information is secure.</p>
      </form>
    </div>
  );
};

export default CheckoutForm;
