import React, { useState, useEffect } from "react";
import styles from "./EditProfile.module.css";

const EditProfile: React.FC = () => {
  // Personal info
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [phoneNumber, setPhoneNumber] = useState("1234567890");

  // Home Address
  const [street, setStreet] = useState("123 Main St");
  const [city, setCity] = useState("Anytown");
  const [state, setState] = useState("CA");
  const [zipCode, setZipCode] = useState("12345");

  // Password
  const [changePassword, setChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  // UI
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // No redirect; page always shows
  }, []);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("Profile updated successfully! (Dummy info)");
    setTimeout(() => setSuccess(""), 3000);
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.heading}>Edit Profile</h2>

      {success && <p style={{ color: "green", textAlign: "center" }}>{success}</p>}

      <form onSubmit={handleUpdateProfile}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>First Name</label>
          <input
            type="text"
            className={styles.input}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Last Name</label>
          <input
            type="text"
            className={styles.input}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Email</label>
          <input
            type="email"
            className={styles.input}
            value={email}
            disabled
            style={{ backgroundColor: "#e0e0e0" }}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Phone Number</label>
          <input
            type="tel"
            className={styles.input}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <h3 style={{ marginTop: "20px", color: "#1e1e2f" }}>Home Address</h3>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Street</label>
          <input
            type="text"
            className={styles.input}
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>City</label>
          <input
            type="text"
            className={styles.input}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>State</label>
          <input
            type="text"
            className={styles.input}
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Zip Code</label>
          <input
            type="text"
            className={styles.input}
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </div>

        {/* Password section */}
        <div className={styles.checkboxGroup}>
          <input
            id="changePassword"
            type="checkbox"
            checked={changePassword}
            onChange={(e) => setChangePassword(e.target.checked)}
          />
          <label htmlFor="changePassword" className={styles.checkboxLabel}>
            Change Password
          </label>
        </div>

        {changePassword && (
          <>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Current Password</label>
              <input
                type="password"
                className={styles.input}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>New Password</label>
              <input
                type="password"
                className={styles.input}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Confirm New Password</label>
              <input
                type="password"
                className={styles.input}
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </div>
          </>
        )}

        <button type="submit" className={styles.submitButton}>
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
