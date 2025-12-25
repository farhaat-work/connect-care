import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  dateTime: Date;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  type: 'video' | 'in-person';
  notes?: string;
}

interface AppointmentContextType {
  appointments: Appointment[];
  currentAppointment: Appointment | null;
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  updateAppointment: (id: string, updates: Partial<Appointment>) => void;
  cancelAppointment: (id: string) => void;
  setCurrentAppointment: (appointment: Appointment | null) => void;
  getAppointmentsByDoctor: (doctorId: string) => Appointment[];
  getAppointmentsByPatient: (patientId: string) => Appointment[];
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

// Demo data
const demoAppointments: Appointment[] = [
  {
    id: '1',
    patientId: 'patient-1',
    patientName: 'John Smith',
    doctorId: 'doctor-1',
    doctorName: 'Dr. Sarah Johnson',
    dateTime: new Date(),
    status: 'scheduled',
    type: 'video',
    notes: 'Follow-up consultation',
  },
  {
    id: '2',
    patientId: 'patient-2',
    patientName: 'Emma Wilson',
    doctorId: 'doctor-1',
    doctorName: 'Dr. Sarah Johnson',
    dateTime: new Date(Date.now() + 3600000),
    status: 'scheduled',
    type: 'video',
  },
];

export const AppointmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [appointments, setAppointments] = useState<Appointment[]>(demoAppointments);
  const [currentAppointment, setCurrentAppointment] = useState<Appointment | null>(null);

  const addAppointment = useCallback((appointment: Omit<Appointment, 'id'>) => {
    const newAppointment: Appointment = {
      ...appointment,
      id: Date.now().toString(),
    };
    setAppointments(prev => [...prev, newAppointment]);
  }, []);

  const updateAppointment = useCallback((id: string, updates: Partial<Appointment>) => {
    setAppointments(prev =>
      prev.map(apt => (apt.id === id ? { ...apt, ...updates } : apt))
    );
  }, []);

  const cancelAppointment = useCallback((id: string) => {
    updateAppointment(id, { status: 'cancelled' });
  }, [updateAppointment]);

  const getAppointmentsByDoctor = useCallback(
    (doctorId: string) => appointments.filter(apt => apt.doctorId === doctorId),
    [appointments]
  );

  const getAppointmentsByPatient = useCallback(
    (patientId: string) => appointments.filter(apt => apt.patientId === patientId),
    [appointments]
  );

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        currentAppointment,
        addAppointment,
        updateAppointment,
        cancelAppointment,
        setCurrentAppointment,
        getAppointmentsByDoctor,
        getAppointmentsByPatient,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointments = (): AppointmentContextType => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('useAppointments must be used within an AppointmentProvider');
  }
  return context;
};
