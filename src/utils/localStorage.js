// localStorage utility functions for appointments

const APPOINTMENTS_KEY = "mediconnect_appointments";

export const getAppointments = () => {
  try {
    const data = localStorage.getItem(APPOINTMENTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading appointments from localStorage:", error);
    return [];
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

export const getUpcomingAppointments = () => {
  const appointments = getAppointments();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return appointments.filter((apt) => {
    const aptDate = new Date(apt.appointmentDate);
    aptDate.setHours(0, 0, 0, 0);
    return aptDate >= today;
  }).sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate));
};
