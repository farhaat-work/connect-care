import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useRole } from "../Context/RoleContext";

/**
 * Wraps route segments and allows only specified roles.
 * Usage:
 * <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
 *   ...child routes...
 * </Route>
 */
export default function ProtectedRoute({ allowedRoles = [] }) {
  const { role } = useRole();

  // Not logged-in / no role -> redirect to login
  if (!role) {
    return <Navigate to="/login" replace />;
  }

  // Role not allowed -> fallback (you can route to a 403 page or dashboard)
  if (!allowedRoles.includes(role)) {
    // Optional: Redirect to a role-specific landing or a generic unauthorized page
    // For simplicity: send to /login
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
