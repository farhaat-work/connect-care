
import React from "react";
import AdminLayout from "./layout.jsx";
import { AdminDashboard } from "./src/Pages/AdminDashboard.jsx";
import { Reports } from "./src/Pages/Reports.jsx";
import Analytics from "./src/Pages/Analytics.jsx";

/**
 * Nested routes under /admin.
 * These are plain route objects consumed by the root router.
 */
export const adminRoutes = [
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },   // /admin
      { path: "reports", element: <Reports /> },      // /admin/reports
      { path: "analytics", element: <Analytics /> },  // /admin/analytics
    ],
  },
];
