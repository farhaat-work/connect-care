
export default function HeaderBar({ patient, onSave, onDiscard }) {
  
  // Clinical Status Color Logic
  const getStatusConfig = (status) => {
    switch (status) {
      case 'Inpatient':
        return "bg-blue-50 text-blue-700 border-blue-200 ring-blue-500/20";
      case 'Active':
        return "bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-500/20";
      case 'Outpatient':
        return "bg-indigo-50 text-indigo-700 border-indigo-200 ring-indigo-500/20";
      case 'Discharged':
        return "bg-slate-100 text-slate-600 border-slate-300 ring-slate-500/10";
      case 'Inactive':
        return "bg-slate-50 text-slate-400 border-slate-200 opacity-75 ring-transparent";
      default:
        return "bg-amber-50 text-amber-700 border-amber-200 ring-amber-500/20";
    }
  };

  return (
    <div className="bg-white border-b border-slate-200 px-6 py-5 flex flex-wrap items-center justify-between gap-6 sticky top-0 z-50 shadow-sm">
      
      {/* PATIENT IDENTITY SECTION */}
      <div className="flex items-center gap-5">
        <div className="h-14 w-14 rounded-2xl bg-slate-900 flex items-center justify-center text-white text-xl font-black shadow-lg shadow-slate-200">
          {patient.name.charAt(0)}
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-none">
              {patient.name}
            </h1>
            <span className="px-2 py-0.5 bg-slate-100 text-slate-500 font-mono text-[10px] font-bold rounded border border-slate-200 uppercase tracking-tighter">
              UID: {patient.id}
            </span>
          </div>
          
          <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">
            <div className="flex items-center gap-1.5">
              <span className="text-gray-950">DOB</span>
              <span className="text-slate-700">{patient.dob}</span>
            </div>
            <span className="text-slate-200">|</span>
            <div className="flex items-center gap-1.5">
              <span className="text-gray-950">SEX</span>
              <span className="text-slate-700">{patient.sex}</span>
            </div>
            <span className="text-slate-200">|</span>
            <div className="flex items-center gap-1.5">
              <span className="text-gray-950">BLOOD</span>
              <span className="text-rose-600 font-black">{patient.bloodGroup}</span>
            </div>
          </div>
        </div>
      </div>

      {/* STATUS & ACTIONS */}
      <div className="flex items-center gap-6">
        {/* Dynamic Status Badge */}
        <div className="flex flex-col items-end gap-1">
          <span className="text-[9px] font-black text-gray-950 uppercase tracking-[0.2em] pr-1">Clinical Status</span>
          <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ring-4 ${getStatusConfig(patient.status)}`}>
            {patient.status}
          </div>
        </div>

        <div className="h-10 w-[1px] bg-slate-200 mx-2 hidden md:block"></div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button 
            className="px-5 py-2.5 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all active:scale-95"
            onClick={onDiscard}
          >
            Discard
          </button>
          
          <button 
            className="px-6 py-2.5 bg-blue-600 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-blue-700 shadow-md shadow-blue-100 transition-all active:scale-95 flex items-center gap-2"
            onClick={onSave}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}