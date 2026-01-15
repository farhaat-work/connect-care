
// export default function ConsentDetails({ consentHistory, activeConsent }){
//   return (
//     <div className="space-y-4">
//       <div>
//         <div className="card-title">Active Consent</div>
//         {activeConsent ? (
//           <div className="mt-2">
//             <div className="text-sm"><span className="label">Granted To:</span> {activeConsent.grantedTo}</div>
//             <div className="text-sm"><span className="label">Scope:</span> {activeConsent.scope || '—'}</div>
//             <div className="text-sm"><span className="label">Start:</span> {activeConsent.start}</div>
//             <div className="text-sm"><span className="label">End:</span> {activeConsent.end}</div>
//           </div>
//         ) : (
//           <div className="badge badge-yellow">No active consent</div>
//         )}
//       </div>

//       <div>
//         <div className="card-title">Consent History</div>
//         <div className="mt-2">
//           <table className="table">
//             <thead>
//               <tr>
//                 <th className="th">Granted To</th>
//                 <th className="th">Scope</th>
//                 <th className="th">Start</th>
//                 <th className="th">End</th>
//               </tr>
//             </thead>
//             <tbody>
//               {consentHistory.map((i) => (
//                 <tr key={i.id}>
//                   <td className="td">{i.grantedTo}</td>
//                   <td className="td">{i.scope}</td>
//                   <td className="td">{i.start}</td>
//                   <td className="td">{i.end}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   )
// }

export default function ConsentDetails({ consentHistory, activeConsent }) {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* ACTIVE AUTHORIZATION SECTION */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1.5 h-4 bg-blue-600 rounded-full"></div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
            Active Authorization
          </h3>
        </div>

        {activeConsent ? (
          <div className="bg-slate-950 rounded-2xl p-6 text-white shadow-xl shadow-slate-200 relative overflow-hidden border border-slate-800">
            {/* Background Decorative Icon */}
            <div className="absolute top-[-20px] right-[-20px] opacity-10">
              <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block mb-1">Granted To</label>
                  <div className="text-2xl font-black tracking-tight">{activeConsent.grantedTo}</div>
                </div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-[10px] font-black text-emerald-400 uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Currently Valid
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 border-l border-slate-800 pl-8">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Access Start</label>
                  <div className="text-sm font-bold font-mono text-slate-200">{activeConsent.start}</div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Access End</label>
                  <div className="text-sm font-bold font-mono text-slate-200">{activeConsent.end}</div>
                </div>
                <div className="col-span-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Scope of Access</label>
                  <div className="text-sm font-medium text-slate-400 leading-relaxed italic">
                    "{activeConsent.scope || 'Full Clinical Record Access'}"
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex items-center gap-4">
            <div className="p-3 bg-amber-100 rounded-xl text-amber-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
              </svg>
            </div>
            <div>
              <div className="text-xs font-black text-amber-900 uppercase tracking-wider">Restricted Access</div>
              <p className="text-[11px] font-bold text-amber-700/70 mt-0.5">Patient has not authorized any active third-party provider access.</p>
            </div>
          </div>
        )}
      </section>

      {/* CONSENT HISTORY SECTION */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1.5 h-4 bg-slate-300 rounded-full"></div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
            Authorization History
          </h3>
        </div>

        <div className="card shadow-sm border border-slate-200 rounded-2xl overflow-hidden">
          <table className="table w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="th px-6 py-4">Authorized Provider</th>
                <th className="th px-6 py-4">Scope</th>
                <th className="th px-6 py-4 text-center">Duration</th>
                <th className="th px-6 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {consentHistory.map((i) => (
                <tr key={i.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="td px-6 py-5">
                    <div className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors">{i.grantedTo}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mt-0.5 font-mono">ID: {i.id.slice(0, 8)}</div>
                  </td>
                  <td className="td px-6 py-5">
                    <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                      {i.scope}
                    </span>
                  </td>
                  <td className="td px-6 py-5 text-center">
                    <div className="flex flex-col items-center gap-0.5 text-[10px] font-black font-mono text-slate-500">
                      <span>{i.start}</span>
                      <div className="h-2 w-[1px] bg-slate-200"></div>
                      <span>{i.end}</span>
                    </div>
                  </td>
                  <td className="td px-6 py-5 text-right">
                    <span className="badge-gray px-2 py-0.5 bg-slate-100 text-slate-500 text-[9px] font-black uppercase rounded">
                      Expired
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}