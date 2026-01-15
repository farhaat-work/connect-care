// import React from 'react'

// export const Reportgeneration = ({ setPeriodType, setSelectedDate, periodType, selectedDate, handleGenerate, setReportSelectionModal }) => {
//     return (
//         <>

//             <div
//                 className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
//                 role="dialog"
//                 aria-modal="true"
//                 aria-labelledby="report-modal-title"
//                 // Close when clicking the backdrop
//                 onClick={(e) => {
//                     if (e.target === e.currentTarget) setReportSelectionModal(prev => !prev);
//                 }}
//             >
//                 {/* Modal panel */}
//                 <div
//                     className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl ring-1 ring-black/10
//                          transition-all duration-200 ease-out
//                          px-6 pt-6 pb-5"
//                     // prevent backdrop close when clicking inside
//                     onClick={(e) => e.stopPropagation()}
//                 >
//                     {/* Header */}
//                     <div className="flex items-center justify-between mb-4">
//                         <h2 id="report-modal-title" className="text-xl font-semibold text-gray-800">
//                             Generate Report
//                         </h2>
//                         <button
//                             className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition"
//                             onClick={() => setReportSelectionModal(prev => !prev)}
//                             aria-label="Close modal"
//                         >
//                             {/* X icon */}
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                                 <path
//                                     fillRule="evenodd"
//                                     d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                                     clipRule="evenodd"
//                                 />
//                             </svg>
//                         </button>
//                     </div>

//                     {/* Body */}
//                     <div className="space-y-4">
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                             <div className="mb-4">
//                                 <label className="block text-sm font-medium mb-1">
//                                     Report Frequency
//                                 </label>
//                                 <select
//                                     value={periodType}
//                                     onChange={(e) => setPeriodType(e.target.value)}
//                                     className="w-full border rounded-md px-3 py-2"
//                                 >
//                                     <option value="">Select Period</option>
//                                     <option value="DAILY">Daily</option>
//                                     <option value="WEEKLY">Weekly</option>
//                                     <option value="MONTHLY">Monthly</option>
//                                 </select>
//                             </div>


//                             {/* Dynamic Date Picker */}
//                             {periodType && (
//                                 <div className="mb-6">
//                                     <label className="block text-sm font-medium mb-1">
//                                         {periodType === "MONTHLY"
//                                             ? "Select Month"
//                                             : periodType === "WEEKLY"
//                                                 ? "Select Week"
//                                                 : "Select Date"}
//                                     </label>

//                                     <input
//                                         type={periodType === "MONTHLY" ? "month" : "date"}
//                                         value={selectedDate}
//                                         onChange={(e) => setSelectedDate(e.target.value)}
//                                         className="w-full border rounded-md px-3 py-2"
//                                     />
//                                 </div>)}
//                         </div>
//                     </div>

//                     <div className="flex items-center justify-end gap-3 pt-2">
//                         <button
//                             className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
//                             onClick={() => setReportSelectionModal(prev => !prev)}
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-700 shadow-sm transition"
//                             onClick={handleGenerate}
//                         >
//                             Generate
//                         </button>
//                     </div>

//                 </div>
//             </div>
//         </>
//     )
// }




import React from 'react';

export const Reportgeneration = ({
  setPeriodType,
  setSelectedDate,
  periodType,
  selectedDate,
  handleGenerate,
  setReportSelectionModal,
}) => {
  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="report-modal-title"
        // Close when clicking the backdrop
        onClick={(e) => {
          if (e.target === e.currentTarget) setReportSelectionModal((prev) => !prev);
        }}
      >
        {/* Modal panel */}
        <div
          className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl ring-1 ring-black/10
                     transition-all duration-200 ease-out
                     px-6 pt-6 pb-5"
          // prevent backdrop close when clicking inside
          onClick={(e) => e.stopPropagation()}
          style={{
            // subtle surface elevation for cohesion
            backgroundImage: 'linear-gradient(180deg, #ffffff, #f6fbfc)',
          }}
        >
          {/* Top Accent Line */}
          <span
            className="absolute left-0 top-0 w-full h-[3px] rounded-t-xl"
            style={{ backgroundColor: '#1DB1A2' }} // teal accent
            aria-hidden="true"
          />

          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 id="report-modal-title" className="text-xl font-semibold text-gray-800">
              Generate Report
            </h2>
            <button
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition"
              onClick={() => setReportSelectionModal((prev) => !prev)}
              aria-label="Close modal"
              type="button"
            >
              {/* X icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Report Frequency</label>
                <select
                  value={periodType}
                  onChange={(e) => setPeriodType(e.target.value)}
                  className="w-full border-2 rounded-md px-3 py-2 border-[#1DB1A2] outline-none"
                >
                  <option value="">Select Period</option>
                  <option value="DAILY" className='active:bg-[#1DB1A2]'>Daily</option>
                  <option value="WEEKLY">Weekly</option>
                  <option value="MONTHLY">Monthly</option>
                </select>
              </div>

              {/* Dynamic Date Picker */}
              {periodType && (
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-1">
                    {periodType === 'MONTHLY'
                      ? 'Select Month'
                      : periodType === 'WEEKLY'
                      ? 'Select Week'
                      : 'Select Date'}
                  </label>

                  <input
                    type={periodType === 'MONTHLY' ? 'month' : 'date'}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full border rounded-md px-3 py-2 hover:border-[#1DB1A2] outline-none"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-red-400 transition"
              onClick={() => setReportSelectionModal((prev) => !prev)}
              type="button"
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 rounded-md bg-[#1DB1A2] text-white hover:bg-[#119185] active:bg-[#0a776c] shadow-sm transition"
              onClick={handleGenerate}
              type="button"
            >
              Generate
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
``
