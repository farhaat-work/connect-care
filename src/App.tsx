import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppointmentProvider } from "@/context/AppointmentContext";
import { NotificationProvider } from "@/context/NotificationContext";
import Index from "./pages/Index";
import Appointments from "./pages/Appointments";
import VideoConsultation from "./pages/VideoConsultation";
import PatientNotifications from "./pages/PatientNotifications";
import DoctorNotifications from "./pages/DoctorNotifications";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
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
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
