// src/components/RegistrationConfirmation.tsx

import React from "react";
import styles from "./RegistrationConfrimation.module.css";

interface RegistrationConfirmationProps {
  name: string;
  email?: string;
}

const RegistrationConfirmation: React.FC<RegistrationConfirmationProps> = ({ name, email }) => {
  return (
    <div className={styles.confirmationContainer}>
      <h2 className={styles.heading}>Registration Successful!</h2>
      <p className={styles.message}>Thank you, <strong>{name}</strong>, for registering.</p>
      {email && <p className={styles.message}>A confirmation email has been sent to <strong>{email}</strong>.</p>}
    </div>
  );
};

export default RegistrationConfirmation;