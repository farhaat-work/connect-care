
// // App.jsx
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import "./App.css";

// import { Navbar } from "./components/Navbar";
// import { AdminDashboard } from "./Pages/AdminDashboard"
// import { Reports } from "./Pages/Reports";
// import Analytics from "./Pages/Analytics";

// function App() {
//   return (
//     <BrowserRouter>
//       <Navbar />
//       <div className="pt-16 h-full pb-5">
//         <Routes>
//           {/* Home/Dashboard */}
//           <Route path="/" element={<AdminDashboard />} />

//           {/* Reports page */}
//           <Route path="/reports" element={<Reports />} />

//           {/* Optional: 404 fallback */}
//           <Route path="/analytics" element={<Analytics />} />
//         </Routes>
//       </div>


//     </BrowserRouter>
//   );
// }

// export default App;




// import React from "react";
// import { Outlet } from "react-router-dom";
// import { Navbar } from "./components/Navbar";
// import "./App.css";

// export default function AdminLayout() {
//   return (
//     <>
//       <Navbar />
//       <div className="pt-16 h-full pb-5">
//         {/* Nested admin pages will render here */}
//         <Outlet />
//       </div>
//     </>
//   );
// }
