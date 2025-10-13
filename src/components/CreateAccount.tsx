// src/components/CreateForm.tsx
import React, { useState } from "react";
import styles from "./LoginForm.module.css";
import { createUser, type Role } from "../auth/userStore";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

const roleToHome: Record<Role, string> = {
  admin: "/AdminHomePage",
  //manager: "/manager",
  user: "/User",
};

const CreateAccount: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("user");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !confirm) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setError("");
      await createUser({ name, email, role, password });

      // optional: auto-login after register
      const user = await login(email, password);
      navigate(roleToHome[user.role], { replace: true });
    } catch (err: any) {
      setError(err?.message || "Unable to create account.");
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.heading}>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="name" className={styles.label}>Name</label>
          <input
            id="name"
            type="text"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input
            id="email"
            type="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="username"
          />
        </div>

        {/* <div className={styles.inputGroup}>
          <label htmlFor="role" className={styles.label}>Role</label>
          <select
            id="role"
            className={styles.input}
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
          >
            <option value="user">User</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        </div> */}

        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>Password</label>
          <input
            id="password"
            type="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
            autoComplete="new-password"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="confirm" className={styles.label}>Confirm Password</label>
          <input
            id="confirm"
            type="password"
            className={styles.input}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Confirm your password"
            autoComplete="new-password"
          />
        </div>

        {error && <p className={styles.errorMessage}>{error}</p>}

        <button type="submit" className={styles.submitButton}>Create Account</button>
      </form>
    </div>
  );
};

export default CreateAccount;
