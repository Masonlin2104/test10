import React, { useState } from "react";
import styles from "./ForgotPassword.module.css";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.heading}>Forgot Password</h2>

      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Enter your email address
            </label>
            <input
              type="email"
              id="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Send Reset Link
          </button>
        </form>
      ) : (
        <p className={styles.message}>
          If an account with that email exists, a password reset link has been sent.
        </p>
      )}

      <p className={styles.linkText} onClick={() => (window.location.href = "/login")}>
        Return to Login
      </p>
    </div>
  );
};

export default ForgotPassword;
