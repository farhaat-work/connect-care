
import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./src/components/Navbar";

export default function AdminLayout() {
  return (
    <>
      <Navbar />
      <div className="pt-16 h-full pb-5">
        {/* Nested admin pages will render here */}
        <Outlet />
      </div>
    </>
  );
}
