// src/components/PaymentMethodsPage.tsx
import React, { useState } from "react";
import styles from "./PaymentMethodsPage.module.css";

interface Address {
  id: string;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
}

interface PaymentMethod {
  id: string;
  nameOnCard: string;
  cardNumber: string;
  expirationMonth: string;
  expirationYear: string;
  cvv: string;
  billingAddress: Address;
  homeAddress: Address;
}

const PaymentMethodsPage: React.FC = () => {
  const emptyMethod = (): PaymentMethod => ({
    id: "",
    nameOnCard: "",
    cardNumber: "",
    expirationMonth: "",
    expirationYear: "",
    cvv: "",
    billingAddress: { id: "", streetAddress: "", city: "", state: "", zip: "" },
    homeAddress: { id: "", streetAddress: "", city: "", state: "", zip: "" },
  });

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([emptyMethod()]);
  const [error, setError] = useState("");

  const handleChange = (index: number, field: string, value: string) => {
    const updatedMethods = [...paymentMethods];

    switch (field) {
      // Billing Address
      case "billingStreet":
        updatedMethods[index].billingAddress.streetAddress = value;
        break;
      case "billingCity":
        updatedMethods[index].billingAddress.city = value;
        break;
      case "billingState":
        updatedMethods[index].billingAddress.state = value;
        break;
      case "billingZip":
        updatedMethods[index].billingAddress.zip = value;
        break;

      // Home Address
      case "homeStreet":
        updatedMethods[index].homeAddress.streetAddress = value;
        break;
      case "homeCity":
        updatedMethods[index].homeAddress.city = value;
        break;
      case "homeState":
        updatedMethods[index].homeAddress.state = value;
        break;
      case "homeZip":
        updatedMethods[index].homeAddress.zip = value;
        break;

      // Payment Method fields
      default:
        (updatedMethods[index] as any)[field] = value;
    }

    setPaymentMethods(updatedMethods);
  };

  const addPaymentMethod = () => {
    if (paymentMethods.length < 3) setPaymentMethods([...paymentMethods, emptyMethod()]);
  };

  const deletePaymentMethod = (index: number) => {
    const updatedMethods = [...paymentMethods];
    updatedMethods.splice(index, 1);
    setPaymentMethods(updatedMethods);
  };

  const handleSubmit = () => {
    for (const method of paymentMethods) {
      if (
        !method.nameOnCard ||
        !method.cardNumber ||
        !method.expirationMonth ||
        !method.expirationYear ||
        !method.billingAddress.streetAddress ||
        !method.billingAddress.city ||
        !method.billingAddress.state ||
        !method.billingAddress.zip ||
        !method.homeAddress.streetAddress ||
        !method.homeAddress.city ||
        !method.homeAddress.state ||
        !method.homeAddress.zip
      ) {
        setError("Please fill in all fields for all payment methods.");
        return;
      }
    }

    setError("");
    console.log("Payment methods submitted:", paymentMethods);
    // Backend team can hook into this console log:
    // e.g., send to API: fetch("/api/payment", { method: "POST", body: JSON.stringify(paymentMethods) })
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Payment Methods</h2>

      {paymentMethods.map((method, idx) => (
        <div key={idx} className={styles.methodCard}>
          <div className={styles.methodHeader}>
            <h3>Payment Method {idx + 1}</h3>
            {paymentMethods.length > 1 && (
              <button
                type="button"
                className={styles.deleteButton}
                onClick={() => deletePaymentMethod(idx)}
              >
                🗑
              </button>
            )}
          </div>

          {/* Card Info */}
          <div className={styles.inputGroup}>
            <label>Name on Card</label>
            <input
              type="text"
              value={method.nameOnCard}
              onChange={(e) => handleChange(idx, "nameOnCard", e.target.value)}
              placeholder="Name on Card"
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Card Number</label>
            <input
              type="text"
              value={method.cardNumber}
              onChange={(e) => handleChange(idx, "cardNumber", e.target.value)}
              placeholder="Card Number"
            />
          </div>

          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label>Expiration Month</label>
              <input
                type="text"
                value={method.expirationMonth}
                onChange={(e) => handleChange(idx, "expirationMonth", e.target.value)}
                placeholder="MM"
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Expiration Year</label>
              <input
                type="text"
                value={method.expirationYear}
                onChange={(e) => handleChange(idx, "expirationYear", e.target.value)}
                placeholder="YYYY"
              />
            </div>
          </div>

          {/* Billing Address */}
          <h3>Billing Address</h3>
          <div className={styles.inputGroup}>
            <label>Street Address</label>
            <input
              type="text"
              value={method.billingAddress.streetAddress}
              onChange={(e) => handleChange(idx, "billingStreet", e.target.value)}
              placeholder="Street Address"
            />
          </div>

          <div className={styles.row}>
            <div className={styles.inputGroupSmall}>
              <label>City</label>
              <input
                type="text"
                value={method.billingAddress.city}
                onChange={(e) => handleChange(idx, "billingCity", e.target.value)}
                placeholder="City"
              />
            </div>
            <div className={styles.inputGroupSmall}>
              <label>State</label>
              <input
                type="text"
                value={method.billingAddress.state}
                onChange={(e) => handleChange(idx, "billingState", e.target.value)}
                placeholder="State"
              />
            </div>
            <div className={styles.inputGroupSmall}>
              <label>ZIP</label>
              <input
                type="text"
                value={method.billingAddress.zip}
                onChange={(e) => handleChange(idx, "billingZip", e.target.value)}
                placeholder="ZIP"
              />
            </div>
          </div>

          {/* Home Address */}
          <h3>Home Address</h3>
          <div className={styles.inputGroup}>
            <label>Street Address</label>
            <input
              type="text"
              value={method.homeAddress.streetAddress}
              onChange={(e) => handleChange(idx, "homeStreet", e.target.value)}
              placeholder="Street Address"
            />
          </div>

          <div className={styles.row}>
            <div className={styles.inputGroupSmall}>
              <label>City</label>
              <input
                type="text"
                value={method.homeAddress.city}
                onChange={(e) => handleChange(idx, "homeCity", e.target.value)}
                placeholder="City"
              />
            </div>
            <div className={styles.inputGroupSmall}>
              <label>State</label>
              <input
                type="text"
                value={method.homeAddress.state}
                onChange={(e) => handleChange(idx, "homeState", e.target.value)}
                placeholder="State"
              />
            </div>
            <div className={styles.inputGroupSmall}>
              <label>ZIP</label>
              <input
                type="text"
                value={method.homeAddress.zip}
                onChange={(e) => handleChange(idx, "homeZip", e.target.value)}
                placeholder="ZIP"
              />
            </div>
          </div>
        </div>
      ))}

      {paymentMethods.length < 3 && (
        <button type="button" className={styles.addButton} onClick={addPaymentMethod}>
          Add Another Payment Method
        </button>
      )}

      {error && <p className={styles.error}>{error}</p>}

      {/* Button explicitly calls handleSubmit, not a <form> submit */}
      <button type="button" className={styles.submitButton} onClick={handleSubmit}>
        Save Payment Methods
      </button>
    </div>
  );
};

export default PaymentMethodsPage;
