// src/Components/Dashboard/AdminDashboard.jsx
import React from "react";
import Sidebar from "../SharedComponents/SideBar";
import Navbar from "../SharedComponents/NavBar";
import DashboardCard from "../SharedComponents/DashboardCard";

export default function AdminDashboard() {
  return (
    <div className="dashboard-container">
      <Sidebar role="admin" />
      <div className="dashboard-main">
        <Navbar title="Admin Dashboard" />
        <div className="dashboard-content">
          <DashboardCard title="User Management" description="Manage patients, doctors, and staff accounts." />
          <DashboardCard title="Reports" description="Generate hospital performance and financial reports." />
          <DashboardCard title="System Settings" description="Configure hospital system preferences." />
          <DashboardCard title="Analytics" description="Track KPIs and operational metrics." />
        </div>
      </div>
    </div>
  );
}
