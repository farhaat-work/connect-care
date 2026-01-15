

// import { useState } from 'react'

// export default function DiagnosisEditor({ activeItems, onAdd, onResolve }){
//   const [form, setForm] = useState({ name:'', code:'', severity:'', onset:'', notes:'' })

//   function submit(){
//     if(!form.name) return;
//     onAdd({ 
//       id: 'd'+Math.random().toString(36).slice(2), 
//       name: form.name, 
//       code: form.code || '—', 
//       severity: form.severity || '—', 
//       onset: form.onset || '—', 
//       notes: form.notes || '', 
//       date: form.onset || new Date().toISOString().slice(0,10), 
//       clinician: 'Dr. Patel', 
//       facility: 'City Hospital', 
//       type: 'Chronic' 
//     })
//     setForm({ name:'', code:'', severity:'', onset:'', notes:'' })
//   }

//   return (
//     <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
//       {/* CRISP HEADER */}
//       <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
//         <h3 className="font-bold text-slate-900">Diagnosis Management</h3>
//         <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-1 rounded">Record Entry</span>
//       </div>

//       <div className="p-6 space-y-6">
//         {/* INPUT GRID */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
//           <div className="space-y-1.5">
//             <label className="text-xs font-bold text-slate-900">Diagnosis Name</label>
//             <input 
//               className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none transition-colors" 
//               placeholder="Search ICD-10..." 
//               value={form.name} 
//               onChange={e=>setForm(f=>({...f, name:e.target.value}))} 
//             />
//           </div>
          
//           <div className="space-y-1.5">
//             <label className="text-xs font-bold text-slate-900">ICD Code</label>
//             <input 
//               className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm font-mono focus:border-blue-500 outline-none transition-colors" 
//               value={form.code} 
//               onChange={e=>setForm(f=>({...f, code:e.target.value}))} 
//             />
//           </div>

//           <div className="space-y-1.5">
//             <label className="text-xs font-bold text-slate-900">Severity</label>
//             <select 
//               className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none bg-white"
//               value={form.severity} 
//               onChange={e=>setForm(f=>({...f, severity:e.target.value}))}
//             >
//               <option value="">Select Level</option>
//               <option>Mild</option>
//               <option>Moderate</option>
//               <option>Severe</option>
//             </select>
//           </div>

//           <div className="space-y-1.5">
//             <label className="text-xs font-bold text-slate-900">Onset Date</label>
//             <input 
//               type="date" 
//               className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500" 
//               value={form.onset} 
//               onChange={e=>setForm(f=>({...f, onset:e.target.value}))} 
//             />
//           </div>
//         </div>

//         {/* FULL WIDTH NOTES */}
//         <div className="space-y-1.5">
//           <label className="text-xs font-bold text-slate-900">Notes</label>
//           <textarea 
//             className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 transition-colors" 
//             rows="2" 
//             value={form.notes} 
//             onChange={e=>setForm(f=>({...f, notes:e.target.value}))}
//           ></textarea>
//         </div>

//         {/* ACTION BUTTON */}
//         <div className="flex justify-end pt-2">
//           <button 
//             className="bg-blue-600 text-white text-xs font-bold px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
//             onClick={submit}
//           >
//             Add Diagnosis
//           </button>
//         </div>

//         {/* ACTIVE LIST */}
//         <div className="pt-6 border-t border-slate-100">
//           <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Current Active</h4>
//           <div className="flex flex-wrap gap-2">
//             {activeItems.map(d => (
//               <div key={d.id} className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
//                 <span className="text-xs font-bold text-slate-700">{d.name}</span>
//                 <button 
//                   className="text-[10px] text-rose-600 font-bold hover:underline" 
//                   onClick={()=>onResolve(d)}
//                 >
//                   Resolve
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

import { useState } from 'react'

// Sample ICD-10 Database
const ICD_10_LIBRARY = [
  { name: 'Essential (primary) hypertension', code: 'I10' },
  { name: 'Type 2 diabetes mellitus without complications', code: 'E11.9' },
  { name: 'Acute appendicitis with localized peritonitis', code: 'K35.3' },
  { name: 'Low back pain, unspecified', code: 'M54.5' },
  { name: 'Atherosclerotic heart disease', code: 'I25.1' },
];

export default function DiagnosisEditor({ activeItems, onAdd, onResolve }){
  const [form, setForm] = useState({ name:'', code:'', severity:'', onset:'', notes:'' })
  const [showSuggestions, setShowSuggestions] = useState(false)

  // Filter suggestions based on what the user types
  const filteredSuggestions = ICD_10_LIBRARY.filter(item => 
    item.name.toLowerCase().includes(form.name.toLowerCase()) || 
    item.code.toLowerCase().includes(form.name.toLowerCase())
  ).slice(0, 5); // Limit to top 5 results

  function selectSuggestion(item) {
    setForm(f => ({ ...f, name: item.name, code: item.code }));
    setShowSuggestions(false);
  }

  function submit(){
    if(!form.name) return;
    onAdd({ 
      id: 'd'+Math.random().toString(36).slice(2), 
      name: form.name, 
      code: form.code || '—', 
      severity: form.severity || '—', 
      onset: form.onset || '—', 
      notes: form.notes || '', 
      date: form.onset || new Date().toISOString().slice(0,10), 
      clinician: 'Dr. Patel', 
      facility: 'City Hospital', 
      type: 'Chronic' 
    })
    setForm({ name:'', code:'', severity:'', onset:'', notes:'' })
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
        <h3 className="font-bold text-slate-900">Diagnosis Management</h3>
        <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-1 rounded">Record Entry</span>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          
          {/* DIAGNOSIS NAME WITH SEARCH SUGGESTIONS */}
          <div className="space-y-1.5 relative">
            <label className="text-xs font-bold text-slate-900">Diagnosis Name</label>
            <input 
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none transition-colors" 
              placeholder="Start typing (e.g. Diabetes)..." 
              value={form.name} 
              onFocus={() => setShowSuggestions(true)}
              onChange={e => {
                setForm(f => ({ ...f, name: e.target.value }));
                setShowSuggestions(true);
              }} 
            />
            
            {/* SUGGESTION DROPDOWN */}
            {showSuggestions && form.name.length > 1 && filteredSuggestions.length > 0 && (
              <div className="absolute z-50 w-full bg-white border border-slate-200 rounded-lg shadow-xl mt-1 overflow-hidden">
                {filteredSuggestions.map((item, index) => (
                  <button
                    key={index}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 flex justify-between items-center transition-colors"
                    onClick={() => selectSuggestion(item)}
                  >
                    <span className="font-medium text-slate-700">{item.name}</span>
                    <span className="text-[10px] font-mono font-black text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">{item.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-900">ICD Code (Auto-filled)</label>
            <input 
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm font-mono bg-slate-50 text-slate-500 outline-none" 
              value={form.code} 
              readOnly 
              placeholder="E11.9"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-900">Severity</label>
            <select 
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none bg-white"
              value={form.severity} 
              onChange={e=>setForm(f=>({...f, severity:e.target.value}))}
            >
              <option value="">Select Level</option>
              <option>Mild</option>
              <option>Moderate</option>
              <option>Severe</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-900">Onset Date</label>
            <input 
              type="date" 
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500" 
              value={form.onset} 
              onChange={e=>setForm(f=>({...f, onset:e.target.value}))} 
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-900">Notes</label>
          <textarea 
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 transition-colors" 
            rows="2" 
            value={form.notes} 
            onChange={e=>setForm(f=>({...f, notes:e.target.value}))}
          ></textarea>
        </div>

        <div className="flex justify-end pt-2">
          <button 
            className="bg-blue-600 text-white text-xs font-bold px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
            onClick={submit}
          >
            Add Diagnosis
          </button>
        </div>

        <div className="pt-6 border-t border-slate-100">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Current Active Problems</h4>
          <div className="flex flex-wrap gap-2">
            {activeItems.map(d => (
              <div key={d.id} className="flex items-center gap-3 bg-white border border-slate-200 pl-3 pr-2 py-1.5 rounded-lg shadow-sm">
                <div className="flex flex-col">
                    <span className="text-xs font-black text-slate-900">{d.name}</span>
                    <span className="text-[9px] font-mono font-bold text-blue-500">{d.code}</span>
                </div>
                <button 
                  className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-rose-50 text-slate-300 hover:text-rose-600 transition-colors" 
                  onClick={()=>onResolve(d)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}