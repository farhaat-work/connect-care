import { createContext, useContext, useState, useCallback } from "react";
import { generateAppointmentNumber } from "@/data/appointmentData.js";

const AppointmentContext = createContext(null);

export const useAppointments = () => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error("useAppointments must be used within AppointmentProvider");
  }
  return context;
};

export const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);

  const addAppointment = useCallback((appointmentData) => {
    const newAppointment = {
      ...appointmentData,
      id: generateAppointmentNumber(),
      status: "Scheduled",
      createdAt: new Date().toISOString(),
    };
    setAppointments((prev) => [...prev, newAppointment]);
    return newAppointment;
  }, []);

  const updateAppointmentStatus = useCallback((appointmentId, newStatus) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === appointmentId ? { ...apt, status: newStatus } : apt
      )
    );
  }, []);

  const getUpcomingAppointments = useCallback(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return appointments.filter((apt) => {
      const aptDate = new Date(apt.appointmentDate);
      return aptDate >= today && apt.status !== "Cancelled" && apt.status !== "Completed";
    });
  }, [appointments]);

  const getVideoConsultations = useCallback(() => {
    return getUpcomingAppointments().filter(
      (apt) => apt.consultationMode === "virtual"
    );
  }, [getUpcomingAppointments]);

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        addAppointment,
        updateAppointmentStatus,
        getUpcomingAppointments,
        getVideoConsultations,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};
