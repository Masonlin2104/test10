// src/components/LoginForm.tsx
import React, { useState, useEffect } from "react";
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
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  // Prefill email if saved in localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setError("");
      const user = await login(email, password);

      // Save email if Remember Me is checked
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      // Redirect to previous page if redirected here
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
            autoComplete="username"
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
            autoComplete="current-password"
          />
        </div>

        {/* Remember Me */}
        <div className={styles.checkboxGroup}>
          <input
            id="rememberMe"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="rememberMe" className={styles.checkboxLabel}>
            Remember Me
          </label>
        </div>

        {/* Error */}
        {error && <p className={styles.errorMessage}>{error}</p>}

        {/* Submit Button */}
        <button type="submit" className={styles.submitButton}>Login</button>

        {/* Forgot Password */}
        <p
          className={styles.linkText}
          onClick={() => navigate("/forgot-password")}
        >
          Forgot your password?
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
