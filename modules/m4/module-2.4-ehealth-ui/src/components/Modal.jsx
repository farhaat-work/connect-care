
// import React from 'react'

// export default function Modal({ open, title, children, onClose, onConfirm, confirmText = 'Confirm' }) {
//   if (!open) return null
//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-card" onClick={e => e.stopPropagation()}>
//         <div className="modal-head">
//           <h5 className="m-0">{title}</h5>
//           <button className="btn-close" onClick={onClose} />
//         </div>
//         <div className="modal-body">{children}</div>
//         <div className="modal-foot">
//           <button className="btn btn-outline-secondary" onClick={onClose}>Cancel</button>
//           <button className="btn btn-primary" onClick={onConfirm}>{confirmText}</button>
//         </div>
//       </div>
//     </div>
//   )
// }




import React from 'react'

export default function Modal({ open, title, children, onClose, onConfirm, confirmText = 'Confirm' }) {
  if (!open) return null

  return (
    <div 
      className="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-black/30 backdrop-blur-[4px] animate-in fade-in duration-240" 
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg overflow-hidden bg-[#21313b] border border-white/10 rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.44)] transition-all duration-240 ease-[cubic-bezier(.2,.8,.2,1)] animate-in zoom-in-95" 
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h5 className="m-0 text-lg font-bold text-[#e6edf3]">{title}</h5>
          <button 
            className="text-[#9aa5b1] hover:text-white transition-colors text-2xl leading-none" 
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        {/* Modal Body */}
        <div className="px-6 py-6 text-[#e6edf3] text-[0.95rem]">
          {children}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-white/10 bg-white/[0.02]">
          <button 
            className="px-5 py-2.5 rounded-[0.6rem] font-semibold text-[0.95rem] text-[#e6edf3] border border-white/10 bg-transparent transition-all duration-240 ease-[cubic-bezier(.2,.8,.2,1)] hover:bg-white/5" 
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="px-5 py-2.5 rounded-[0.6rem] font-semibold text-[0.95rem] text-white bg-[#7c5cff] border border-transparent transition-all duration-240 ease-[cubic-bezier(.2,.8,.2,1)] hover:bg-[#5b39f5] hover:-translate-y-0.5 shadow-sm" 
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}