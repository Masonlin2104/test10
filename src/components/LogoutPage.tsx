// src/components/LogoutPage.tsx
import React from "react";
import styles from "./LogoutPage.module.css";
import { useNavigate } from "react-router-dom";

const LogoutPage: React.FC = () => {
  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate("/home");
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.heading}>Logout Successful</h2>

      <p className={styles.message}>
        You have been successfully logged out.
        <br />
        Thank you for visiting our cinema!
      </p>

      <button onClick={handleReturnHome} className={styles.submitButton}>
        Return to Home Page
      </button>
    </div>
  );
};

export default LogoutPage;
