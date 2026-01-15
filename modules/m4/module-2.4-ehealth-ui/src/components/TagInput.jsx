
// import React from 'react'

// export default function TagInput({ suggestions = [], value = [], onChange, placeholder = 'Add medication...' }) {
//   const [input, setInput] = React.useState('')
//   const [filtered, setFiltered] = React.useState([])

//   const addTag = (tag) => {
//     if (!tag) return
//     if (value.includes(tag)) return
//     onChange([...value, tag])
//     setInput('')
//     setFiltered([])
//   }

//   const removeTag = (tag) => onChange(value.filter(t => t !== tag))

//   const onInput = (v) => {
//     setInput(v)
//     if (!v) { setFiltered([]); return }
//     const f = suggestions.filter(s => s.toLowerCase().includes(v.toLowerCase())).slice(0, 5)
//     setFiltered(f)
//   }

//   const onKeyDown = (e) => {
//     if (e.key === 'Enter') {
//       e.preventDefault()
//       addTag(input.trim())
//     }
//     if (e.key === 'Backspace' && !input && value.length) {
//       removeTag(value[value.length - 1])
//     }
//   }

//   return (
//     <div className="tag-input">
//       <div className="tags">
//         {value.map(tag => (
//           <span key={tag} className="tag">
//             {tag}
//             <button type="button" className="remove" onClick={() => removeTag(tag)}>&times;</button>
//           </span>
//         ))}
//         <input
//           className="tag-field"
//           value={input}
//           onChange={e => onInput(e.target.value)}
//           onKeyDown={onKeyDown}
//           placeholder={placeholder}
//         />
//       </div>
//       {filtered.length > 0 && (
//         <div className="suggestions">
//           {filtered.map(s => (
//             <button key={s} type="button" className="suggestion" onClick={() => addTag(s)}>{s}</button>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }



import React from 'react'

export default function TagInput({ suggestions = [], value = [], onChange, placeholder = 'Add medication...' }) {
  const [input, setInput] = React.useState('')
  const [filtered, setFiltered] = React.useState([])

  const addTag = (tag) => {
    if (!tag) return
    if (value.includes(tag)) return
    onChange([...value, tag])
    setInput('')
    setFiltered([])
  }

  const removeTag = (tag) => onChange(value.filter(t => t !== tag))

  const onInput = (v) => {
    setInput(v)
    if (!v) { setFiltered([]); return }
    const f = suggestions.filter(s => s.toLowerCase().includes(v.toLowerCase())).slice(0, 5)
    setFiltered(f)
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag(input.trim())
    }
    if (e.key === 'Backspace' && !input && value.length) {
      removeTag(value[value.length - 1])
    }
  }

  return (
    <div className="relative w-full mb-6">
      {/* Tags Container */}
      <div className={`
        flex flex-wrap items-center gap-[10px] p-3 min-h-[64px] w-full bg-[#21313b] border border-white/10 rounded-xl transition-all duration-240 ease-[cubic-bezier(.2,.8,.2,1)] cursor-text
        focus-within:border-[#7c5cff] focus-within:shadow-[0_0_0_6px_rgba(124,92,255,0.14)] focus-within:bg-[#253742]
      `}>
        {value.map(tag => (
          <span 
            key={tag} 
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#7c5cff] text-white rounded-md font-semibold text-[0.95rem] transition-all"
          >
            {tag}
            <button 
              type="button" 
              className="bg-transparent border-none text-white text-xl leading-none cursor-pointer hover:opacity-80" 
              onClick={() => removeTag(tag)}
            >
              &times;
            </button>
          </span>
        ))}
        
        <input
          className="flex-1 min-w-[250px] bg-transparent border-none outline-none text-[#e6edf3] text-base py-2 placeholder:text-[#9aa5b1] placeholder:text-[1.1rem]"
          value={input}
          onChange={e => onInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={value.length === 0 ? placeholder : ""}
        />
      </div>

      {/* Suggestions Dropdown */}
      {filtered.length > 0 && (
        <div className="absolute top-full left-0 w-full mt-2 bg-[#21313b] border border-white/10 rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.44)] overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
          {filtered.map((s, index) => (
            <button 
              key={s} 
              type="button" 
              className={`
                w-full p-4 text-left text-[#e6edf3] text-[1.1rem] bg-transparent cursor-pointer border-b border-white/10 last:border-none transition-colors
                hover:bg-[#7c5cff]/15
              `} 
              onClick={() => addTag(s)}
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}