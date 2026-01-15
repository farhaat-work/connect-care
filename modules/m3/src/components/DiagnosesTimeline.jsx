
import { useMemo, useState } from 'react'
import Modal from './Modal'

export default function DiagnosesTimeline({ items }){
  const [filter, setFilter] = useState('All')
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState(null)
  const filtered = useMemo(() => items.filter(i => filter==='All' || i.type===filter), [items, filter])

  function openDetail(item){ setCurrent(item); setOpen(true) }

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between">
        <h3 className="card-title">Diagnoses Timeline</h3>
        <div className="flex items-center gap-2">
          {['All','Chronic','Acute','Surgical','Obstetric'].map(t => (
            <button key={t} onClick={()=>setFilter(t)} className={"badge " + (filter===t? 'badge-green' : 'badge-gray')}>{t}</button>
          ))}
        </div>
      </div>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th className="th">Date</th>
              <th className="th">Clinician</th>
              <th className="th">Facility</th>
              <th className="th">Type</th>
              <th className="th">Diagnosis</th>
              <th className="th">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(row => (
              <tr key={row.id}>
                <td className="td">{row.date}</td>
                <td className="td">{row.clinician}</td>
                <td className="td">{row.facility}</td>
                <td className="td">{row.type}</td>
                <td className="td">{row.name}</td>
                <td className="td"><button className="btn btn-secondary" onClick={()=>openDetail(row)}>View</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal open={open} onClose={()=>setOpen(false)} title="Diagnosis Detail">
        {current && (
          <div className="space-y-2">
            <div><span className="label">ICD-10:</span> {current.code}</div>
            <div><span className="label">Notes:</span> {current.notes || '—'}</div>
            <div><span className="label">Date:</span> {current.date}</div>
            <div><span className="label">Clinician:</span> {current.clinician}</div>
          </div>
        )}
      </Modal>
    </div>
  )
}
