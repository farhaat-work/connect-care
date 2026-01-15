
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { loadPrescriptions, savePrescriptions } from "../utils/storage.js";

// Static data (unchanged from your App.jsx)
const PATIENTS = [
  { id: 'P001', name: 'Aarav Sharma' },
  { id: 'P002', name: 'Diya Patel' },
  { id: 'P003', name: 'Rohan Gupta' },
  { id: 'P004', name: 'Sneha Iyer' },
  { id: 'P005', name: 'Sumanth Reddy' },
];

const MEDICATIONS = [
  'Paracetamol 500mg',
  'Amoxicillin 250mg',
  'Ibuprofen 400mg',
  'Metformin 500mg',
  'Atorvastatin 10mg',
  'Omeprazole 20mg',
  'Vitamin D3 1000IU',
  'Azithromycin 500mg',
];

const Module4Context = createContext(null);

export function Module4Provider({ children }) {
  const [prescriptions, setPrescriptions] = useState(loadPrescriptions());

  // Sync with LocalStorage whenever state changes
  useEffect(() => {
    savePrescriptions(prescriptions);
  }, [prescriptions]);

//   const addPrescription = (p) => {
//     // Using PatientID as the primary identifier (same as your App.jsx)
//     const newEntry = {
//       ...p,
//       PrescriptionID: p.PatientID,
//       createdAt: new Date().toISOString(),
//     };
//     setPrescriptions(prev => [newEntry, ...prev]);
//   };


const addPrescription = (p) => {
  setPrescriptions(prev => {
    // 1. Check if this patient already has a prescription
    const exists = prev.some(item => item.PatientID === p.PatientID);

    if (exists) {
      // 2. Update the existing entry
      return prev.map(item => 
        item.PatientID === p.PatientID 
          ? { 
              ...item, 
              ...p, 
              updatedAt: new Date().toISOString() // Optional: track updates
            } 
          : item
      );
    }

    // 3. If it doesn't exist, add it as a new entry at the top
    const newEntry = {
      ...p,
      PrescriptionID: p.PatientID, // Using PatientID as the unique key
      createdAt: new Date().toISOString(),
    };
    return [newEntry, ...prev];
  });
};




  const updatePrescriptionStatus = (id, status) => {
    setPrescriptions(prev =>
      prev.map(p => (p.PrescriptionID === id ? { ...p, Status: status } : p))
    );
  };

  const deletePrescription = (id) => {
    setPrescriptions(prev => prev.filter(p => p.PrescriptionID !== id));
  };

  const stats = useMemo(() => ({
    total: prescriptions.length,
    active: prescriptions.filter(p => p.Status === 'Active').length,
    completed: prescriptions.filter(p => p.Status === 'Completed').length,
  }), [prescriptions]);

  const value = {
    // state
    prescriptions,
    // data
    patients: PATIENTS,
    meds: MEDICATIONS,
    // actions
    addPrescription,
    updatePrescriptionStatus,
    deletePrescription,
    // derived
    stats,
  };

  return (
    <Module4Context.Provider value={value}>
      {children}
    </Module4Context.Provider>
  );
}

export function useModule4() {
  const ctx = useContext(Module4Context);
  if (!ctx) throw new Error("useModule4 must be used within Module4Provider");
  return ctx;
}
