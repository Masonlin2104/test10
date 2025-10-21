import React, { useState, useEffect } from "react";
import styles from "./EditProfile.module.css";

const EditProfile: React.FC = () => {
  const [userID, setUserID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [changePassword, setChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [promoOptIn, setPromoOptIn] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchedUser = {
      userID: "12345",
      firstName: "John",
      middleName: "M",
      lastName: "Doe",
      email: "john.doe@example.com",
      address: "123 Main St",
      phone: "555-1234",
      changePassword: false,
      promoOptIn: true,
      promoCode: "WELCOME10",
    };

    setUserID(fetchedUser.userID);
    setFirstName(fetchedUser.firstName);
    setMiddleName(fetchedUser.middleName);
    setLastName(fetchedUser.lastName);
    setEmail(fetchedUser.email);
    setAddress(fetchedUser.address);
    setPhone(fetchedUser.phone);
    setChangePassword(fetchedUser.changePassword);
    setPromoOptIn(fetchedUser.promoOptIn);
    setPromoCode(fetchedUser.promoCode);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName || !address || !phone) {
      setError("Please fill in all mandatory fields.");
      return;
    }

    if (changePassword) {
      if (!currentPassword) {
        setError("Please enter your current password to change it.");
        return;
      }
      if (!newPassword || !confirmNewPassword) {
        setError("Please fill in both new password fields.");
        return;
      }
      if (newPassword !== confirmNewPassword) {
        setError("New passwords do not match.");
        return;
      }
    }

    setError("");
    console.log("Updated profile info:", {
      userID,
      firstName,
      middleName,
      lastName,
      email,
      address,
      phone,
      changePassword,
      currentPassword,
      newPassword,
      confirmNewPassword,
      promoOptIn,
      promoCode,
    });
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.heading}>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>User ID</label>
          <input
            type="text"
            className={styles.input}
            value={userID}
            readOnly
            placeholder="User ID"
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>First Name</label>
          <input
            type="text"
            className={styles.input}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter first name"
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Middle Name</label>
          <input
            type="text"
            className={styles.input}
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
            placeholder="Enter middle name (optional)"
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Last Name</label>
          <input
            type="text"
            className={styles.input}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter last name"
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Email</label>
          <input
            type="email"
            className={styles.input}
            value={email}
            readOnly
            placeholder="Email"
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Address</label>
          <input
            type="text"
            className={styles.input}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Phone Number</label>
          <input
            type="text"
            className={styles.input}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
          />
        </div>

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
                placeholder="Enter current password"
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>New Password</label>
              <input
                type="password"
                className={styles.input}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Confirm New Password</label>
              <input
                type="password"
                className={styles.input}
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                placeholder="Confirm new password"
              />
            </div>
          </>
        )}

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

        {error && <p className={styles.errorMessage}>{error}</p>}

        <button type="submit" className={styles.submitButton}>
          Update Profile
        </button>

        <p className={styles.smallText}>
          <a href="/forgot-password" className={styles.forgotPassword}>
            Forgot Password?
          </a>
        </p>
      </form>
    </div>
  );
};

export default EditProfile;
