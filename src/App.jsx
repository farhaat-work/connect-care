import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import RegisterHorizontal from "./Components/Register";
import LoginWithRoles from "./Components/Login";
import ForgotPassword from "./Components/ForgotPassword";

import { adminRoutes } from "../modules/m5/routes";
import { m4Routes } from "../modules/m4/module-2.4-ehealth-ui/routes";
import { m3Routes } from "../modules/m3/routes";

import { Module4Provider } from "../modules/m4/module-2.4-ehealth-ui/src/m4context/context";
import { RoleProvider } from "../src/Context/RoleContext";
import { AppointmentProvider } from "./Context/AppointmentContext";

import DoctorDashboard from "./Components/Dashboards/DoctorDashboard";
import PatientDashboard from "./Components/Dashboards/PatientDashboard";
import ProtectedRoute from "./Components/ProtectedRoute";
import Appointments from "./pages/Appointments";
import ViewAppointments from "./pages/ViewAppointments";
import DoctorAppointments from "./pages/DoctorAppointments";
import PatientVideoCall from "./pages/PatientVideoCall";
import DoctorVideoCall from "./pages/DoctorVideoCall";



function renderRoutes(routes) {
  
  return routes.map((r) => {
    if (r.children?.length) {
      return (
        <Route key={r.path} path={r.path} element={r.element}>
          {renderRoutes(r.children)}
        </Route>
      );
    }
    if (r.index) {
      return <Route key={`index:${r.path || ""}`} index element={r.element} />;
    }
    return <Route key={r.path} path={r.path} element={r.element} />;
  });
}


export default function App() {
  return (
    <RoleProvider>
      <AppointmentProvider>
        <BrowserRouter>
          <Module4Provider>
            <Routes>
              {/* Redirect root to login */}
              <Route path="/" element={<Navigate to="/login" replace />} />

              {/* Public auth routes */}
              <Route path="/login" element={<LoginWithRoles />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/register" element={<RegisterHorizontal />} />

              {/* Admin segment protected */}
              <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                {renderRoutes(adminRoutes)}
              </Route>

              <Route element={<ProtectedRoute allowedRoles={["doctor"]} />}>
                {renderRoutes(m4Routes)}
              </Route>

              <Route element={<ProtectedRoute allowedRoles={["doctor"]} />}>
                {renderRoutes(m3Routes)}
              </Route>

              {/* Doctor segment protected */}
              <Route element={<ProtectedRoute allowedRoles={["doctor"]} />}>
                <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
                <Route path="/doctor/appointments" element={<DoctorAppointments />} />
                <Route path="/doctor/videocall" element={<DoctorVideoCall />} />
              </Route>

              {/* Patient segment protected */}
              <Route element={<ProtectedRoute allowedRoles={["patient"]} />}>
                <Route path="/patient-dashboard" element={<PatientDashboard />} />
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/appointments/view" element={<ViewAppointments />} />
                <Route path="/patient/videocall" element={<PatientVideoCall />} />
              </Route>

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </Module4Provider>
        </BrowserRouter>
      </AppointmentProvider>
    </RoleProvider>
  );
}




