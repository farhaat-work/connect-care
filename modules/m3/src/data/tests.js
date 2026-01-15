
export const LAB_TESTS = [
  { name: 'HbA1c', units: '%', refRange: '4.0 – 5.6' },
  { name: 'Fasting Glucose', units: 'mg/dL', refRange: '70 – 99' },
  { name: 'LDL Cholesterol', units: 'mg/dL', refRange: '< 100' },
  { name: 'Creatinine', units: 'mg/dL', refRange: '0.74 – 1.35 (M); 0.59 – 1.04 (F)' },
  { name: 'Hemoglobin', units: 'g/dL', refRange: '13.8 – 17.2 (M); 12.1 – 15.1 (F)' },
  { name: 'TSH', units: 'mIU/L', refRange: '0.4 – 4.0' }
]

export function getDefaultsFor(testName){
  const t = LAB_TESTS.find(x => x.name === testName)
  if(!t) return { units: '', refRange: '' }
  return { units: t.units, refRange: t.refRange }
}
