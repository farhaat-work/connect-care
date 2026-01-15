
// Derived from Patient module
export const patientStats = {
  totalPatients: 1200,
  inPatients: 320,
  outPatients: 880,
};

// Derived from Appointment module
export const appointmentStats = {
  totalAppointments: 1650,
  virtualAppointments: 950,
  inPersonAppointments: 700,
};

// Derived from EHR module
export const outcomeStats = {
  recoveryRate: 82, // %
  readmissionRate: 11, // %
};

// Trend data (aggregated over time)
export const recoveryTrends = [
  { month: "Jan", recoveryRate: 78, readmissionRate: 14 },
  { month: "Feb", recoveryRate: 80, readmissionRate: 13 },
  { month: "Mar", recoveryRate: 82, readmissionRate: 11 },
  { month: "Apr", recoveryRate: 85, readmissionRate: 9 },
];

// Appointment distribution
export const appointmentDistribution = [
  { type: "Virtual", count: 950 },
  { type: "In-Person", count: 700 },
];
