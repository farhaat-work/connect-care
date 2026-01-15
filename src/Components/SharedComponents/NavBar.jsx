// src/Components/Dashboard/Navbar.jsx
import React from "react";

export default function Navbar({ title }) {
  return (
    <header className="navbar">
      <h1>{title}</h1>
      <div className="navbar-actions">
        <button>Notifications</button>
        <button>Logout</button>
      </div>
    </header>
  );
}
