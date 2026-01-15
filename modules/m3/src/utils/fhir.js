
export function toFHIR({ patient, diagnoses, labResults }){
  return {
    resourceType: 'Bundle',
    type: 'collection',
    entry: [
      {
        resource: {
          resourceType: 'Patient',
          id: patient.id,
          name: [{ text: patient.name }],
          gender: patient.sex?.toLowerCase(),
          birthDate: patient.dob,
          extension: [{ url: 'bloodGroup', valueString: patient.bloodGroup }]
        }
      },
      ...diagnoses.map(d => ({
        resource: {
          resourceType: 'Condition',
          id: d.id,
          code: { text: d.name, coding: [{ system: 'ICD-10', code: d.code }] },
          recordedDate: d.date,
          note: [{ text: d.notes }]
        }
      })),
      ...labResults.map(l => ({
        resource: {
          resourceType: 'Observation',
          id: l.id,
          code: { text: l.name },
          valueQuantity: { value: parseFloat(l.value), unit: l.units },
          referenceRange: [{ text: l.refRange }],
          effectiveDateTime: l.date
        }
      }))
    ]
  }
}
