import { createContext, useContext, useState, useCallback } from "react";

const NotificationContext = createContext(null);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within NotificationProvider");
  }
  return context;
};

// Notification types for backend compatibility
const NOTIFICATION_TYPES = {
  APPOINTMENT_BOOKED: "appointment_booked",
  APPOINTMENT_CANCELLED: "appointment_cancelled",
  APPOINTMENT_REMINDER: "appointment_reminder",
  VIDEO_SCHEDULED: "video_scheduled",
  VIDEO_STARTED: "video_started",
  NEW_APPOINTMENT_ASSIGNED: "new_appointment_assigned",
  CONSULTATION_COMPLETED: "consultation_completed",
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const generateId = () => `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const addNotification = useCallback((notificationData) => {
    const newNotification = {
      id: generateId(),
      recipientType: notificationData.recipientType, // "patient" or "doctor"
      type: notificationData.type,
      title: notificationData.title,
      message: notificationData.message,
      channel: notificationData.channel || "email", // "sms" or "email"
      status: notificationData.status || "sent", // "sent", "pending", "failed"
      isRead: false,
      createdAt: new Date().toISOString(),
      metadata: notificationData.metadata || {},
    };
    setNotifications((prev) => [newNotification, ...prev]);
    return newNotification;
  }, []);

  const markAsRead = useCallback((notificationId) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === notificationId ? { ...notif, isRead: true } : notif
      )
    );
  }, []);

  const markAllAsRead = useCallback((recipientType) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.recipientType === recipientType ? { ...notif, isRead: true } : notif
      )
    );
  }, []);

  const getPatientNotifications = useCallback(() => {
    return notifications.filter((notif) => notif.recipientType === "patient");
  }, [notifications]);

  const getDoctorNotifications = useCallback(() => {
    return notifications.filter((notif) => notif.recipientType === "doctor");
  }, [notifications]);

  const getUnreadCount = useCallback((recipientType) => {
    return notifications.filter(
      (notif) => notif.recipientType === recipientType && !notif.isRead
    ).length;
  }, [notifications]);

  const getRecentNotifications = useCallback((recipientType, limit = 5) => {
    return notifications
      .filter((notif) => notif.recipientType === recipientType)
      .slice(0, limit);
  }, [notifications]);

  // Simulate notification creation for appointment events
  const notifyAppointmentBooked = useCallback((appointmentData) => {
    // Patient notification
    addNotification({
      recipientType: "patient",
      type: NOTIFICATION_TYPES.APPOINTMENT_BOOKED,
      title: "Appointment Confirmed",
      message: `Your appointment with Dr. ${appointmentData.doctorName} is confirmed for ${appointmentData.appointmentDate} at ${appointmentData.appointmentTime}.`,
      channel: "email",
      status: "sent",
      metadata: { appointmentId: appointmentData.id },
    });

    // Doctor notification
    addNotification({
      recipientType: "doctor",
      type: NOTIFICATION_TYPES.NEW_APPOINTMENT_ASSIGNED,
      title: "New Appointment",
      message: `New appointment with ${appointmentData.patientName} scheduled for ${appointmentData.appointmentDate} at ${appointmentData.appointmentTime}.`,
      channel: "email",
      status: "sent",
      metadata: { appointmentId: appointmentData.id },
    });
  }, [addNotification]);

  const notifyAppointmentCancelled = useCallback((appointmentData) => {
    addNotification({
      recipientType: "patient",
      type: NOTIFICATION_TYPES.APPOINTMENT_CANCELLED,
      title: "Appointment Cancelled",
      message: `Your appointment with Dr. ${appointmentData.doctorName} has been cancelled.`,
      channel: "sms",
      status: "sent",
      metadata: { appointmentId: appointmentData.id },
    });

    addNotification({
      recipientType: "doctor",
      type: NOTIFICATION_TYPES.APPOINTMENT_CANCELLED,
      title: "Appointment Cancelled",
      message: `Appointment with ${appointmentData.patientName} has been cancelled.`,
      channel: "email",
      status: "sent",
      metadata: { appointmentId: appointmentData.id },
    });
  }, [addNotification]);

  const notifyVideoConsultation = useCallback((appointmentData, eventType) => {
    const isStarted = eventType === "started";
    
    addNotification({
      recipientType: "patient",
      type: isStarted ? NOTIFICATION_TYPES.VIDEO_STARTED : NOTIFICATION_TYPES.VIDEO_SCHEDULED,
      title: isStarted ? "Video Call Started" : "Video Consultation Scheduled",
      message: isStarted 
        ? `Your video consultation with Dr. ${appointmentData.doctorName} is ready. Join now!`
        : `Video consultation with Dr. ${appointmentData.doctorName} scheduled for ${appointmentData.appointmentDate} at ${appointmentData.appointmentTime}.`,
      channel: "sms",
      status: "sent",
      metadata: { appointmentId: appointmentData.id },
    });

    addNotification({
      recipientType: "doctor",
      type: isStarted ? NOTIFICATION_TYPES.VIDEO_STARTED : NOTIFICATION_TYPES.VIDEO_SCHEDULED,
      title: isStarted ? "Patient Joined Call" : "Upcoming Video Consultation",
      message: isStarted
        ? `${appointmentData.patientName} has joined the video consultation.`
        : `Video consultation with ${appointmentData.patientName} scheduled for ${appointmentData.appointmentDate} at ${appointmentData.appointmentTime}.`,
      channel: "email",
      status: "sent",
      metadata: { appointmentId: appointmentData.id },
    });
  }, [addNotification]);

  const notifyConsultationCompleted = useCallback((appointmentData) => {
    addNotification({
      recipientType: "patient",
      type: NOTIFICATION_TYPES.CONSULTATION_COMPLETED,
      title: "Consultation Completed",
      message: `Your consultation with Dr. ${appointmentData.doctorName} has been completed. Thank you for choosing MediConnect.`,
      channel: "email",
      status: "sent",
      metadata: { appointmentId: appointmentData.id },
    });

    addNotification({
      recipientType: "doctor",
      type: NOTIFICATION_TYPES.CONSULTATION_COMPLETED,
      title: "Consultation Completed",
      message: `Consultation with ${appointmentData.patientName} marked as completed.`,
      channel: "email",
      status: "sent",
      metadata: { appointmentId: appointmentData.id },
    });
  }, [addNotification]);

  const notifyAppointmentReminder = useCallback((appointmentData) => {
    addNotification({
      recipientType: "patient",
      type: NOTIFICATION_TYPES.APPOINTMENT_REMINDER,
      title: "Appointment Reminder",
      message: `Reminder: Your appointment with Dr. ${appointmentData.doctorName} is tomorrow at ${appointmentData.appointmentTime}.`,
      channel: "sms",
      status: "sent",
      metadata: { appointmentId: appointmentData.id },
    });
  }, [addNotification]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        markAsRead,
        markAllAsRead,
        getPatientNotifications,
        getDoctorNotifications,
        getUnreadCount,
        getRecentNotifications,
        notifyAppointmentBooked,
        notifyAppointmentCancelled,
        notifyVideoConsultation,
        notifyConsultationCompleted,
        notifyAppointmentReminder,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export { NOTIFICATION_TYPES };
