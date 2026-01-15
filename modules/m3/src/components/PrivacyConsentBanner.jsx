
export default function PrivacyConsentBanner({ consent, onRequestConsent, onViewConsent }) {
  const isGranted = consent?.status;

  return (
    <div className={`border rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm transition-all ${
      isGranted 
        ? "bg-emerald-50/50 border-emerald-100" 
        : "bg-amber-50/50 border-amber-200 shadow-amber-100/50"
    }`}>
      
      {/* STATUS SECTION */}
      <div className="flex items-center gap-4">
        <div className={`p-2 rounded-xl ${isGranted ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"}`}>
          {isGranted ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">
              Privacy Status
            </span>
            {isGranted && (
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            )}
          </div>
          
          <div className="text-sm">
            {isGranted ? (
              <p className="text-slate-700 font-medium">
                Data access granted to <span className="font-bold text-emerald-700">Dr. {consent?.grantedTo}</span> 
                <span className="mx-2 text-slate-300">|</span> 
                <span className="text-slate-500">Expires: {consent?.end}</span>
              </p>
            ) : (
              <p className="text-slate-700 font-medium">
                No active data sharing consent found for this patient.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ACTIONS SECTION */}
      <div className="flex items-center gap-3 w-full md:w-auto">
        <button 
          className="flex-1 md:flex-none px-5 py-2 text-xs font-bold uppercase tracking-wider text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
          onClick={onViewConsent}
        >
          View Log
        </button>
        
        {!isGranted && (
          <button 
            className="flex-1 md:flex-none px-5 py-2 text-xs font-bold uppercase tracking-wider text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all shadow-md shadow-blue-200 active:scale-95"
            onClick={onRequestConsent}
          >
            Authorize Access
          </button>
        )}
      </div>
    </div>
  )
}