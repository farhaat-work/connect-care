// import React from 'react'
// export const Metric = ({value,label})=> {
//     return (
//         <div className='bg-gray-50 p-4 rounded-md'>
//             <p className='text-sm text-gray-500'>{label}</p>
//             <p className='text-lg font-smibold'>{value}</p>
//         </div>
//     )
// }






import React from 'react';

export const Metric = ({ value, label, onClick }) => {
  const accent = '#1DB1A2';

  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick(e);
        }
      }}
      className="
        group relative flex items-start gap-3
        rounded-md border p-4
        bg-white transition-all
        hover:bg-[rgba(29,177,162,0.05)] hover:-translate-y-[1px] hover:shadow-md
        focus:outline-none
      "
      style={{
        // Combined accent: left border + subtle overall border tint
        borderLeft: `4px solid ${accent}`,
        borderColor: `${accent}20`, // gentle border tint
      }}
    >
      {/* Top accent line using a pseudo element for clean rounded corners */}
      <span
        aria-hidden="true"
        className="absolute left-0 right-0 top-0 h-[3px] rounded-t-md"
        style={{ backgroundColor: accent }}
      />

      {/* Accent dot */}
      <span
        aria-hidden="true"
        className="h-2 w-2 mt-1 rounded-full shrink-0"
        style={{ backgroundColor: accent }}
      />

      <div className="flex-1">
        {/* Darker non-numeric text */}
        <p className="text-sm text-gray-700">{label}</p>

        {/* Value in accent */}
        <p
          className="text-lg font-semibold mt-0.5 transition-colors"
          style={{ color: accent }}
        >
          {value}
        </p>
      </div>
    </div>
  );
};
