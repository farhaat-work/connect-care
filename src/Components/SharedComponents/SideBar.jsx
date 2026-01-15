// src/Components/Dashboard/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar({ role }) {
  const links = {
    admin: [
      { path: "/admin-dashboard", label: "Dashboard" },
      { path: "/manage-users", label: "Users" },
      { path: "/reports", label: "Reports" },
    ],
    doctor: [
      { path: "/doctor-dashboard", label: "Dashboard" },
      { path: "/patients", label: "Patients" },
      { path: "/appointments", label: "Appointments" },
    ],
    patient: [
      { path: "/patient-dashboard", label: "Dashboard" },
      { path: "/my-appointments", label: "Appointments" },
      { path: "/records", label: "Medical Records" },
    ],
  };

  return (
    <aside className="sidebar">
      <h2>{role.charAt(0).toUpperCase() + role.slice(1)} Panel</h2>
      <nav>
        <ul>
          {links[role].map((link) => (
            <li key={link.path}>
              <Link to={link.path}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
