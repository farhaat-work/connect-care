// localStorage utility functions for appointments and sessions

const APPOINTMENTS_KEY = "mediconnect_appointments";
const SESSIONS_KEY = "mediconnect_sessions";

// Appointment functions
export const getAppointments = () => {
  try {
    const data = localStorage.getItem(APPOINTMENTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading appointments from localStorage:", error);
    return [];
  }
};

export const saveAppointments = (appointments) => {
  try {
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
    return true;
  } catch (error) {
    console.error("Error saving appointments to localStorage:", error);
    return false;
  }
};

export const saveAppointment = (appointment) => {
  try {
    const appointments = getAppointments();
    appointments.push(appointment);
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
    return true;
  } catch (error) {
    console.error("Error saving appointment to localStorage:", error);
    return false;
  }
};

export const updateAppointment = (appointmentId, updates) => {
  try {
    const appointments = getAppointments();
    const updatedAppointments = appointments.map((apt) =>
      apt.id === appointmentId ? { ...apt, ...updates } : apt
    );
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(updatedAppointments));
    return true;
  } catch (error) {
    console.error("Error updating appointment in localStorage:", error);
    return false;
  }
};

export const getUpcomingAppointments = () => {
  const appointments = getAppointments();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return appointments.filter((apt) => {
    const aptDate = new Date(apt.appointmentDate);
    aptDate.setHours(0, 0, 0, 0);
    return aptDate >= today && apt.status !== "Cancelled" && apt.status !== "Completed";
  }).sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate));
};

export const getVideoConsultations = () => {
  return getUpcomingAppointments().filter(
    (apt) => apt.consultationMode === "virtual"
  );
};

// Session functions for video calls
export const getSessions = () => {
  try {
    const data = localStorage.getItem(SESSIONS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading sessions from localStorage:", error);
    return [];
  }
};

export const saveSession = (session) => {
  try {
    const sessions = getSessions();
    const existingIndex = sessions.findIndex((s) => s.id === session.id);
    if (existingIndex >= 0) {
      sessions[existingIndex] = { ...sessions[existingIndex], ...session };
    } else {
      sessions.push(session);
    }
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
    return true;
  } catch (error) {
    console.error("Error saving session to localStorage:", error);
    return false;
  }
};

export const updateSessionStatus = (sessionId, status) => {
  try {
    const sessions = getSessions();
    const updatedSessions = sessions.map((s) =>
      s.id === sessionId ? { ...s, status, updatedAt: new Date().toISOString() } : s
    );
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(updatedSessions));
    return true;
  } catch (error) {
    console.error("Error updating session in localStorage:", error);
    return false;
  }
};

export const getActiveSession = (appointmentId) => {
  const sessions = getSessions();
  return sessions.find(
    (s) => s.appointmentId === appointmentId && s.status === "active"
  );
};
