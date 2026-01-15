
// import React from 'react'

// export default function Stepper({ steps, active }) {
//   return (
//     <div className="stepper">
//       {steps.map((s, i) => (
//         <div key={s} className={`step ${i === active ? 'active' : i < active ? 'done' : ''}`}>
//           <div className="dot">{i+1}</div>
//           <div className="label">{s}</div>
//           {i < steps.length - 1 && <div className="line" />}
//         </div>
//       ))}
//     </div>
//   )
// }




import React from 'react'

export default function Stepper({ steps, active }) {
  return (
    <div className="flex items-center gap-4 p-5 border border-dashed border-white/10 rounded-xl bg-white/[0.03] mb-10 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {steps.map((s, i) => {
        const isActive = i === active;
        const isDone = i < active;

        return (
          <div key={s} className="relative flex items-center gap-3 shrink-0 group">
            {/* Step Number Circle */}
            <div className={`
              w-8 h-8 rounded-full border grid place-items-center font-bold text-[0.85rem] transition-all duration-240
              ${isActive ? 'bg-[#7c5cff] border-[#7c5cff] text-white shadow-[0_0_0_4px_rgba(124,92,255,0.14)]' : ''}
              ${isDone ? 'bg-[#22c55e] border-[#22c55e] text-white' : ''}
              ${!isActive && !isDone ? 'bg-white/10 border-white/10 text-[#9aa5b1]' : ''}
            `}>
              {i + 1}
            </div>

            {/* Step Label */}
            <div className={`
              font-semibold text-[0.9rem] whitespace-nowrap transition-colors duration-240
              ${isActive ? 'text-[#e6edf3]' : 'text-[#9aa5b1]'}
            `}>
              {s}
            </div>

            {/* Connector Line */}
            {i < steps.length - 1 && (
              <div className="w-10 h-[2px] bg-white/10" />
            )}
          </div>
        );
      })}
    </div>
  )
}