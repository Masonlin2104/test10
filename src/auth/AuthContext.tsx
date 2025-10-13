import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { loginAPI, type User, type Role } from "./auth";

type Ctx = {
  user: User | null;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
  hasRole: (roles: Role | Role[]) => boolean;
};

const AuthContext = createContext<Ctx | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => { const raw = localStorage.getItem("session"); if (raw) setUser(JSON.parse(raw)); }, []);

  const login = async (email: string, password: string) => {
    const u = await loginAPI(email, password);
    setUser(u);
    localStorage.setItem("session", JSON.stringify(u));
    return u;
  };

  const logout = () => { setUser(null); localStorage.removeItem("session"); };

  const hasRole = (roles: Role | Role[]) => user ? (Array.isArray(roles) ? roles : [roles]).includes(user.role) : false;

  const value = useMemo(() => ({ user, login, logout, hasRole }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
