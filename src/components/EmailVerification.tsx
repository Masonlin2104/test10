import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import styles from "./RegistrationConfrimation.module.css";

const EmailVerification: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verificationCode = searchParams.get("code");
    
    if (!verificationCode) {
      setStatus("error");
      setMessage("Invalid verification link");
      return;
    }

    // Call backend to verify
    fetch(`http://localhost:8080/customer/verify?code=${verificationCode}`)
      .then(async (response) => {
        const text = await response.text();
        
        if (response.ok) {
          setStatus("success");
          setMessage(text);
          
          // Redirect to login after 3 seconds
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          setStatus("error");
          setMessage(text || "Verification failed");
        }
      })
      .catch((err) => {
        setStatus("error");
        setMessage("Network error. Please try again.");
      });
  }, [searchParams, navigate]);

  return (
    <div className={styles.confirmationContainer}>
      {status === "loading" && (
        <>
          <h2 className={styles.heading}>Verifying Your Email...</h2>
          <p className={styles.message}>Please wait while we verify your account.</p>
        </>
      )}

      {status === "success" && (
        <>
          <h2 className={styles.heading}>Email Verified!</h2>
          <div style={{ textAlign: "center", padding: "20px" }}>
            <p style={{ fontSize: "3rem", color: "#4caf50", margin: "20px 0" }}>✓</p>
            <p className={styles.message} style={{ fontSize: "1.1rem", color: "#4caf50" }}>
              {message}
            </p>
            <p className={styles.message} style={{ marginTop: "20px" }}>
              Your account is now active and ready to use.
            </p>
            <p className={styles.message} style={{ fontSize: "0.9rem", color: "#666" }}>
              Redirecting to login page...
            </p>
            <button
              onClick={() => navigate("/login")}
              style={{
                marginTop: "20px",
                padding: "10px 30px",
                backgroundColor: "#f5c518",
                color: "#1e1e2f",
                border: "none",
                borderRadius: "8px",
                fontSize: "1rem",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Go to Login
            </button>
          </div>
        </>
      )}

      {status === "error" && (
        <>
          <h2 className={styles.heading}>Verification Failed</h2>
          <div style={{ textAlign: "center", padding: "20px" }}>
            <p style={{ fontSize: "3rem", color: "#ff6b6b", margin: "20px 0" }}>✗</p>
            <p className={styles.message} style={{ color: "#ff6b6b" }}>
              {message}
            </p>
            <p className={styles.message} style={{ marginTop: "20px", fontSize: "0.9rem" }}>
              Please contact support if you continue to have issues.
            </p>
            <button
              onClick={() => navigate("/login")}
              style={{
                marginTop: "20px",
                padding: "10px 30px",
                backgroundColor: "#f5c518",
                color: "#1e1e2f",
                border: "none",
                borderRadius: "8px",
                fontSize: "1rem",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Back to Login
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default EmailVerification;