
import React, { useMemo, useState } from 'react'

export default function TrendChart({ data=[], width=720, height=280, title='Trend' }){
  const points = useMemo(() => data
    .filter(d => !isNaN(parseFloat(d.value)))
    .map(d => ({ ts: new Date(d.date).getTime(), date: d.date, value: parseFloat(d.value) }))
    .sort((a,b) => a.ts - b.ts), [data])

  if(!points.length) return <div className="text-slate-500">No data to compare.</div>

  const padding = { left: 60, right: 20, top: 36, bottom: 40 }
  const innerW = width - padding.left - padding.right
  const innerH = height - padding.top - padding.bottom

  const minTs = points[0].ts
  const maxTs = points[points.length-1].ts
  const minVal = Math.min(...points.map(p=>p.value))
  const maxVal = Math.max(...points.map(p=>p.value))
  const valPad = (maxVal - minVal) * 0.15 || 1
  const yMin = minVal - valPad
  const yMax = maxVal + valPad

  function xScale(ts){
    if(maxTs === minTs) return padding.left + innerW/2
    return padding.left + ((ts - minTs) / (maxTs - minTs)) * innerW
  }
  function yScale(v){
    if(yMax === yMin) return padding.top + innerH/2
    return padding.top + (1 - (v - yMin) / (yMax - yMin)) * innerH
  }

  const path = points.map((p,i) => `${i===0? 'M':'L'} ${xScale(p.ts)} ${yScale(p.value)}`).join(' ')

  // Compute ticks (max 4 x-ticks, 4 y-ticks)
  const xTickCount = Math.min(4, points.length)
  const xStep = Math.max(1, Math.floor(points.length / xTickCount))
  const xTicks = points.filter((_,i) => i % xStep === 0)
  const yTicks = [yMin, (yMin+yMax)/2, yMax]

  // Tooltip state
  const [hover, setHover] = useState(null) // {x,y,value,date}

  return (
    <svg width={width} height={height} className="bg-white border border-slate-200 rounded">
      {/* Title */}
      <text x={padding.left} y={padding.top-14} className="fill-slate-800" fontSize="15" fontWeight="600">{title}</text>

      {/* Gridlines */}
      {yTicks.map((t, i) => (
        <line key={'yg'+i} x1={padding.left} y1={yScale(t)} x2={padding.left+innerW} y2={yScale(t)} stroke="#e2e8f0" />
      ))}

      {/* Axes */}
      <line x1={padding.left} y1={padding.top} x2={padding.left} y2={padding.top+innerH} stroke="#94a3b8" strokeWidth="1" />
      <line x1={padding.left} y1={padding.top+innerH} x2={padding.left+innerW} y2={padding.top+innerH} stroke="#94a3b8" strokeWidth="1" />

      {/* Y ticks */}
      {yTicks.map((t, i) => (
        <g key={'yt'+i}>
          <text x={padding.left-8} y={yScale(t)+4} textAnchor="end" className="fill-slate-600" fontSize="12">{t.toFixed(1)}</text>
        </g>
      ))}

      {/* X ticks */}
      {xTicks.map((t, i) => (
        <g key={'xt'+i}>
          <text x={xScale(t.ts)} y={padding.top+innerH+18} textAnchor="middle" className="fill-slate-600" fontSize="12">{new Date(t.ts).toLocaleDateString()}</text>
        </g>
      ))}

      {/* Line path */}
      <path d={path} fill="none" stroke="#2563eb" strokeWidth="2.5" />

      {/* Points */}
      {points.map((p,i) => (
        <circle key={'pt'+i} cx={xScale(p.ts)} cy={yScale(p.value)} r={3.5} fill="#1d4ed8"
          onMouseEnter={()=>setHover({ x:xScale(p.ts), y:yScale(p.value), value:p.value, date:new Date(p.ts).toLocaleDateString() })}
          onMouseLeave={()=>setHover(null)}
        />
      ))}

      {/* Tooltip */}
      {hover && (
        <g>
          <rect x={hover.x+10} y={hover.y-30} width={120} height={40} rx={6} fill="#1f2937" opacity="0.9" />
          <text x={hover.x+18} y={hover.y-14} className="fill-white" fontSize="12">Value: {hover.value}</text>
          <text x={hover.x+18} y={hover.y} className="fill-white" fontSize="12">Date: {hover.date}</text>
        </g>
      )}
    </svg>
  )
}
