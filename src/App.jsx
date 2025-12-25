import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppointmentProvider } from "@/context/AppointmentContext.jsx";
import { NotificationProvider } from "@/context/NotificationContext.jsx";
import Index from "./pages/Index.jsx";
import Appointments from "./pages/Appointments.jsx";
import VideoConsultation from "./pages/VideoConsultation.jsx";
import PatientNotifications from "./pages/PatientNotifications.jsx";
import DoctorNotifications from "./pages/DoctorNotifications.jsx";
import NotFound from "./pages/NotFound.jsx";

const App = () => (
  <BrowserRouter>
    <NotificationProvider>
      <AppointmentProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/video-consultation" element={<VideoConsultation />} />
          <Route path="/notifications/patient" element={<PatientNotifications />} />
          <Route path="/notifications/doctor" element={<DoctorNotifications />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppointmentProvider>
    </NotificationProvider>
  </BrowserRouter>
);

export default App;
