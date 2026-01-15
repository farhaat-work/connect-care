// src/Components/Dashboard/DashboardCard.jsx
import React from "react";

export default function DashboardCard({ title, description }) {
  return (
    <div className="dashboard-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <button>Open</button>
    </div>
  );
}
