
// export default function ConsentHistory({ items }){
//   return (
//     <div className="card p-4">
//       <h3 className="card-title">Consent History</h3>
//       <div className="mt-3">
//         <table className="table">
//           <thead>
//             <tr>
//               <th className="th">Granted To</th>
//               <th className="th">Scope</th>
//               <th className="th">Start</th>
//               <th className="th">End</th>
//             </tr>
//           </thead>
//           <tbody>
//             {items.map(i => (
//               <tr key={i.id}>
//                 <td className="td">{i.grantedTo}</td>
//                 <td className="td">{i.scope}</td>
//                 <td className="td">{i.start}</td>
//                 <td className="td">{i.end}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }
export default function ConsentHistory({ items }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      {/* HEADER */}
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-teal-100 rounded-lg text-teal-600">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="font-bold text-slate-800 tracking-tight">Patient Consent Log</h3>
        </div>
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-white border border-slate-200 px-2 py-1 rounded-md">
          Record Count: {items.length}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-6 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100">Granted To</th>
              <th className="px-6 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100">Access Scope</th>
              <th className="px-6 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100">Validity Period</th>
              <th className="px-6 py-3 text-right text-[11px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((i) => {
              const isExpired = new Date(i.end) < new Date();
              return (
                <tr key={i.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-700">Dr. {i.grantedTo}</div>
                    <div className="text-[10px] text-slate-400 font-mono italic">Signature ID: auth_{i.id.slice(0,5)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100 uppercase tracking-tighter">
                      {i.scope}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-500">{i.start}</span>
                      <svg className="w-3 h-3 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                      <span className="font-medium text-slate-500">{i.end}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {isExpired ? (
                      <span className="text-[10px] font-black text-slate-400 uppercase bg-slate-100 px-2 py-1 rounded">Expired</span>
                    ) : (
                      <span className="text-[10px] font-black text-emerald-600 uppercase bg-emerald-50 border border-emerald-100 px-2 py-1 rounded">Active</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* FOOTER LEGEND */}
      <div className="px-6 py-3 bg-slate-50 border-t border-slate-200">
        <p className="text-[10px] text-slate-400 italic font-medium">
          Note: Patient consent is legally binding. All modifications are timestamped and archived.
        </p>
      </div>
    </div>
  );
}