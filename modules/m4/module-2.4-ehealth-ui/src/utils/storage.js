
const KEY = 'module24_prescriptions'

const seed = [
  { PrescriptionID: 'RX-20250101-1001', PatientID: 'P001', PatientName: 'Aarav Sharma', MedicationList: ['Paracetamol 500mg'], Dosage: '1-0-1 after food', Status: 'Active', createdAt: new Date().toISOString() },
  { PrescriptionID: 'RX-20250101-1002', PatientID: 'P002', PatientName: 'Diya Patel', MedicationList: ['Metformin 500mg', 'Atorvastatin 10mg'], Dosage: '1-0-0 morning', Status: 'Active', createdAt: new Date().toISOString() },
  { PrescriptionID: 'RX-20250101-1003', PatientID: 'P003', PatientName: 'Rohan Gupta', MedicationList: ['Ibuprofen 400mg'], Dosage: '0-1-0 night', Status: 'Completed', createdAt: new Date().toISOString() },
]

export function loadPrescriptions() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return seed
    return JSON.parse(raw)
  } catch {
    return seed
  }
}

export function savePrescriptions(prescriptions) {
  try {
    localStorage.setItem(KEY, JSON.stringify(prescriptions))
  } catch {}
}
