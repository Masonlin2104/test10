import React, { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./EditProfile.module.css";

interface PaymentCard {
  id: number;
  cardNumber: number;
  expirationMonth: number;
  expirationYear: number;
  nameOnCard?: string;
}

const EditProfile: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Personal info
  const [customerId, setCustomerId] = useState<number | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Home Address
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [hasAddress, setHasAddress] = useState(false);

  // Password
  const [changePassword, setChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  // Payment Methods
  const [paymentCards, setPaymentCards] = useState<PaymentCard[]>([]);
  const [showAddCard, setShowAddCard] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [cardName, setCardName] = useState("");
  const [billStreet, setBillStreet] = useState("");
  const [billCity, setBillCity] = useState("");
  const [billState, setBillState] = useState("");
  const [billZip, setBillZip] = useState("");

  // Promotions
  const [promoOptIn, setPromoOptIn] = useState(false);

  // UI
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    loadCustomerData();
  }, [user, navigate]);

  const loadCustomerData = async () => {
    try {
      // Fetch customer info
      const custResp = await fetch(`http://localhost:8080/customer/${user?.id || 1}`);
      if (!custResp.ok) throw new Error("Failed to load profile");
      
      const custData = await custResp.json();
      setCustomerId(custData.id);
      setFirstName(custData.firstName || "");
      setLastName(custData.lastName || "");
      setEmail(custData.email || "");
      setPhoneNumber(custData.phoneNumber?.toString() || "");

      // Fetch home address if exists
      if (custData.homeAddressId) {
        const addrResp = await fetch(`http://localhost:8080/customer/${custData.id}/home-address`);
        if (addrResp.ok) {
          const addr = await addrResp.json();
          setStreet(addr.streetAddress || "");
          setCity(addr.city || "");
          setState(addr.state || "");
          setZipCode(addr.zipCode?.toString() || "");
          setHasAddress(true);
        }
      }

      // Fetch payment methods
      const pmResp = await fetch(`http://localhost:8080/customer/${custData.id}/payment-methods`);
      if (pmResp.ok) {
        const cards = await pmResp.json();
        setPaymentCards(cards);
      }

      // Check promotion status
      setPromoOptIn(custData.customerStatusId === 2); // Assuming 2 means opted in

      setLoading(false);
    } catch (err: any) {
      setError(err.message || "Failed to load profile");
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!firstName || !lastName) {
      setError("First and last name are required");
      return;
    }

    if (changePassword) {
      if (!currentPassword || !newPassword || !confirmNewPassword) {
        setError("Please fill all password fields");
        return;
      }
      if (newPassword !== confirmNewPassword) {
        setError("New passwords do not match");
        return;
      }
      if (newPassword.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }
    }

    try {
      // Update basic info
      const updateResp = await fetch(`http://localhost:8080/customer/${customerId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          phoneNumber: phoneNumber ? parseInt(phoneNumber) : null
        })
      });
      if (!updateResp.ok) throw new Error("Failed to update profile");

      // Update home address
      if (street && city && state && zipCode) {
        const method = hasAddress ? "PUT" : "POST";
        const addrResp = await fetch(`http://localhost:8080/customer/${customerId}/home-address`, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            streetAddress: street,
            city,
            state,
            zipCode: parseInt(zipCode)
          })
        });
        if (!addrResp.ok) throw new Error("Failed to update address");
        setHasAddress(true);
      }

      // Update password
      if (changePassword && currentPassword && newPassword) {
        const pwResp = await fetch(`http://localhost:8080/customer/${customerId}/password`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ currentPassword, newPassword })
        });
        if (!pwResp.ok) throw new Error("Incorrect current password");
        
        setChangePassword(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      }

      setSuccess("Profile updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to update profile");
    }
  };

  const handleAddCard = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!cardNumber || !expMonth || !expYear || !cardName) {
      setError("Please fill all card details");
      return;
    }
    if (!billStreet || !billCity || !billState || !billZip) {
      setError("Please fill billing address");
      return;
    }

    try {
      const resp = await fetch(`http://localhost:8080/customer/${customerId}/payment-methods`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cardNumber,
          expirationMonth: parseInt(expMonth),
          expirationYear: parseInt(expYear),
          nameOnCard: cardName,
          billingAddressRequest: {
            streetAddress: billStreet,
            city: billCity,
            state: billState,
            zipCode: parseInt(billZip)
          }
        })
      });

      if (!resp.ok) throw new Error("Failed to add card");

      // Reset form
      setShowAddCard(false);
      setCardNumber("");
      setExpMonth("");
      setExpYear("");
      setCardName("");
      setBillStreet("");
      setBillCity("");
      setBillState("");
      setBillZip("");

      loadCustomerData();
      setSuccess("Payment card added successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to add card");
    }
  };

  const handleDeleteCard = async (cardId: number) => {
    if (!window.confirm("Delete this card?")) return;

    try {
      const resp = await fetch(`http://localhost:8080/customer/${customerId}/payment-methods/${cardId}`, {
        method: "DELETE"
      });
      if (!resp.ok) throw new Error("Failed to delete card");

      loadCustomerData();
      setSuccess("Card deleted successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to delete card");
    }
  };

  const maskCard = (num: number): string => {
    const str = num.toString();
    return `**** **** **** ${str.slice(-4)}`;
  };

  if (loading) return <div className={styles.formContainer}>Loading...</div>;

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.heading}>Edit Profile</h2>

      {error && <p className={styles.errorMessage}>{error}</p>}
      {success && <p style={{ color: "green", textAlign: "center" }}>{success}</p>}

      <form onSubmit={handleUpdateProfile}>
        {/* Basic Info */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>First Name *</label>
          <input
            type="text"
            className={styles.input}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Last Name *</label>
          <input
            type="text"
            className={styles.input}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Email (cannot be changed)</label>
          <input
            type="email"
            className={styles.input}
            value={email}
            disabled
            style={{ backgroundColor: "#e0e0e0", cursor: "not-allowed" }}
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

        {/* Home Address */}
        <h3 style={{ marginTop: "20px", color: "#1e1e2f" }}>Home Address</h3>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Street Address</label>
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

        {/* Password Change */}
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
              <label className={styles.label}>Current Password *</label>
              <input
                type="password"
                className={styles.input}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>New Password *</label>
              <input
                type="password"
                className={styles.input}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Confirm New Password *</label>
              <input
                type="password"
                className={styles.input}
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </div>
          </>
        )}

        {/* Promotions */}
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

        <button type="submit" className={styles.submitButton}>
          Update Profile
        </button>
      </form>

      {/* Payment Cards Section */}
      <div style={{ marginTop: "40px" }}>
        <h3 style={{ color: "#1e1e2f", marginBottom: "15px" }}>Payment Cards</h3>
        
        {paymentCards.length === 0 ? (
          <p style={{ color: "#666" }}>No payment cards on file</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {paymentCards.map((card) => (
              <div
                key={card.id}
                style={{
                  padding: "15px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <div>
                  <p style={{ margin: 0, fontWeight: "bold" }}>
                    {maskCard(card.cardNumber)}
                  </p>
                  <p style={{ margin: "5px 0 0 0", fontSize: "0.9rem", color: "#666" }}>
                    Expires: {card.expirationMonth}/{card.expirationYear}
                  </p>
                  {card.nameOnCard && (
                    <p style={{ margin: "5px 0 0 0", fontSize: "0.9rem", color: "#666" }}>
                      {card.nameOnCard}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handleDeleteCard(card.id)}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#e53935",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer"
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        {!showAddCard && (
          <button
            onClick={() => setShowAddCard(true)}
            style={{
              marginTop: "15px",
              padding: "10px 20px",
              backgroundColor: "#4caf50",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            + Add New Card
          </button>
        )}

        {showAddCard && (
          <form onSubmit={handleAddCard} style={{ marginTop: "20px", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
            <h4 style={{ marginTop: 0 }}>Add Payment Card</h4>
            
            <div className={styles.inputGroup}>
              <label className={styles.label}>Card Number *</label>
              <input
                type="text"
                className={styles.input}
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="1234567890123456"
                required
              />
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <div className={styles.inputGroup} style={{ flex: 1 }}>
                <label className={styles.label}>Exp Month *</label>
                <input
                  type="number"
                  className={styles.input}
                  value={expMonth}
                  onChange={(e) => setExpMonth(e.target.value)}
                  placeholder="12"
                  min="1"
                  max="12"
                  required
                />
              </div>
              <div className={styles.inputGroup} style={{ flex: 1 }}>
                <label className={styles.label}>Exp Year *</label>
                <input
                  type="number"
                  className={styles.input}
                  value={expYear}
                  onChange={(e) => setExpYear(e.target.value)}
                  placeholder="2025"
                  required
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Name on Card *</label>
              <input
                type="text"
                className={styles.input}
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                required
              />
            </div>

            <h4>Billing Address</h4>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Street *</label>
              <input
                type="text"
                className={styles.input}
                value={billStreet}
                onChange={(e) => setBillStreet(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>City *</label>
              <input
                type="text"
                className={styles.input}
                value={billCity}
                onChange={(e) => setBillCity(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>State *</label>
              <input
                type="text"
                className={styles.input}
                value={billState}
                onChange={(e) => setBillState(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Zip Code *</label>
              <input
                type="text"
                className={styles.input}
                value={billZip}
                onChange={(e) => setBillZip(e.target.value)}
                required
              />
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button type="submit" className={styles.submitButton}>
                Add Card
              </button>
              <button
                type="button"
                onClick={() => setShowAddCard(false)}
                style={{
                  padding: "12px 0",
                  backgroundColor: "#999",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  flex: 1
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditProfile;