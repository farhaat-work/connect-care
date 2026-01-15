
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { getBundleById } from '../data/db'
import AccessManagement from '../components/AccessManagement'
import ConsentHistory from '../components/ConsentHistory'
import AuditLog from '../components/AuditLog'

export default function AccessAudit(){
  const { id } = useParams()
  const bundle = getBundleById(id) || getBundleById('P-10293')

  const [doctors, setDoctors] = useState(bundle.doctors)
  const [consentHistory, setConsentHistory] = useState(bundle.consentHistory)
  const [audit, setAudit] = useState(bundle.audit)

  function pushAudit(entry){
    setAudit(a => [{ id: 'a'+Math.random().toString(36).slice(2), at: new Date().toISOString(), ...entry }, ...a])
  }

  function onChangeAccess(id, access){
    setDoctors(ds => ds.map(d => d.id===id? { ...d, access } : d))
    const d = doctors.find(x=>x.id===id)
    pushAudit({ user: 'Admin', action: 'Update', target: 'Access', details: `Changed ${d?.name}'s access to ${access}` })
  }

  return (
    <div className="space-y-4">
      <AccessManagement doctors={doctors} onChange={onChangeAccess} />
      <ConsentHistory items={consentHistory} />
      <AuditLog items={audit} />
    </div>
  )
}
