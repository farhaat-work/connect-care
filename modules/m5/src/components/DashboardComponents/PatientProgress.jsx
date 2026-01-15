import React, { useEffect, useState } from 'react';

export const PatientsProgress = ({ total, inPatients, outPatients }) => {
  const inPercent = Math.round((inPatients / total) * 100);
  const outPercent = 100 - inPercent;

  // Local state to control animated width (starts at 0%)
  const [inWidth, setInWidth] = useState(0);
  const [outWidth, setOutWidth] = useState(0);

  useEffect(() => {
    const delayMs = 350;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const timer = setTimeout(() => {
      setInWidth(inPercent);
      setOutWidth(outPercent);
    }, prefersReducedMotion ? 0 : delayMs);

    return () => clearTimeout(timer);
  }, [inPercent, outPercent]);

  return (
    <div className=" group flex justify-center ">
          <div
      className="
         w-[1200px] bg-white
        rounded-md border p-5 md:p-6
        shadow-sm
      "
      style={{
        borderColor: '#dbe5ef',
        boxShadow: '0 4px 20px -4px rgba(33, 45, 63, 0.08)',
        backgroundImage: 'linear-gradient(180deg, #ffffff, #f6fbfc)',
      }}
    >
      {/* Top Accent Line */}
      <span
        className="absolute left-0 top-0 w-full h-[3px] rounded-t-md"
        style={{ backgroundColor: '#1DB1A2' }} // teal accent
        aria-hidden="true"
      />

      <h3 className="text-lg font-semibold text-[#1f2a37] mb-4">
        Patients Status
      </h3>

      {/* In Patients */}
      <div className="mb-5">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-[#49525a] font-bold">In Patients</span>
          <span className="inline-flex items-center gap-1 rounded-md bg-[#e8f7f5] px-2 py-0.5 text-[#106d64] font-medium">
            ({inPercent}%)
          </span>
        </div>

        <div
          className="w-full rounded-full h-3 overflow-hidden"
          style={{ backgroundColor: '#e5eaf0' }}
          role="progressbar"
          aria-valuenow={inPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="In Patients Progress"
        >
          <div
            className="h-full rounded-full transition-[width] duration-3000 ease-out"
            style={{
              width: `${inWidth}%`,
              backgroundImage: 'linear-gradient(90deg, #1DB1A2, #17A092)', // teal
              boxShadow: 'inset 0 0 6px rgba(16, 109, 100, 0.25)',
            }}
          />
        </div>
      </div>

      {/* Out Patients */}
      <div>
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-[#49525a] font-bold">Out Patients</span>
          <span className="inline-flex items-center gap-1 rounded-md bg-[#fff1ed] px-2 py-0.5 text-[#aa4a3a] font-medium">
            {outPatients} ({outPercent}%)
          </span>
        </div>

        <div
          className="w-full rounded-full h-3 overflow-hidden"
          style={{ backgroundColor: '#e5eaf0' }}
          role="progressbar"
          aria-valuenow={outPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Out Patients Progress"
        >
          <div
            className="h-full rounded-full transition-[width] duration-3000 ease-out"
            style={{
              width: `${outWidth}%`,
              backgroundImage: 'linear-gradient(90deg, #F0745A, #E66048)', // coral
              boxShadow: 'inset 0 0 6px rgba(170, 74, 58, 0.25)',
            }}
          />
        </div>
      </div>
    </div>
    </div>
    
  );
};
