// import React from 'react'
// import { Metric } from "./Metric"
// export const ReportView = ({CurrentReport,handleDownload,format,setFormat,setReportViewModal}) => {
//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
//             <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6">

//                 {/* Header */}
//                 <div className="flex justify-between items-center mb-4">
//                     <h2 className="text-xl font-semibold">
//                         Report Summary – {CurrentReport.reportId}
//                     </h2>
//                     <button
//                         onClick={() => setReportViewModal(prev => !prev)}
//                         className="text-gray-500 hover:text-gray-700 text-xl"
//                     >
//                         ✕
//                     </button>
//                 </div>

//                 {/* Metadata */}
//                 <div className="text-sm text-gray-600 mb-6">
//                     <p><span className="font-medium">Period:</span> {CurrentReport.period}</p>
//                     <p><span className="font-medium">Generated On:</span> {CurrentReport.generatedDate}</p>
//                 </div>

//                 {/* Metrics */}
//                 <div className="grid grid-cols-2 gap-4 mb-6">
//                     <Metric label="Recovery Rate" value={`${CurrentReport.recoveryRate}%`} />
//                     <Metric label="Readmission Rate" value={`${CurrentReport.readmissionRate}%`} />
//                     <Metric label="In-Patients" value={CurrentReport.inPatients} />
//                     <Metric label="Out-Patients" value={CurrentReport.outPatients} />
//                 </div>

//                 {/* Export Section */}
//                 <div className="border-t pt-4">
//                     <label className="block text-sm font-medium mb-2">
//                         Export Format
//                     </label>
//                     <select
//                         value={format}
//                         onChange={(e) => setFormat(e.target.value)}
//                         className="w-full border rounded-md px-3 py-2 mb-4"
//                     >
//                         <option value="">Select format</option>
//                         <option value="PDF">PDF</option>
//                         <option value="CSV">CSV</option>
//                         <option value="XLSX">XLSX</option>
//                     </select>

//                     <div className="flex justify-end gap-3">
//                         <button
//                             onClick={() => setReportViewModal(prev => !prev)}
//                             className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
//                         >
//                             Close
//                         </button>

//                         <button
//                             disabled={!format}
//                             className={`px-4 py-2 rounded-md text-white ${format
//                                 ? "bg-blue-600 hover:bg-blue-700"
//                                 : "bg-blue-300 cursor-not-allowed"
//                                 }`}
//                             onClick={handleDownload}
//                         >
//                             Download
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }





import React from 'react';
import { Metric } from "./Metric";

export const ReportView = ({
  CurrentReport,
  handleDownload,
  format,
  setFormat,
  setReportViewModal
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div
        className="
          relative bg-white w-full max-w-2xl rounded-xl shadow-lg p-6
          border
        "
        style={{
          borderColor: '#dbe5ef',
          backgroundImage: 'linear-gradient(180deg, #ffffff, #f6fbfc)',
          boxShadow: '0 8px 30px -12px rgba(33, 45, 63, 0.12), 0 0 36px rgba(29, 177, 162, 0.14)', // subtle + teal glow
        }}
      >
        {/* Top Accent Line */}
        <span
          className="absolute left-0 top-0 w-full h-[3px] rounded-t-xl"
          style={{ backgroundColor: '#1DB1A2' }}
          aria-hidden="true"
        />

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Report Summary – {CurrentReport.reportId}
          </h2>
          <button
            onClick={() => setReportViewModal(prev => !prev)}
            className="text-gray-500 hover:text-gray-700 text-xl"
            type="button"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Metadata */}
        <div className="text-sm text-gray-600 mb-6">
          <p><span className="font-medium">Period:</span> {CurrentReport.period}</p>
          <p><span className="font-medium">Generated On:</span> {CurrentReport.generatedDate}</p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Metric label="Recovery Rate" value={`${CurrentReport.recoveryRate}%`} />
          <Metric label="Readmission Rate" value={`${CurrentReport.readmissionRate}%`} />
          <Metric label="In-Patients" value={CurrentReport.inPatients} />
          <Metric label="Out-Patients" value={CurrentReport.outPatients} />
        </div>

        {/* Export Section */}
        <div className="border-t pt-4">
          <label className="block text-sm font-medium mb-2">
            Export Format
          </label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="
              w-full rounded-md px-3 py-2 mb-4
              border border-[#1DB1A2]
              focus:outline-none focus:ring-2 focus:ring-[#1DB1A2]
            "
          >
            <option value="">Select format</option>
            <option value="PDF">PDF</option>
            <option value="CSV">CSV</option>
            <option value="XLSX">XLSX</option>
          </select>

          <div className="flex justify-end gap-3">
            {/* Close → hover red */}
            <button
              onClick={() => setReportViewModal(prev => !prev)}
              className="
                px-4 py-2 border rounded-md text-gray-700
                hover:bg-red-100 hover:text-red-600 transition
              "
              type="button"
            >
              Close
            </button>

            <button
              disabled={!format}
              className={`px-4 py-2 rounded-md text-white transition
                ${format
                  ? "bg-[#1DB1A2] hover:bg-[#097268]"
                  : "bg-[#81dcd3] cursor-not-allowed"
                }`}
              onClick={handleDownload}
              type="button"
            >
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
