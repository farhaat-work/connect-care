
export const DB = {
  'P-10293': {
    patient: { id: 'P-10293', name: 'Anita Sharma', dob: '1980-04-12', sex: 'Female', bloodGroup: 'B+', status: 'Inpatient' },
    summary: { recordId: 'HR-2025-00123', updatedAt: '2025-12-15T10:22:00', primaryDiagnosis: 'Type 2 Diabetes Mellitus', lastLabSummary: { name: 'HbA1c', value: '7.6', units: '%', date: '2025-12-13' } },
    diagnoses: [
      { id: 'd1', date: '2023-08-02', clinician: 'Dr. Patel', facility: 'City Hospital', type: 'Chronic', code: 'E11.9', name: 'Type 2 Diabetes Mellitus', notes: 'Metformin started' },
      { id: 'd2', date: '2024-02-11', clinician: 'Dr. Rao', facility: 'City Hospital', type: 'Acute', code: 'J10', name: 'Influenza due to other influenza virus', notes: 'Supportive care' },
      { id: 'd3', date: '2025-06-20', clinician: 'Dr. Patel', facility: 'City Hospital', type: 'Surgical', code: 'K80.2', name: 'Calculus of gallbladder without cholecystitis', notes: 'Laparoscopic cholecystectomy' }
    ],
    labs: [
      { id: 'l1', name: 'HbA1c', value: '4.6', units: '%', refRange: '4.0 – 5.6', date: '2025-12-13', orderingDoctor: 'Dr. Patel', lab: 'Central Lab', files: [] },
      { id: 'l2', name: 'Fasting Glucose', value: '80', units: 'mg/dL', refRange: '70 – 99', date: '2025-12-13', orderingDoctor: 'Dr. Patel', lab: 'Central Lab', files: [] },
      { id: 'l3', name: 'HbA1c', value: '4.5', units: '%', refRange: '4.0 – 5.6', date: '2025-09-12', orderingDoctor: 'Dr. Patel', lab: 'Central Lab', files: [] }
    ],
    doctors: [
      { id: 'u1', name: 'Dr. Patel', role: 'Endocrinologist', access: 'write' },
      { id: 'u2', name: 'Dr. Rao', role: 'Physician', access: 'read' },
      { id: 'u3', name: 'Dr. Iyer', role: 'Surgeon', access: 'read' }
    ],
    consentHistory: [
      { id: 'c1', grantedTo: 'Dr. Patel', scope: 'Full access', start: '2025-12-10', end: '2025-12-20' },
      { id: 'c2', grantedTo: 'Dr. Rao', scope: 'Read-only', start: '2025-12-01', end: '2025-12-15' }
    ],
    audit: [
      { id: 'a1', user: 'Dr. Patel', action: 'View', target: 'Record', at: '2025-12-15T10:20:12' },
      { id: 'a2', user: 'Dr. Patel', action: 'Update', target: 'Diagnosis', at: '2025-12-15T10:22:10', details: 'Added E11.9' },
      { id: 'a3', user: 'System', action: 'Download', target: 'Lab Report', at: '2025-12-13T09:12:00', details: 'HbA1c PDF' }
    ]
  },
  'P-10401': {
    patient: { id: 'P-10401', name: 'Rajiv Kumar', dob: '1975-11-03', sex: 'Male', bloodGroup: 'O+', status: 'Active' },
    summary: { recordId: 'HR-2025-00248', updatedAt: '2025-12-12T14:05:00', primaryDiagnosis: 'Hypertension', lastLabSummary: { name: 'Cholesterol (LDL)', value: '160', units: 'mg/dL', date: '2025-12-11' } },
    diagnoses: [
      { id: 'd10', date: '2022-05-19', clinician: 'Dr. Rao', facility: 'City Hospital', type: 'Chronic', code: 'I10', name: 'Essential (primary) hypertension', notes: 'Amlodipine 5mg' }
    ],
    labs: [
      { id: 'l10', name: 'LDL Cholesterol', value: '160', units: 'mg/dL', refRange: '< 100', date: '2025-12-11', orderingDoctor: 'Dr. Rao', lab: 'Central Lab', files: [] }
    ],
    doctors: [
      { id: 'u2', name: 'Dr. Rao', role: 'Physician', access: 'write' },
      { id: 'u4', name: 'Dr. Singh', role: 'Cardiologist', access: 'read' }
    ],
    consentHistory: [
      { id: 'c10', grantedTo: 'Dr. Rao', scope: 'Full access', start: '2025-12-05', end: '2025-12-25' }
    ],
    audit: [
      { id: 'a10', user: 'Dr. Rao', action: 'View', target: 'Record', at: '2025-12-12T14:00:00' }
    ]
  },
  'P-10552': {
    patient: { id: 'P-10552', name: 'Zoya Khan', dob: '2015-08-22', sex: 'Female', bloodGroup: 'A+', status: 'Active' },
    summary: { recordId: 'HR-2025-00312', updatedAt: '2025-12-18T09:15:00', primaryDiagnosis: 'Bronchial Asthma', lastLabSummary: { name: 'Eosinophil Count', value: '450', units: 'cells/mcL', date: '2025-12-10' } },
    diagnoses: [
      { id: 'd20', date: '2021-03-15', clinician: 'Dr. Mehta', facility: 'Childrens Clinic', type: 'Chronic', code: 'J45.909', name: 'Unspecified asthma', notes: 'Inhaler therapy started' }
    ],
    labs: [
      { id: 'l20', name: 'Eosinophil Count', value: '450', units: 'cells/mcL', refRange: '0 – 400', date: '2025-12-10', orderingDoctor: 'Dr. Mehta', lab: 'Childrens Clinic', files: [] }
    ],
    doctors: [
      { id: 'u5', name: 'Dr. Mehta', role: 'Pediatrician', access: 'write' }
    ],
    consentHistory: [
      { id: 'c20', grantedTo: 'Dr. Mehta', scope: 'Full access', start: '2025-12-10', end: '2025-12-30' }
    ],
    audit: [
      { id: 'a20', user: 'Dr. Mehta', action: 'Update', target: 'Lab Result', at: '2025-12-10T11:00:00' }
    ]
  },

  'P-10688': {
    patient: { id: 'P-10688', name: 'Sanjay Vishwakarma', dob: '1955-12-30', sex: 'Male', bloodGroup: 'AB-', status: 'Outpatient' },
    summary: { recordId: 'HR-2025-00455', updatedAt: '2025-12-20T16:45:00', primaryDiagnosis: 'Atrial Fibrillation', lastLabSummary: { name: 'INR', value: '2.4', units: 'ratio', date: '2025-12-19' } },
    diagnoses: [
      { id: 'd30', date: '2024-11-20', clinician: 'Dr. Singh', facility: 'Heart Center', type: 'Chronic', code: 'I48.91', name: 'Atrial fibrillation', notes: 'Warfarin dosage adjusted' }
    ],
    labs: [
      { id: 'l30', name: 'INR', value: '2.4', units: 'ratio', refRange: '2.0 – 3.0', date: '2025-12-19', orderingDoctor: 'Dr. Singh', lab: 'Heart Center', files: [] }
    ],
    doctors: [
      { id: 'u4', name: 'Dr. Singh', role: 'Cardiologist', access: 'write' }
    ],
    consentHistory: [
      { id: 'c30', grantedTo: 'Dr. Singh', scope: 'Full access', start: '2025-12-19', end: '2026-01-19' }
    ],
    audit: [
      { id: 'a30', user: 'Dr. Singh', action: 'View', target: 'Record', at: '2025-12-20T16:40:00' }
    ]
  },

  'P-10899': {
    patient: { id: 'P-10899', name: 'Priya Das', dob: '1995-03-25', sex: 'Female', bloodGroup: 'O+', status: 'Active' },
    summary: { recordId: 'HR-2025-00622', updatedAt: '2025-12-21T14:20:00', primaryDiagnosis: 'Pregnancy - 24 Weeks', lastLabSummary: { name: 'OGTT', value: '142', units: 'mg/dL', date: '2025-12-18' } },
    diagnoses: [
      { id: 'd50', date: '2025-07-10', clinician: 'Dr. Lakshmi', facility: 'Maternity Wing', type: 'Chronic', code: 'Z34.02', name: 'Prenatal supervision', notes: 'Routine checkup' }
    ],
    labs: [
      { id: 'l50', name: 'OGTT', value: '142', units: 'mg/dL', refRange: '< 140', date: '2025-12-18', orderingDoctor: 'Dr. Lakshmi', lab: 'Maternity Lab', files: [] }
    ],
    doctors: [
      { id: 'u6', name: 'Dr. Lakshmi', role: 'Obstetrician', access: 'write' }
    ],
    consentHistory: [
      { id: 'c50', grantedTo: 'Dr. Lakshmi', scope: 'Full access', start: '2025-07-10', end: '2026-04-10' }
    ],
    audit: [
      { id: 'a50', user: 'Dr. Lakshmi', action: 'Update', target: 'Lab Result', at: '2025-12-18T16:00:00' }
    ]
  },

  'P-11340': {
    patient: { id: 'P-11340', name: 'Vikram Malhotra', dob: '1972-09-15', sex: 'Male', bloodGroup: 'A+', status: 'Active' },
    summary: { recordId: 'HR-2025-01022', updatedAt: '2025-12-21T11:00:00', primaryDiagnosis: 'Chronic Kidney Disease', lastLabSummary: { name: 'Creatinine', value: '2.1', units: 'mg/dL', date: '2025-12-18' } },
    diagnoses: [
      { id: 'd90', date: '2024-05-10', clinician: 'Dr. Reddy', facility: 'Metropolis Nephro', type: 'Chronic', code: 'N18.3', name: 'CKD Stage 3', notes: 'Dietary restrictions advised' }
    ],
    labs: [
      { id: 'l90', name: 'Serum Creatinine', value: '2.1', units: 'mg/dL', refRange: '0.7 – 1.3', date: '2025-12-18', orderingDoctor: 'Dr. Reddy', lab: 'Central Lab', files: [] }
    ],
    doctors: [
      { id: 'u9', name: 'Dr. Reddy', role: 'Nephrologist', access: 'write' }
    ],
    consentHistory: [
      { id: 'c90', grantedTo: 'Dr. Reddy', scope: 'Full access', start: '2024-05-10', end: '2025-12-31' }
    ],
    audit: [
      { id: 'a90', user: 'Dr. Reddy', action: 'Update', target: 'Lab Result', at: '2025-12-21T10:55:00' }
    ]
  },

  'P-11522': {
    patient: { id: 'P-11522', name: 'Ishaan Deshmukh', dob: '2010-11-05', sex: 'Male', bloodGroup: 'AB+', status: 'Inpatient' },
    summary: { recordId: 'HR-2025-01299', updatedAt: '2025-12-21T08:00:00', primaryDiagnosis: 'Dengue Fever', lastLabSummary: { name: 'Platelet Count', value: '85', units: '10^3/uL', date: '2025-12-21' } },
    diagnoses: [
      { id: 'd110', date: '2025-12-19', clinician: 'Dr. Mehta', facility: 'City Hospital', type: 'Acute', code: 'A90', name: 'Dengue fever', notes: 'IV fluids ongoing' }
    ],
    labs: [
      { id: 'l110', name: 'Platelet Count', value: '85', units: '10^3/uL', refRange: '150 – 450', date: '2025-12-21', orderingDoctor: 'Dr. Mehta', lab: 'Central Lab', files: [] }
    ],
    doctors: [
      { id: 'u5', name: 'Dr. Mehta', role: 'Pediatrician', access: 'write' }
    ],
    consentHistory: [
      { id: 'c110', grantedTo: 'Dr. Mehta', scope: 'Full access', start: '2025-12-19', end: '2025-12-26' }
    ],
    audit: [
      { id: 'a110', user: 'Dr. Mehta', action: 'Update', target: 'Lab Result', at: '2025-12-21T08:15:00' }
    ]
  },
  'P-12001': {
    patient: { id: 'P-12001', name: 'Arjun Mehra', dob: '1988-02-14', sex: 'Male', bloodGroup: 'B-', status: 'Outpatient' },
    summary: { recordId: 'HR-2025-01422', updatedAt: '2025-12-21T18:30:00', primaryDiagnosis: 'Lumbar Disc Prolapse', lastLabSummary: { name: 'CRP', value: '12', units: 'mg/L', date: '2025-12-20' } },
    diagnoses: [
      { id: 'd120', date: '2025-11-05', clinician: 'Dr. Kapoor', facility: 'Spine Center', type: 'Chronic', code: 'M51.26', name: 'Other intervertebral disc displacement', notes: 'Physiotherapy recommended' }
    ],
    labs: [
      { id: 'l120', name: 'C-Reactive Protein', value: '12', units: 'mg/L', refRange: '< 3.0', date: '2025-12-20', orderingDoctor: 'Dr. Kapoor', lab: 'Central Lab', files: [] }
    ],
    doctors: [
      { id: 'u11', name: 'Dr. Kapoor', role: 'Orthopedic Surgeon', access: 'write' }
    ],
    consentHistory: [
      { id: 'c120', grantedTo: 'Dr. Kapoor', scope: 'Full access', start: '2025-11-05', end: '2026-05-05' }
    ],
    audit: [
      { id: 'a120', user: 'Dr. Kapoor', action: 'Update', target: 'Treatment Plan', at: '2025-12-21T18:25:00' }
    ]
  },

  'P-12150': {
    patient: { id: 'P-12150', name: 'Sunita Kulkarni', dob: '1950-06-10', sex: 'Female', bloodGroup: 'A-', status: 'Inpatient' },
    summary: { recordId: 'HR-2025-01588', updatedAt: '2025-12-21T20:00:00', primaryDiagnosis: 'Ischemic Stroke', lastLabSummary: { name: 'PT/INR', value: '1.2', units: 'ratio', date: '2025-12-21' } },
    diagnoses: [
      { id: 'd130', date: '2025-12-21', clinician: 'Dr. Varma', facility: 'City Hospital', type: 'Acute', code: 'I63.9', name: 'Cerebral infarction, unspecified', notes: 'Thrombolytic therapy administered' }
    ],
    labs: [
      { id: 'l130', name: 'PT/INR', value: '1.2', units: 'ratio', refRange: '0.8 – 1.1', date: '2025-12-21', orderingDoctor: 'Dr. Varma', lab: 'Hospital Stat Lab', files: [] }
    ],
    doctors: [
      { id: 'u12', name: 'Dr. Varma', role: 'Neurologist', access: 'write' },
      { id: 'u2', name: 'Dr. Rao', role: 'Physician', access: 'read' }
    ],
    consentHistory: [
      { id: 'c130', grantedTo: 'Dr. Varma', scope: 'Full access', start: '2025-12-21', end: '2026-01-21' }
    ],
    audit: [
      { id: 'a130', user: 'Dr. Varma', action: 'View', target: 'CT Scan Result', at: '2025-12-21T19:45:00' }
    ]
  },

  'P-12299': {
    patient: { id: 'P-12299', name: 'Kabir Bakshi', dob: '1992-12-01', sex: 'Male', bloodGroup: 'B+', status: 'Active' },
    summary: { recordId: 'HR-2025-01611', updatedAt: '2025-12-19T11:00:00', primaryDiagnosis: 'Generalized Anxiety Disorder', lastLabSummary: { name: 'TSH', value: '2.4', units: 'uIU/mL', date: '2025-12-15' } },
    diagnoses: [
      { id: 'd140', date: '2025-09-12', clinician: 'Dr. Chopra', facility: 'MindCare Clinic', type: 'Chronic', code: 'F41.1', name: 'Generalized anxiety disorder', notes: 'Cognitive behavioral therapy' }
    ],
    labs: [
      { id: 'l140', name: 'Thyroid Stimulating Hormone', value: '2.4', units: 'uIU/mL', refRange: '0.4 – 4.0', date: '2025-12-15', orderingDoctor: 'Dr. Chopra', lab: 'Central Lab', files: [] }
    ],
    doctors: [
      { id: 'u13', name: 'Dr. Chopra', role: 'Psychiatrist', access: 'write' }
    ],
    consentHistory: [
      { id: 'c140', grantedTo: 'Dr. Chopra', scope: 'Full access', start: '2025-09-12', end: '2026-09-12' }
    ],
    audit: [
      { id: 'a140', user: 'Dr. Chopra', action: 'View', target: 'Progress Note', at: '2025-12-19T10:50:00' }
    ]
  },

  'P-12411': {
    patient: { id: 'P-12411', name: 'Deepika Raman', dob: '1985-05-25', sex: 'Female', bloodGroup: 'AB+', status: 'Active' },
    summary: { recordId: 'HR-2025-01755', updatedAt: '2025-12-20T09:30:00', primaryDiagnosis: 'Polycystic Ovary Syndrome', lastLabSummary: { name: 'Testosterone', value: '85', units: 'ng/dL', date: '2025-12-10' } },
    diagnoses: [
      { id: 'd150', date: '2023-01-20', clinician: 'Dr. Lakshmi', facility: 'Women Care Center', type: 'Chronic', code: 'E28.2', name: 'Polycystic ovarian syndrome', notes: 'Weight management advised' }
    ],
    labs: [
      { id: 'l150', name: 'Total Testosterone', value: '85', units: 'ng/dL', refRange: '15 – 70', date: '2025-12-10', orderingDoctor: 'Dr. Lakshmi', lab: 'Women Care Lab', files: [] }
    ],
    doctors: [
      { id: 'u6', name: 'Dr. Lakshmi', role: 'Obstetrician', access: 'write' }
    ],
    consentHistory: [
      { id: 'c150', grantedTo: 'Dr. Lakshmi', scope: 'Full access', start: '2023-01-20', end: '2026-01-20' }
    ],
    audit: [
      { id: 'a150', user: 'Dr. Lakshmi', action: 'View', target: 'Lab History', at: '2025-12-20T09:25:00' }
    ]
  },

  'P-12566': {
    patient: { id: 'P-12566', name: 'Harish Gupta', dob: '1962-11-20', sex: 'Male', bloodGroup: 'O-', status: 'Discharged' },
    summary: { recordId: 'HR-2025-01890', updatedAt: '2025-12-21T12:00:00', primaryDiagnosis: 'Post-Op Cataract Surgery', lastLabSummary: { name: 'Glucose (Random)', value: '110', units: 'mg/dL', date: '2025-12-21' } },
    diagnoses: [
      { id: 'd160', date: '2025-12-21', clinician: 'Dr. Shah', facility: 'Eye Institute', type: 'Surgical', code: 'H25.9', name: 'Age-related cataract, unspecified', notes: 'Phacoemulsification successful' }
    ],
    labs: [
      { id: 'l160', name: 'Random Blood Sugar', value: '110', units: 'mg/dL', refRange: '70 – 140', date: '2025-12-21', orderingDoctor: 'Dr. Shah', lab: 'Eye Inst Lab', files: [] }
    ],
    doctors: [
      { id: 'u14', name: 'Dr. Shah', role: 'Ophthalmologist', access: 'write' }
    ],
    consentHistory: [
      { id: 'c160', grantedTo: 'Dr. Shah', scope: 'Full access', start: '2025-12-20', end: '2025-12-22' }
    ],
    audit: [
      { id: 'a160', user: 'System', action: 'Archive', target: 'Surgical Record', at: '2025-12-21T15:00:00' }
    ]
  }
}


export const PATIENT_LIST = Object.values(DB).map(({ patient, summary }) => ({
  id: patient.id,
  name: patient.name,
  dob: patient.dob,
  sex: patient.sex,
  bloodGroup: patient.bloodGroup,
  status: patient.status,
  primaryDiagnosis: summary.primaryDiagnosis,
  lastUpdated: summary.updatedAt
}))

export function getBundleById(id){
  return DB[id] || null
}
