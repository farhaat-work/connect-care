
// import React from 'react'

// export default function StatusBadge({ status }) {
//   const cls = status === 'Active' ? 'badge-active' : 'badge-completed'
//   return <span className={`status-badge ${cls}`}>{status}</span>
// }

import React from 'react'

export default function StatusBadge({ status }) {
  // Mapping logic based on your theme tokens
  const isActive = status === 'Active'
  
  return (
    <span className={`
      inline-flex items-center justify-center px-3 py-1 rounded-full text-[0.85rem] font-bold tracking-wide uppercase transition-all duration-240 ease-[cubic-bezier(.2,.8,.2,1)]
      ${isActive 
        ? 'bg-[#7c5cff]/10 text-[#7c5cff] border border-[#7c5cff]/20 shadow-[0_0_0_4px_rgba(124,92,255,0.1)]' 
        : 'bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/20'
      }
    `}>
      {status}
    </span>
  )
}