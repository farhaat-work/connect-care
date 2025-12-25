// Mock data for specializations and doctors
export const specializations = [
  "Cardiology",
  "Dermatology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Psychiatry",
  "General Medicine",
];

export const doctorsBySpecialization = {
  Cardiology: [
    { id: "c1", name: "Dr. Sarah Johnson", experience: "15 years" },
    { id: "c2", name: "Dr. Michael Chen", experience: "12 years" },
  ],
  Dermatology: [
    { id: "d1", name: "Dr. Emily Davis", experience: "10 years" },
    { id: "d2", name: "Dr. Robert Wilson", experience: "8 years" },
  ],
  Neurology: [
    { id: "n1", name: "Dr. James Anderson", experience: "20 years" },
    { id: "n2", name: "Dr. Lisa Brown", experience: "14 years" },
  ],
  Orthopedics: [
    { id: "o1", name: "Dr. David Miller", experience: "18 years" },
    { id: "o2", name: "Dr. Jennifer Taylor", experience: "11 years" },
  ],
  Pediatrics: [
    { id: "p1", name: "Dr. Amanda White", experience: "13 years" },
    { id: "p2", name: "Dr. Christopher Lee", experience: "9 years" },
  ],
  Psychiatry: [
    { id: "ps1", name: "Dr. Rachel Green", experience: "16 years" },
    { id: "ps2", name: "Dr. Mark Thompson", experience: "12 years" },
  ],
  "General Medicine": [
    { id: "g1", name: "Dr. Nancy Clark", experience: "22 years" },
    { id: "g2", name: "Dr. Kevin Martinez", experience: "10 years" },
  ],
};

export const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
];

export const generateAppointmentNumber = () => {
  return `MC${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 1000)}`;
};
