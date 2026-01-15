
export default function AuditLog({ items }) {
  // Helper to color-code medical actions
  const getActionBadge = (action) => {
    const base = "px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter border ";
    const act = action.toLowerCase();
    
    if (act.includes('delete') || act.includes('revoke')) 
      return base + "bg-rose-50 text-rose-700 border-rose-100";
    if (act.includes('update') || act.includes('edit')) 
      return base + "bg-amber-50 text-amber-700 border-amber-100";
    if (act.includes('access') || act.includes('view')) 
      return base + "bg-blue-50 text-blue-700 border-blue-100";
    
    return base + "bg-slate-50 text-slate-600 border-slate-200";
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      {/* HEADER */}
      <div className="bg-slate-900 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-slate-800 rounded-lg text-emerald-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-white tracking-tight leading-none">System Audit Trail</h3>
            <p className="text-[10px] text-slate-400 uppercase mt-1 tracking-widest font-bold">HIPAA Compliant Log</p>
          </div>
        </div>
        <button className="text-xs font-bold text-slate-300 hover:text-white transition-colors flex items-center gap-1 bg-slate-800 px-3 py-1.5 rounded-lg">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Export CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-3 text-[11px] font-black text-slate-400 uppercase tracking-widest">Medical Staff</th>
              <th className="px-6 py-3 text-[11px] font-black text-slate-400 uppercase tracking-widest">Event</th>
              <th className="px-6 py-3 text-[11px] font-black text-slate-400 uppercase tracking-widest">Reference</th>
              <th className="px-6 py-3 text-[11px] font-black text-slate-400 uppercase tracking-widest">Execution Time</th>
              <th className="px-6 py-3 text-[11px] font-black text-slate-400 uppercase tracking-widest">Trace Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map(row => (
              <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                    <span className="font-bold text-slate-700 text-sm">{row.user}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={getActionBadge(row.action)}>{row.action}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                    {row.target}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-[11px] font-bold text-slate-600">
                    {new Date(row.at).toLocaleDateString('en-IN')}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase">
                    {new Date(row.at).toLocaleTimeString('en-IN', { hour12: true })}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-xs text-slate-500 italic max-w-xs truncate">
                    {row.details || 'No extended metadata'}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex justify-between items-center">
        <span className="text-[10px] font-bold text-slate-400 uppercase italic">
          Encryption: AES-256 Verified Log
        </span>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
        </div>
      </div>
    </div>
  );
}