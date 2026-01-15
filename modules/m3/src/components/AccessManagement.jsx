

export default function AccessManagement({ doctors, onChange }) {
  function updateAccess(id, access) {
    onChange(id, access)
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      {/* HEADER */}
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-100 rounded-lg text-blue-600">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="font-bold text-slate-800 tracking-tight">Doctor Access Management</h3>
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-200/50 px-2 py-1 rounded">
          Security Protocol
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Medical Professional</th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Department/Role</th>
              <th className="px-6 py-4 text-right text-[11px] font-bold text-slate-500 uppercase tracking-widest">Permission Level</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {doctors.map(d => (
              <tr key={d.id} className="hover:bg-blue-50/30 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs">
                      {d.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="font-bold text-slate-700 group-hover:text-blue-600 transition-colors">{d.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-slate-500">{d.role}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="inline-flex items-center bg-slate-50 border border-slate-200 rounded-lg px-2 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-400 transition-all">
                    <select 
                      className="bg-transparent py-1.5 pr-8 pl-2 text-xs font-bold text-slate-700 outline-none cursor-pointer appearance-none" 
                      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 4px center', backgroundSize: '16px' }}
                      value={d.access} 
                      onChange={e => updateAccess(d.id, e.target.value)}
                    >
                      <option value="read">READ ONLY</option>
                      <option value="write">READ & WRITE</option>
                    </select>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* FOOTER HINT */}
      <div className="p-4 bg-blue-50/50 border-t border-slate-100">
        <p className="text-[10px] text-blue-600 font-medium flex items-center gap-2">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          Changes to permissions are logged in the security audit trail.
        </p>
      </div>
    </div>
  )
}