import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { generateAppointmentNumber } from "@/data/appointmentData.js";
import { 
  getAppointments as getStoredAppointments, 
  saveAppointments,
  getSessions,
  saveSession,
  updateSessionStatus as updateStoredSessionStatus
} from "@/utils/localStorage.js";

const AppointmentContext = createContext(null);

export const useAppointments = () => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error("useAppointments must be used within AppointmentProvider");
  }
  return context;
};

export const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState(() => getStoredAppointments());
  const [sessions, setSessions] = useState(() => getSessions());

  // Persist appointments to localStorage whenever they change
  useEffect(() => {
    saveAppointments(appointments);
  }, [appointments]);

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

  // Session management for video calls
  const createSession = useCallback((appointmentId, userType) => {
    const appointment = appointments.find((apt) => apt.id === appointmentId);
    if (!appointment) return null;

    const newSession = {
      id: `session-${Date.now()}`,
      appointmentId,
      roomId: `consultation-${appointmentId}`,
      patientName: appointment.patientName,
      doctorName: appointment.doctorName,
      specialization: appointment.specialization,
      appointmentDate: appointment.appointmentDate,
      appointmentTime: appointment.appointmentTime,
      status: "waiting",
      createdAt: new Date().toISOString(),
      participants: {
        patient: userType === "patient",
        doctor: userType === "doctor",
      },
    };

    saveSession(newSession);
    setSessions((prev) => [...prev, newSession]);
    return newSession;
  }, [appointments]);

  const joinSession = useCallback((sessionId, userType) => {
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id === sessionId) {
          const updated = {
            ...s,
            participants: { ...s.participants, [userType]: true },
            status: s.participants.patient && s.participants.doctor ? "active" : "waiting",
          };
          saveSession(updated);
          return updated;
        }
        return s;
      })
    );
  }, []);

  const endSession = useCallback((sessionId) => {
    updateStoredSessionStatus(sessionId, "ended");
    setSessions((prev) =>
      prev.map((s) => (s.id === sessionId ? { ...s, status: "ended" } : s))
    );
  }, []);

  const getSessionByAppointment = useCallback((appointmentId) => {
    return sessions.find(
      (s) => s.appointmentId === appointmentId && s.status !== "ended"
    );
  }, [sessions]);

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        sessions,
        addAppointment,
        updateAppointmentStatus,
        getUpcomingAppointments,
        getVideoConsultations,
        createSession,
        joinSession,
        endSession,
        getSessionByAppointment,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};
