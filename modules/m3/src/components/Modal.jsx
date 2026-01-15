
import { useEffect } from 'react'

export default function Modal({ open, title, children, onClose }){
  useEffect(() => {
    function onEsc(e){ if(e.key === 'Escape') onClose?.() }
    document.addEventListener('keydown', onEsc)
    return () => document.removeEventListener('keydown', onEsc)
  }, [onClose])

  if(!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      <div className="relative z-10 w-full max-w-3xl card">
        <div className="border-b border-slate-200 px-4 py-3 flex items-center justify-between">
          <h3 className="card-title">{title}</h3>
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  )
}



