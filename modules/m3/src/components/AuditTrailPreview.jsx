
export default function AuditTrailPreview({ items }) {
  const recent = items.slice(0, 5)

  // Minimalist action styling for preview mode
  const getActionColor = (action) => {
    const act = action.toLowerCase();
    if (act.includes('delete') || act.includes('revoke')) return "text-rose-600";
    if (act.includes('update') || act.includes('edit')) return "text-amber-600";
    return "text-blue-600";
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col h-full">
      {/* COMPACT HEADER */}
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-4 bg-slate-800 rounded-full"></div>
          <h3 className="font-black text-slate-800 text-sm tracking-tight uppercase">
            Recent Activity Log
          </h3>
        </div>
        <span className="text-[10px] font-bold text-slate-400 bg-white border border-slate-200 px-2 py-0.5 rounded-full shadow-sm">
          Live Feed
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white">
              <th className="px-5 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">User</th>
              <th className="px-5 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Action</th>
              <th className="px-5 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Time</th>
              <th className="px-5 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Log Entry</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {recent.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-3">
                  <span className="text-xs font-bold text-slate-700">{row.user}</span>
                </td>
                <td className="px-5 py-3">
                  <span className={`text-[11px] font-black uppercase tracking-tighter ${getActionColor(row.action)}`}>
                    {row.action}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="text-[10px] font-bold text-slate-500 whitespace-nowrap">
                    {new Date(row.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </td>
                <td className="px-5 py-3">
                  <p className="text-xs text-slate-500 truncate max-w-[150px] italic">
                    {row.details || 'System event'}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* VIEW ALL CTA */}
      <div className="mt-auto border-t border-slate-100 bg-slate-50/30 p-3 text-center">
        {/* <button className="text-[11px] font-black text-blue-600 hover:text-blue-700 uppercase tracking-widest transition-all">
          View Full Security Audit →
        </button> */}
      </div>
    </div>
  )
}