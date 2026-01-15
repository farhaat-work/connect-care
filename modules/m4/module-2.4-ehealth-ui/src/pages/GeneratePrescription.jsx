import React from 'react'
import Stepper from '../components/Stepper.jsx'
import TagInput from '../components/TagInput.jsx'
import pills from '../assets/images/pills.svg'
import Modal from '../components/Modal.jsx'
import { useModule4 } from '../m4context/context.jsx'

export default function GeneratePrescription() {
  const steps = ['Patient', 'Medications', 'Dosage', 'Remarks', 'Review']
  const [activeStep, setActiveStep] = React.useState(0)
  
  const { patients = [], meds = [], addPrescription } = useModule4();


  const firstPatientId = patients.length > 0 ? patients[0].id : ''
  const firstPatientName = patients.length > 0 ? patients[0].name : ''

  const [patientId, setPatientId] = React.useState(firstPatientId)
  const [patientName, setPatientName] = React.useState(firstPatientName)
  const [medicationList, setMedicationList] = React.useState([])
  const [dosages, setDosages] = React.useState({})
  const [remarks, setRemarks] = React.useState('')
  const [status, setStatus] = React.useState('Active')
  const [previewOpen, setPreviewOpen] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)

  const suggestions = ["Drink hot water", "Regular exercise", "Avoid oily food", "Take rest", "Avoid cold drinks"]

  React.useEffect(() => {
    if (patients.length > 0 && !patientId) {
      setPatientId(patients[0].id)
      setPatientName(patients[0].name)
    }
  }, [patients, patientId])

  const onPatientChange = (id) => {
    const p = patients.find(x => x.id === id)
    setPatientId(id)
    setPatientName(p?.name || '')
    setMedicationList([])
    setDosages({})
    setRemarks('')
  }

  const handleDosageChange = (medName, value) => {
    setDosages(prev => ({ ...prev, [medName]: value }))
  }

  const handleSuggestionClick = (text) => {
    setRemarks(prev => (prev ? `${prev}, ${text}` : text))
  }

  const next = () => setActiveStep(s => Math.min(s + 1, steps.length - 1))
  const back = () => setActiveStep(s => Math.max(s - 1, 0))

  const canNext = () => {
    if (activeStep === 0) return !!patientId
    if (activeStep === 1) return medicationList.length > 0
    if (activeStep === 2) return medicationList.every(m => (dosages[m] ?? '').trim())
    return true
  }

  const confirmCreate = () => {
    const dosageSummary = medicationList.map(m => `${m}: ${dosages[m] ?? ''}`).join(', ')
    const payload = {
      PatientID: patientId,
      PatientName: patientName,
      MedicationList: medicationList,
      Dosage: dosageSummary,
      Remarks: remarks,
      Status: status,
    }
    addPrescription?.(payload)
    setPreviewOpen(false)
    setIsSuccess(true)

    setTimeout(() => {
      setIsSuccess(false)
      setActiveStep(0)
      setMedicationList([])
      setDosages({})
      setRemarks('')
    }, 2500)
  }

  const dataReady = patients.length > 0 && meds.length > 0

  return (
    <div className="relative w-full max-w-full overflow-hidden transition-all duration-240 ease-[cubic-bezier(.2,.8,.2,1)] border border-white/10 rounded-xl bg-[#21313b] text-[#e6edf3] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,0,0,0.3)]">
      {/* Success Screen Overlay */}
      {isSuccess && (
        <div className="absolute inset-0 z-[500] flex items-center justify-center bg-[#121621]/98 backdrop-blur-md rounded-xl animate-in fade-in duration-400 px-3">
          <div className="w-full max-w-[400px] text-center text-white p-8">
            <h4 className="text-xl font-bold mb-2">Prescription Generated</h4>
            <p className="text-[#9aa5b1]">Successfully recorded for {patientName || 'patient'}.</p>
          </div>
        </div>
      )}

      <div className="p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <img src={pills} alt="pills" className="h-7 drop-shadow-[0_2px_10px_rgba(124,92,255,0.25)]" />
          <h3 className="m-0 text-xl md:text-2xl font-bold tracking-tight">Generate E‑Prescription</h3>
        </div>

        <Stepper steps={steps} active={activeStep} />

        {!dataReady ? (
          <div className="mt-8 text-[#9aa5b1]">
            <p className="mb-1">Loading required data…</p>
            {patients.length === 0 && <p>No patients available.</p>}
            {meds.length === 0 && <p>No medications available.</p>}
          </div>
        ) : (
          <>
            <div className="mt-8">
              {/* STEP 0: PATIENT SELECTION */}
              {activeStep === 0 && (
                <div className="block mb-4">
                  <label className="block mb-1 text-[0.95rem] font-semibold text-[#e6edf3]">Patient</label>
                  <select
                    className="w-full px-4 py-3 text-[0.95rem] text-[#e6edf3] bg-[#21313b] border border-white/10 rounded-[0.6rem] outline-none transition-all duration-240 ease-[cubic-bezier(.2,.8,.2,1)] focus:border-[#7c5cff] focus:ring-4 focus:ring-[#7c5cff]/10 appearance-none bg-no-repeat bg-[right_1rem_center] bg-[length:16px] cursor-pointer"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")` }}
                    value={patientId}
                    onChange={e => onPatientChange(e.target.value)}
                  >
                    {patients.map(p => (
                      <option key={p.id} value={p.id} className="bg-[#21313b] text-white p-3">
                        {p.id} — {p.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* STEP 1: MEDICATION SELECTION */}
              {activeStep === 1 && (
                <div className="block mb-4">
                  <label className="block mb-1 text-[0.95rem] font-semibold text-[#e6edf3]">Select Medications</label>
                  <TagInput
                    suggestions={meds}
                    value={medicationList}
                    onChange={setMedicationList}
                    placeholder="Type to search..."
                  />
                </div>
              )}

              {/* STEP 2: DOSAGES */}
              {activeStep === 2 && (
                <div className="block mb-4">
                  <label className="block mb-4 text-[0.95rem] font-semibold text-[#e6edf3]">Assign Dosages</label>
                  {medicationList.map((med, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center mb-4 pb-4 border-b border-white/10 last:border-0">
                      <div className="md:col-span-5">
                        <span className="block w-full p-2 text-sm font-medium text-[#7c5cff] bg-[#7c5cff]/10 rounded truncate">
                          {med}
                        </span>
                      </div>
                      <div className="md:col-span-7">
                        <input
                          className="w-full px-4 py-3 text-[0.95rem] text-[#e6edf3] bg-[#21313b] border border-white/10 rounded-[0.6rem] outline-none focus:border-[#7c5cff] focus:ring-4 focus:ring-[#7c5cff]/10"
                          type="text"
                          placeholder="e.g. 1-0-1"
                          value={dosages[med] ?? ''}
                          onChange={e => handleDosageChange(med, e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* STEP 3: REMARKS */}
              {activeStep === 3 && (
                <div className="block mb-4">
                  <label className="block mb-1 text-[0.95rem] font-semibold text-[#e6edf3]">Doctor's Remarks / Advice</label>
                  <textarea
                    className="w-full px-4 py-3 mb-4 text-[0.95rem] text-[#e6edf3] bg-[#21313b] border border-white/10 rounded-[0.6rem] outline-none focus:border-[#7c5cff] focus:ring-4 focus:ring-[#7c5cff]/10"
                    rows="3"
                    placeholder="Enter additional advice..."
                    value={remarks}
                    onChange={e => setRemarks(e.target.value)}
                  />
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map(s => (
                      <button
                        key={s}
                        type="button"
                        className="px-4 py-1.5 text-xs font-semibold text-[#e6edf3] bg-transparent border border-white/10 rounded-full transition-all duration-240 ease-[cubic-bezier(.2,.8,.2,1)] hover:bg-white/5"
                        onClick={() => handleSuggestionClick(s)}
                      >
                        + {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 4: REVIEW */}
              {activeStep === 4 && (
                <div className="mt-4 p-4 border border-white/10 rounded-lg bg-white/5 shadow-sm">
                  <div className="mb-2 break-words"><strong>Patient:</strong> {patientName}</div>
                  <div className="mb-2"><strong>Meds:</strong></div>
                  <ul className="mb-2 pl-5 list-disc space-y-1">
                    {medicationList.map(m => (
                      <li key={m} className="break-words">
                        {m}: <span className="text-[#9aa5b1]">{dosages[m] ?? ''}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="break-words">
                    <strong>Remarks:</strong> {remarks || 'No specific remarks'}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col-reverse md:flex-row justify-between mt-8 gap-4 pt-6 border-t border-white/10">
              <button 
                className="w-full md:w-auto px-6 py-3 font-semibold text-[0.95rem] text-[#e6edf3] bg-transparent border border-white/10 rounded-[0.6rem] transition-all duration-240 ease-[cubic-bezier(.2,.8,.2,1)] hover:bg-white/5 disabled:opacity-50" 
                onClick={back} 
                disabled={activeStep === 0}
              >
                Back
              </button>
              {activeStep < steps.length - 1 ? (
                <button 
                  className="w-full md:w-auto px-6 py-3 font-semibold text-[0.95rem] text-white bg-[#7c5cff] border border-transparent rounded-[0.6rem] transition-all duration-240 ease-[cubic-bezier(.2,.8,.2,1)] hover:bg-[#5b39f5] disabled:opacity-50" 
                  onClick={next} 
                  disabled={!canNext()}
                >
                  Next
                </button>
              ) : (
                <button 
                  className="w-full md:w-auto px-6 py-3 font-semibold text-[0.95rem] text-white bg-[#22c55e] border border-transparent rounded-[0.6rem] transition-all duration-240 ease-[cubic-bezier(.2,.8,.2,1)] hover:brightness-110" 
                  onClick={() => setPreviewOpen(true)}
                >
                  Generate
                </button>
              )}
            </div>

            <Modal open={previewOpen} title="Confirm" onClose={() => setPreviewOpen(false)} onConfirm={confirmCreate}>
              <p className="text-[#e6edf3]">Finalize prescription for <strong>{patientName || 'patient'}</strong>?</p>
            </Modal>
          </>
        )}
      </div>
    </div>
  )
}