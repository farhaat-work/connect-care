import React from 'react'
import StatusBadge from '../components/StatusBadge.jsx'
import pharmacy from '../assets/images/pharmacy.svg'
import { useModule4 } from '../m4context/context.jsx'

export default function PharmacyFulfillment() {
  const {
    prescriptions = [],
    updatePrescriptionStatus,
    deletePrescription,
  } = useModule4()

  const [filter, setFilter] = React.useState('All')
  const [search, setSearch] = React.useState('')

  const filtered = React.useMemo(() => {
    const q = (search || '').toLowerCase().trim()
    return prescriptions.filter(p => {
      const matchesStatus = filter === 'All' ? true : p.Status === filter
      const text = `${p.PrescriptionID} ${p.PatientName} ${p.Dosage} ${p.Remarks || ''} ${p.MedicationList.join(' ')}`.toLowerCase()
      const matchesSearch = !q || text.includes(q)
      return matchesStatus && matchesSearch
    })
  }, [prescriptions, filter, search])

  const total = prescriptions.length
  const active = prescriptions.filter(p => p.Status === 'Active').length
  const completed = prescriptions.filter(p => p.Status === 'Completed').length
  const statuses = ['Active', 'Completed']

  const confirmDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this prescription?")) {
      deletePrescription(id)
    }
  }

  return (
    <div className="max-w-[1200px] mx-auto w-full px-2 md:px-4 py-4">
      
      {/* STATISTICS SECTION */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        <div className="flex flex-col justify-center items-start gap-3 p-6 min-h-[120px] bg-[#21313b] border border-white/10 rounded-2xl shadow-[0_6px_20px_rgba(0,0,0,0.30)]">
          <span className="text-[0.75rem] font-bold uppercase tracking-[1.5px] text-[#9aa5b1]">Total</span>
          <span className="text-[2.75rem] font-extrabold leading-none text-white">{total}</span>
        </div>
        <div className="flex flex-col justify-center items-start gap-3 p-6 min-h-[120px] bg-[#21313b] border border-white/10 rounded-2xl shadow-[0_6px_20px_rgba(0,0,0,0.30)]">
          <span className="text-[0.75rem] font-bold uppercase tracking-[1.5px] text-[#9aa5b1]">Active</span>
          <span className="text-[2.75rem] font-extrabold leading-none text-[#7c5cff]">{active}</span>
        </div>
        <div className="flex flex-col justify-center items-start gap-3 p-6 min-h-[120px] bg-[#21313b] border border-white/10 rounded-2xl shadow-[0_6px_20px_rgba(0,0,0,0.30)]">
          <span className="text-[0.75rem] font-bold uppercase tracking-[1.5px] text-[#9aa5b1]">Completed</span>
          <span className="text-[2.75rem] font-extrabold leading-none text-[#22c55e]">{completed}</span>
        </div>
      </div>

      <div className="relative w-full overflow-hidden border border-white/10 rounded-xl bg-[#21313b] text-[#e6edf3] hover:-translate-y-0.5 transition-all duration-240 ease-[cubic-bezier(.2,.8,.2,1)]">
        <div className="p-4 md:p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-8">
            <img src={pharmacy} alt="Pharmacy" className="h-7" />
            <h4 className="m-0 text-xl font-bold">Medication Fulfillment Tracking</h4>
          </div>

          {/* FILTERS */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8">
            <div className="md:col-span-4 lg:col-span-3">
              <label className="block mb-2 text-sm font-semibold text-[#e6edf3]">Status Filter</label>
              <select 
                className="w-full px-4 py-3 text-[0.95rem] text-[#e6edf3] bg-[#21313b] border border-white/10 rounded-[0.6rem] outline-none appearance-none bg-no-repeat bg-[right_1rem_center] bg-[length:16px] cursor-pointer focus:border-[#7c5cff] focus:ring-4 focus:ring-[#7c5cff]/14 transition-all"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")` }}
                value={filter} 
                onChange={e => setFilter(e.target.value)}
              >
                <option value="All" className="bg-[#21313b]">All</option>
                <option value="Active" className="bg-[#21313b]">Active</option>
                <option value="Completed" className="bg-[#21313b]">Completed</option>
              </select>
            </div>
            <div className="md:col-span-8 lg:col-span-9">
              <label className="block mb-2 text-sm font-semibold text-[#e6edf3]">Search Records</label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-[#9aa5b1]">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  className="w-full pl-11 pr-4 py-3 text-[0.95rem] text-[#e6edf3] bg-[#21313b] border border-white/10 rounded-[0.6rem] outline-none focus:border-[#7c5cff] focus:ring-4 focus:ring-[#7c5cff]/14 transition-all"
                  type="text"
                  placeholder="Search by ID, Patient, or Med..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto border border-white/10 rounded-xl bg-[#21313b]">
            <table className="w-full border-collapse min-w-[1000px] text-[#e6edf3]">
              <thead>
                <tr className="bg-white/[0.07]">
                  <th className="px-4 py-5 text-left text-[0.85rem] font-semibold uppercase tracking-wider border-b border-white/10 w-[100px]">ID</th>
                  <th className="px-4 py-5 text-left text-[0.85rem] font-semibold uppercase tracking-wider border-b border-white/10 w-[180px]">Patient Name</th>
                  <th className="px-4 py-5 text-left text-[0.85rem] font-semibold uppercase tracking-wider border-b border-white/10 w-[250px]">Medication List</th>
                  <th className="px-4 py-5 text-left text-[0.85rem] font-semibold uppercase tracking-wider border-b border-white/10 w-[150px]">Dosage Plan</th>
                  <th className="px-4 py-5 text-left text-[0.85rem] font-semibold uppercase tracking-wider border-b border-white/10 w-[120px]">Status</th>
                  <th className="px-4 py-5 text-right text-[0.85rem] font-semibold uppercase tracking-wider border-b border-white/10 w-[200px]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filtered.map(p => (
                  <tr key={p.PrescriptionID} className="hover:bg-white/[0.02] transition-colors duration-160">
                    <td className="px-4 py-5 font-bold text-[#7c5cff]">{p.PrescriptionID}</td>
                    <td className="px-4 py-5">
                      <div className="font-semibold">{p.PatientName}</div>
                    </td>
                    <td className="px-4 py-5">
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {p.MedicationList.map(m => (
                          <span key={m} className="px-2 py-0.5 text-xs font-medium bg-white/5 border border-white/10 rounded text-[#e6edf3]">{m}</span>
                        ))}
                      </div>
                      {p.Remarks && (
                        <div className="p-2 bg-white/5 rounded border-l-4 border-[#38bdf8]">
                          <p className="text-[0.8rem] leading-relaxed text-[#9aa5b1] italic">"{p.Remarks}"</p>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-5">
                      <span className="font-medium text-[#9aa5b1]">{p.Dosage}</span>
                    </td>
                    <td className="px-4 py-5"><StatusBadge status={p.Status} /></td>
                    <td className="px-4 py-5 text-right">
                      <div className="flex justify-end items-center gap-3">
                        <select
                          className="px-2 py-1 text-xs font-medium bg-[#21313b] border border-white/10 rounded h-[38px] outline-none focus:border-[#7c5cff]"
                          value={p.Status}
                          onChange={e => updatePrescriptionStatus(p.PrescriptionID, e.target.value)}
                        >
                          {statuses.map(s => <option key={s} value={s} className="bg-[#21313b]">{s}</option>)}
                        </select>

                        {p.Status === 'Completed' && (
                          <button
                            className="group relative flex items-center justify-center h-[38px] px-4 rounded-xl border border-red-500/20 bg-red-500/5 text-[#ff6b6b] font-semibold text-[0.95rem] transition-all duration-240 ease-[cubic-bezier(.2,.8,.2,1)] hover:bg-[#ef4444] hover:text-white hover:border-[#ef4444] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(239,68,68,0.3)] active:scale-95"
                            onClick={() => confirmDelete(p.PrescriptionID)}
                          >
                            <i className="bi bi-trash transition-transform group-hover:scale-125 group-hover:-rotate-12"></i>
                            <span className="ml-2 hidden xl:inline">Delete</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-4 py-12 text-center text-[#9aa5b1]">No records found matching your criteria.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}