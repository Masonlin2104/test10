import React, { useState } from "react";
import styles from "./RegistrationForm.module.css";

const RegistrationForm: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userID, setUserID] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerForPromo, setRegisterForPromo] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (
      !firstName ||
      !lastName ||
      !userID ||
      !address ||
      !phoneNumber ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (registerForPromo && !promoCode) {
      setError("Please enter a promo code.");
      return;
    }

    setError("");

    // Logging all registration data
    console.log("Registering user:", {
      userID,
      firstName,
      middleName,
      lastName,
      address,
      phoneNumber,
      email,
      password,
      registerForPromo,
      promoCode,
    });

    //
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.heading}>Registration Form</h2>

      <form onSubmit={handleSubmit}>
        {/* User ID */}
        <div className={styles.inputGroup}>
          <label htmlFor="userID" className={styles.label}>User ID</label>
          <input
            id="userID"
            type="text"
            className={styles.input}
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
            placeholder="Enter a unique user ID"
          />
        </div>

        {/* First Name */}
        <div className={styles.inputGroup}>
          <label htmlFor="firstName" className={styles.label}>First Name</label>
          <input
            id="firstName"
            type="text"
            className={styles.input}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter your first name"
          />
        </div>

        {/* Middle Name */}
        <div className={styles.inputGroup}>
          <label htmlFor="middleName" className={styles.label}>Middle Name</label>
          <input
            id="middleName"
            type="text"
            className={styles.input}
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
            placeholder="Enter your middle name (optional)"
          />
        </div>

        {/* Last Name */}
        <div className={styles.inputGroup}>
          <label htmlFor="lastName" className={styles.label}>Last Name</label>
          <input
            id="lastName"
            type="text"
            className={styles.input}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter your last name"
          />
        </div>

        {/* Address */}
        <div className={styles.inputGroup}>
          <label htmlFor="address" className={styles.label}>Address</label>
          <input
            id="address"
            type="text"
            className={styles.input}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
          />
        </div>

        {/* Phone Number */}
        <div className={styles.inputGroup}>
          <label htmlFor="phoneNumber" className={styles.label}>Phone Number</label>
          <input
            id="phoneNumber"
            type="tel"
            className={styles.input}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your phone number"
          />
        </div>

        {/* Email */}
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

        {/* Password */}
        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>Password</label>
          <input
            id="password"
            type="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        {/* Confirm Password */}
        <div className={styles.inputGroup}>
          <label htmlFor="confirmPassword" className={styles.label}>Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            className={styles.input}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
          />
        </div>

        {/* Register for Promotions */}
        <div className={styles.checkboxGroup}>
          <input
            id="registerForPromo"
            type="checkbox"
            checked={registerForPromo}
            onChange={(e) => setRegisterForPromo(e.target.checked)}
          />
          <label htmlFor="registerForPromo" className={styles.checkboxLabel}>
            Register for Promotions
          </label>
        </div>

        {/* Promo Code (visible only when checkbox is checked) */}
        {registerForPromo && (
          <div className={styles.inputGroup}>
            <label htmlFor="promoCode" className={styles.label}>Promo Code</label>
            <input
              id="promoCode"
              type="text"
              className={styles.input}
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Enter your promo code"
            />
          </div>
        )}

        {/* Error Message */}
        {error && <p className={styles.errorMessage}>{error}</p>}

        <button type="submit" className={styles.submitButton}>Register</button>
        <p className={styles.smallText}>Already have an account? Login here.</p>
      </form>
    </div>
  );
};

export default RegistrationForm;
