import React, { createContext, useContext, useState, useEffect } from "react";

const AppointmentContext = createContext();

export const useAppointments = () => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error("useAppointments must be used within an AppointmentProvider");
  }
  return context;
};

export const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState(() => {
    const stored = localStorage.getItem("appointments");
    return stored ? JSON.parse(stored) : [];
  });

  // Persist to localStorage whenever appointments change
  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  // Generate unique ID
  const generateId = () => {
    return `APT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  // Add new appointment
  const addAppointment = (appointmentData) => {
    // Normalize the data structure for consistent access
    const newAppointment = {
      id: generateId(),
      patientName: appointmentData.patientName,
      patientPhone: appointmentData.phoneNumber,
      patientEmail: appointmentData.emailId,
      patientAge: appointmentData.age,
      doctorName: appointmentData.doctorName,
      specialization: appointmentData.doctorSpecialization,
      appointmentDate: appointmentData.appointmentDate,
      appointmentTime: appointmentData.appointmentTime,
      consultationMode: appointmentData.consultationType === "virtual" ? "Virtual" : "In-Person",
      status: "Upcoming",
      createdAt: new Date().toISOString(),
    };
    setAppointments((prev) => [...prev, newAppointment]);
    return newAppointment;
  };

  // Update appointment status
  const updateAppointmentStatus = (id, newStatus) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === id ? { ...apt, status: newStatus } : apt
      )
    );
  };

  // Cancel appointment
  const cancelAppointment = (id) => {
    updateAppointmentStatus(id, "Cancelled");
  };

  // Mark appointment as completed
  const completeAppointment = (id) => {
    updateAppointmentStatus(id, "Completed");
  };

  // Get all appointments
  const getAllAppointments = () => appointments;

  // Get appointments by status
  const getAppointmentsByStatus = (status) => {
    return appointments.filter((apt) => apt.status === status);
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        addAppointment,
        updateAppointmentStatus,
        cancelAppointment,
        completeAppointment,
        getAllAppointments,
        getAppointmentsByStatus,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};
