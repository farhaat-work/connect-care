

import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DB } from '../data/db'

export default function PatientList() {
  const [q, setQ] = useState('')
  const navigate = useNavigate()

  const PATIENT_LIST = useMemo(() => {
    return Object.values(DB).map(entry => ({
      ...entry.patient,
      primaryDiagnosis: entry.summary.primaryDiagnosis,
      lastUpdated: entry.summary.updatedAt
    }))
  }, [])

  const rows = useMemo(() => {
    if (!q.trim()) return PATIENT_LIST
    const needle = q.toLowerCase()
    return PATIENT_LIST.filter(p => (
      p.name.toLowerCase().includes(needle) || 
      p.id.toLowerCase().includes(needle) || 
      (p.primaryDiagnosis || '').toLowerCase().includes(needle)
    ))
  }, [q, PATIENT_LIST])

  const getStatusStyles = (status) => {
    const base = "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border "
    switch (status) {
      case 'Active': 
        return base + "bg-emerald-50 text-emerald-700 border-emerald-200"
      case 'Inpatient': 
        return base + "bg-blue-50 text-blue-700 border-blue-200"
      default: 
        return base + "bg-slate-50 text-slate-500 border-slate-200"
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-6 bg-slate-50 min-h-screen">
      
      {/* HEADER & STATS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
            <h1 className="text-2xl font-bold text-slate-800">Patient Directory</h1>
          </div>
          <p className="text-slate-500 text-sm font-medium">
            Centralized Electronic Health Records • <span className="text-blue-600">{PATIENT_LIST.length} Total Records</span>
          </p>
        </div>

        <div className="flex gap-3">
          <div className="px-4 py-2 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col items-center min-w-[110px]">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,0.5)]"></span>
              <span className="text-[10px] uppercase font-black text-slate-400 tracking-tighter">Admitted</span>
            </div>
            <div className="text-xl font-black text-blue-600 leading-none">
              {PATIENT_LIST.filter(p => p.status === 'Inpatient').length}
            </div>
          </div>

          <div className="px-4 py-2 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col items-center min-w-[110px]">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] uppercase font-black text-slate-400 tracking-tighter">Active</span>
            </div>
            <div className="text-xl font-black text-emerald-600 leading-none">
              {PATIENT_LIST.filter(p => p.status === 'Active').length}
            </div>
          </div>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input 
          className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-slate-800 font-medium placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all shadow-sm" 
          placeholder="Search patient name, ID, or primary diagnosis..." 
          value={q} 
          onChange={e => setQ(e.target.value)} 
        />
      </div>

      {/* PATIENT TABLE */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200 text-black">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.15em]">Patient Info</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.15em]">Demographics</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.15em]">Status</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.15em]">Clinical Primary</th>
                <th className="px-6 py-4 text-right text-[10px] font-black uppercase tracking-[0.15em]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map(r => (
                <tr key={r.id} className="hover:bg-slate-50/80 transition-colors group">
                  {/* PATIENT INFO */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black text-sm shadow-md shadow-slate-200">
                        {r.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 leading-tight">{r.name}</div>
                        <div className="text-[10px] font-mono font-bold text-blue-600 uppercase mt-0.5">
                          ID: {r.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  {/* DEMOGRAPHICS (ALIGNED VERTICAL STACK) */}
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center">
                        <span className="text-[9px] font-black uppercase text-blue-500 w-14">Gender</span>
                        <span className="text-xs font-black text-black uppercase tracking-tight">{r.sex}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-[9px] font-black uppercase  text-blue-500 w-14">DOB</span>
                        <span className="text-xs font-black text-black tracking-tight">{r.dob}</span>
                      </div>
                      <div className="mt-0.5 flex items-center">
                        <span className="text-[9px] font-black uppercase  text-blue-500 w-14">Blood</span>
                        <span className="text-[9px] font-black uppercase text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-100 inline-flex items-center gap-1">
                          <span className="h-1 w-1 rounded-full bg-red-500"></span>
                          {r.bloodGroup}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-5">
                    <span className={getStatusStyles(r.status)}>
                      {r.status}
                    </span>
                  </td>

                  {/* DIAGNOSIS */}
                  <td className="px-6 py-5">
                    <div className="text-sm font-bold text-slate-800 truncate max-w-[200px]">
                      {r.primaryDiagnosis}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-tight">
                      Updated: {new Date(r.lastUpdated).toLocaleDateString('en-IN')}
                    </div>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-6 py-5 text-right">
                    <button 
                      className="bg-blue-500 hover:bg-blue-700 text-white text-[10px] font-black uppercase tracking-widest px-5 py-2.5 rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-100" 
                      onClick={() => navigate(`/EHR/patient/${r.id}`)}
                    >
                      Open File
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {rows.length === 0 && (
            <div className="py-24 text-center bg-white">
              <div className="inline-flex p-4 bg-slate-50 rounded-full mb-4">
                <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">No matching records found</p>
              <button onClick={() => setQ('')} className="mt-3 text-blue-600 text-sm font-black uppercase tracking-tighter hover:underline">Clear Search Filter</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

