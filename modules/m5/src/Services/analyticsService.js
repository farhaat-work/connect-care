import {
  patientStats,
  appointmentStats,
  outcomeStats,
  recoveryTrends,
  appointmentDistribution,
} from "../Data/dashboardMockData";

// Dashboard KPIs
export const getDashboardMetrics = () => {
  return {
    totalPatients: patientStats.totalPatients,
    inPatients: patientStats.inPatients,
    outPatients: patientStats.outPatients,
    totalAppointments: appointmentStats.totalAppointments,
    recoveryRate: outcomeStats.recoveryRate,
    readmissionRate: outcomeStats.readmissionRate,
  };
};

// Recovery & readmission trends
export const getRecoveryTrends = () => {
  return recoveryTrends;
};

// Appointment mode distribution
export const getAppointmentDistribution = () => {
  return appointmentDistribution;
};


export const getCardsData = ()=>{
  return CardsData;
}

const PatientInOutData = [{
  name : "Patients In",
  count: patientStats.inPatients
},
{
  name: "Patients Out",
  count: patientStats.outPatients,
}]

export const getPatientInOutData = () => {
  return PatientInOutData
}

const CardsData= [{
  name: "Total Patients", 
  count: patientStats.totalPatients,
},
{
  name: "Total Appontments", 
  count: appointmentStats.totalAppointments,
},
{
  name: "Recovery Rate", 
  count: outcomeStats.recoveryRate,
},
{
  name: "Readmission Rate", 
  count: outcomeStats.readmissionRate,
}
]

const PogressBarData = []