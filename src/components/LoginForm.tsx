// src/components/LoginForm.tsx
import React, { useState } from "react";
import styles from "./LoginForm.module.css";
import { useAuth } from "../auth/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const roleToHome: Record<string, string> = {
  admin: "/admin",
  manager: "/manager",
  user: "/user",
};

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation() as any;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setError("");
      const user = await login(email, password);

      // If user was redirected here, go back to where they came from,
      // otherwise route by role.
      const from = location.state?.from?.pathname as string | undefined;
      if (from) {
        navigate(from, { replace: true });
      } else {
        const dest = roleToHome[user.role] ?? "/user";
        navigate(dest, { replace: true });
      }
    } catch (err: any) {
      setError(err?.message || "Login failed");
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.heading}>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input
            id="email"
            type="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            autoComplete="username"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>Password</label>
          <input
            id="password"
            type="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            autoComplete="current-password"
          />
        </div>

        {error && <p className={styles.errorMessage}>{error}</p>}

        <button type="submit" className={styles.submitButton}>
          Login
        </button>

        <p className={styles.smallText}>Forgot your password?</p>
      </form>
    </div>
  );
};

export default LoginForm;
