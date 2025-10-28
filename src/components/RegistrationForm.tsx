import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RegistrationForm.module.css";

const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  
  // Form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerForPromo, setRegisterForPromo] = useState(false);
  const [promoRegisterOptIn, setPromoRegisterOptIn] = useState(false); // new checkbox
  const [promoCode, setPromoCode] = useState(""); // input for new checkbox
  const [promoOptIn, setPromoOptIn] = useState(false);
  
  // UI state
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateForm = (): boolean => {
    // Required fields validation
    if (!firstName.trim()) {
      setError("First name is required");
      return false;
    }
    if (!lastName.trim()) {
      setError("Last name is required");
      return false;
    }
    if (!email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!phoneNumber.trim()) {
      setError("Phone number is required");
      return false;
    }
    if (!password) {
      setError("Password is required");
      return false;
    }
    if (!confirmPassword) {
      setError("Please confirm your password");
      return false;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }

    // Phone number validation (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setError("Phone number must be 10 digits");
      return false;
    }

    // Password validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }

    // Password match validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validate form
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/customer/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim().toLowerCase(),
          phoneNumber: parseInt(phoneNumber),
          password: password,
          // Note: Promotion preference is handled by customerStatusId on backend
          // You could add a field to RegisterRequest.java if you want to handle it differently
        }),
      });

      const data = await response.text();

      if (!response.ok) {
        throw new Error(data || "Registration failed");
      }

      // Success!
      setSuccess(true);
      
      // Show success message for 3 seconds then redirect to login
      setTimeout(() => {
        navigate("/login");
      }, 3000);

    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={styles.formContainer}>
        <h2 className={styles.heading}>Registration Successful!</h2>
        <div style={{ textAlign: "center", padding: "20px" }}>
          <p style={{ fontSize: "1.1rem", marginBottom: "15px", color: "#4caf50" }}>
            ✓ Your account has been created successfully!
          </p>
          <p style={{ marginBottom: "10px" }}>
            A verification email has been sent to:
          </p>
          <p style={{ fontWeight: "bold", marginBottom: "20px" }}>
            {email}
          </p>
          <p style={{ fontSize: "0.9rem", color: "#666" }}>
            Please check your email and click the verification link to activate your account.
          </p>
          <p style={{ fontSize: "0.9rem", color: "#666", marginTop: "20px" }}>
            Redirecting to login page...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.heading}>Create Your Account</h2>

      <form onSubmit={handleSubmit}>
        {/* First Name */}
        <div className={styles.inputGroup}>
          <label htmlFor="firstName" className={styles.label}>
            First Name <span style={{ color: "red" }}>*</span>
          </label>
          <input
            id="firstName"
            type="text"
            className={styles.input}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter your first name"
            disabled={loading}
          />
        </div>

        {/* Last Name */}
        <div className={styles.inputGroup}>
          <label htmlFor="lastName" className={styles.label}>
            Last Name <span style={{ color: "red" }}>*</span>
          </label>
          <input
            id="lastName"
            type="text"
            className={styles.input}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter your last name"
            disabled={loading}
          />
        </div>

        {/* Email */}
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            Email <span style={{ color: "red" }}>*</span>
          </label>
          <input
            id="email"
            type="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            disabled={loading}
          />
        </div>

        {/* Phone Number */}
        <div className={styles.inputGroup}>
          <label htmlFor="phoneNumber" className={styles.label}>
            Phone Number <span style={{ color: "red" }}>*</span>
          </label>
          <input
            id="phoneNumber"
            type="tel"
            className={styles.input}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
            placeholder="10-digit phone number"
            maxLength={10}
            disabled={loading}
          />
        </div>

        {/* Password */}
        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>
            Password <span style={{ color: "red" }}>*</span>
          </label>
          <input
            id="password"
            type="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            disabled={loading}
          />
        </div>

        {/* Confirm Password */}
        <div className={styles.inputGroup}>
          <label htmlFor="confirmPassword" className={styles.label}>
            Confirm Password <span style={{ color: "red" }}>*</span>
          </label>
          <input
            id="confirmPassword"
            type="password"
            className={styles.input}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            disabled={loading}
          />
        </div>

        {/* Manage Promotions & Dropdown */}
        <div className={styles.checkboxRow}>
          <div className={styles.checkboxGroup}>
          <input
            id="promoOptIn"
            type="checkbox"
            checked={promoOptIn}
            onChange={(e) => setPromoOptIn(e.target.checked)}
          />
          <label htmlFor="promoOptIn" className={styles.checkboxLabel}>
            Register for Promotions
          </label>
        </div>

        {promoOptIn && (
          <div className={styles.inputGroup}>
            <label className={styles.label}>Promo Code</label>
            <input
              type="text"
              className={styles.input}
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Enter promo code"
            />
          </div>
        )}


          {/* Edit Payment Methods button */}
          <button
            type="button"
            
            className={styles.paymentButton}
            onClick={() => navigate("/PaymentMethodsPage")}
          >
            Edit Payment Methods
          </button>
        </div>

        {/* Error Message */}
        {error && <p className={styles.errorMessage}>{error}</p>}

        {/* Submit Button */}
        <button 
          type="submit" 
          className={styles.submitButton}
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Register"}
        </button>

        <p className={styles.smallText}>
          Already have an account?{" "}
          <span
            style={{ color: "#f5c518", cursor: "pointer", textDecoration: "underline" }}
            onClick={() => !loading && navigate("/login")}
          >
            Login here
          </span>
        </p>
      </form>
    </div>
  );
};

export default RegistrationForm;