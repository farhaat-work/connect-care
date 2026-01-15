import React from 'react';

export const StatCard = ({ Title, count }) => {
  return (
    <div
      className="
        relative
        group flex items-center justify-between
        rounded-xl border
        p-4 md:p-5
        shadow-sm
        transition-[transform,box-shadow] duration-200
        hover:-translate-y-0.5 hover:shadow-md
        cursor-pointer
      "
      style={{
        backgroundImage: 'linear-gradient(180deg, #ffffff, #f6fbfc)',
        borderColor: '#dbe5ef',
        boxShadow: '0 4px 20px -4px rgba(33, 45, 63, 0.08)',
      }}
    >
      {/* Top Accent Line */}
      <span
        className="absolute left-0 top-0 w-full h-[3px] rounded-t-xl"
        style={{ backgroundColor: '#1DB1A2' }}  // Teal accent
        aria-hidden="true"
      />

      <div className="flex flex-col">
        <h2
          className="text-sm font-medium "
          style={{ color: '#58697f' }}
        >
          {Title}
        </h2>

        <h1
          className="mt-1 text-2xl font-semibold tracking-tight"
          style={{ color: '#1DB1A2' }} // matching accent
        >
          {count}
        </h1>
      </div>
    </div>
  );
};
