// src/auth/RouteGuards.tsx
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import type { Role } from "./auth";

export const RequireAuth: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return <Outlet />;
};

export const RequireRole: React.FC<{ roles: Role | Role[] }> = ({ roles }) => {
  const { hasRole } = useAuth();
  const location = useLocation();
  if (!hasRole(roles)) {
    // Optional: send to a "Not authorized" page or to their own dashboard
    return <Navigate to="/unauthorized" replace state={{ from: location }} />;
  }
  return <Outlet />;
};
