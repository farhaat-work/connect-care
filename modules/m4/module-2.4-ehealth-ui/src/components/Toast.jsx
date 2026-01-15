
// import React from 'react'

// export default function Toast({ show, title = 'Info', message, onClose }) {
//   if (!show) return null
//   return (
//     <div className="toast-box" role="alert">
//       <div className="toast-head">
//         <strong>{title}</strong>
//         <button className="btn-close" onClick={onClose} />
//       </div>
//       <div className="toast-body">{message}</div>
//     </div>
//   )
// }



import React from 'react'

export default function Toast({ show, title = 'Info', message, onClose }) {
  if (!show) return null

  return (
    <div 
      className="fixed bottom-6 right-6 z-[2000] w-[320px] bg-[#21313b] border border-white/10 rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.5)] overflow-hidden animate-in slide-in-from-right-10 fade-in duration-300" 
      role="alert"
    >
      {/* Toast Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/[0.03] border-b border-white/10">
        <div className="flex items-center gap-2">
          {/* Subtle accent dot */}
          <span className="w-2 h-2 rounded-full bg-[#7c5cff] shadow-[0_0_8px_rgba(124,92,255,0.6)]" />
          <strong className="text-[0.9rem] font-bold text-white tracking-tight">{title}</strong>
        </div>
        <button 
          className="text-[#9aa5b1] hover:text-white transition-colors text-xl leading-none" 
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
      </div>

      {/* Toast Body */}
      <div className="px-4 py-4 text-[#e6edf3] text-[0.85rem] leading-relaxed">
        {message}
      </div>

      {/* Optional: Auto-progress bar (visual only) */}
      <div className="h-[3px] w-full bg-white/5">
        <div className="h-full bg-[#7c5cff] w-full origin-left animate-[shrink_3s_linear_forwards]" />
      </div>
    </div>
  )
}