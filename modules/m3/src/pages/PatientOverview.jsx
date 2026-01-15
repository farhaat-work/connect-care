
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getBundleById } from '../data/db'
import HeaderBar from '../components/HeaderBar'
import RecordSummaryCard from '../components/RecordSummaryCard'
import DiagnosesTimeline from '../components/DiagnosesTimeline'
import LabResults from '../components/LabResults'
import DiagnosisEditor from '../components/DiagnosisEditor'
import PrivacyConsentBanner from '../components/PrivacyConsentBanner'
import AuditTrailPreview from '../components/AuditTrailPreview'
import FooterBar from '../components/FooterBar'
import Modal from '../components/Modal'
import ConsentDetails from '../components/ConsentDetails'
import { toFHIR } from '../utils/fhir'
import { downloadJSON } from '../utils/download'

export default function PatientOverview(){
  const { id } = useParams()
  const navigate = useNavigate()
  const bundle = getBundleById(id) || getBundleById('P-10293')

  const [patient, setPatient] = useState(bundle.patient)
  const [summary, setSummary] = useState(bundle.summary)
  const [diagnoses, setDiagnoses] = useState(bundle.diagnoses)
  const [labs, setLabs] = useState(bundle.labs)
  const [audit, setAudit] = useState(bundle.audit)
  const [consentHistory, setConsentHistory] = useState(bundle.consentHistory)
  const [consent, setConsent] = useState(consentHistory[0] ? { status: true, grantedTo: consentHistory[0].grantedTo, end: consentHistory[0].end } : { status: false })
  const [consentOpen, setConsentOpen] = useState(false)

  function pushAudit(entry){
    setAudit(a => [{ id: 'a'+Math.random().toString(36).slice(2), at: new Date().toISOString(), ...entry }, ...a])
  }

  function onSave(){
    pushAudit({ user: 'Dr. Patel', action: 'Update', target: 'Record', details: 'Saved changes' })
    alert('Record saved (demo)')
  }
  function onDiscard(){
    pushAudit({ user: 'Dr. Patel', action: 'Update', target: 'Record', details: 'Discarded changes' })
    alert('Changes discarded (demo)')
  }
  function onLock(){
    pushAudit({ user: 'System', action: 'Update', target: 'Record', details: 'Record locked' })
    setPatient(p => ({ ...p, status: 'Locked' }))
  }

  function addLab(item){
    setLabs(l => [item, ...l])
    setSummary(s => ({ ...s, updatedAt: new Date().toISOString(), lastLabSummary: { name: item.name, value: item.value, units: item.units, date: item.date } }))
    pushAudit({ user: 'Dr. Patel', action: 'Update', target: 'Lab Result', details: `Added ${item.name}` })
  }
  function flagLab(item){
    setLabs(l => l.map(x => x.id === item.id ? { ...x, flagged: !x.flagged } : x))
    const action = item.flagged ? 'Unflagged' : 'Flagged'
    pushAudit({ user: 'Dr. Patel', action: 'Update', target: 'Lab Result', details: `${action} ${item.name}` })
  }

  function addDiagnosis(item){
    setDiagnoses(d => [item, ...d])
    setSummary(s => ({ ...s, updatedAt: new Date().toISOString(), primaryDiagnosis: item.name }))
    pushAudit({ user: 'Dr. Patel', action: 'Update', target: 'Diagnosis', details: `Added ${item.name}` })
  }
  function resolveDiagnosis(item){
    setDiagnoses(d => d.filter(x => x.id !== item.id))
    pushAudit({ user: 'Dr. Patel', action: 'Update', target: 'Diagnosis', details: `Resolved ${item.name}` })
  }

  function viewConsent(){
    setConsentOpen(true)
    pushAudit({ user: 'Dr. Patel', action: 'View', target: 'Consent', details: 'Viewed consent' })
  }
  function requestConsent(){
    const newConsent = { id: 'c'+Math.random().toString(36).slice(2), grantedTo: 'Dr. Patel', scope: 'Full access', start: new Date().toISOString().slice(0,10), end: new Date(Date.now()+7*86400000).toISOString().slice(0,10) }
    setConsentHistory(h => [newConsent, ...h])
    setConsent({ status: true, grantedTo: newConsent.grantedTo, end: newConsent.end })
    pushAudit({ user: 'System', action: 'Update', target: 'Consent', details: 'Consent granted' })
  }

  function backToList(){ navigate('/patients') }
  function printSummary(){ window.print() }
  function exportFHIR(){
    const bundle = toFHIR({ patient, diagnoses, labResults: labs })
    downloadJSON(`FHIR-${patient.id}.json`, bundle)
    pushAudit({ user: 'System', action: 'Download', target: 'FHIR JSON', details: `Exported ${patient.id}` })
  }

  return (
    <div className="space-y-4">
      <HeaderBar patient={patient} onSave={onSave} onDiscard={onDiscard} onLock={onLock} />
      <RecordSummaryCard summary={summary} />
      <DiagnosisEditor activeItems={diagnoses} onAdd={addDiagnosis} onResolve={resolveDiagnosis} />
      <LabResults items={labs} onAdd={addLab} onFlag={flagLab} doctors={bundle.doctors} />
      <PrivacyConsentBanner consent={consent} onViewConsent={viewConsent} onRequestConsent={requestConsent} />
      <AuditTrailPreview items={audit} />
      <FooterBar onBack={backToList} onPrint={printSummary} onExportFHIR={exportFHIR} />

      <Modal open={consentOpen} onClose={()=>setConsentOpen(false)} title="Consent Details">
        <ConsentDetails activeConsent={consentHistory[0]} consentHistory={consentHistory} />
      </Modal>
    </div>
  )
}
