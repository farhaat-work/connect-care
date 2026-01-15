import React from "react";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Layout stats={stats}>
      <div className="page-wrapper container-fluid py-3 px-2 px-md-4">
        <Outlet />
      </div>
    </Layout>
    </>
  );
}
