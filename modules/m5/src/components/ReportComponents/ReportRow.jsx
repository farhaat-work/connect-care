import React from "react";

export const ReportRow = ({ report, setReportViewModal, setCurrentReport }) => {
  return (
    <tr
      className="
        border-t text-sm 
        hover:bg-gray-50 
        hover:border-l-4 hover:border-l-[#1DB1A2]
        transition
      "
    >
      <td className="p-4 font-medium text-slate-800">{report.reportId}</td>
      <td className="p-4 text-slate-700">{report.period}</td>
      <td className="p-4 text-slate-700">{report.recoveryRate}%</td>
      <td className="p-4 text-slate-700">{report.readmissionRate}%</td>

      <td className="p-4 text-center rounded-lg">
        <button
          className="
            bg-[#1DB1A2] text-white px-4 py-1.5 rounded-lg
            hover:bg-[#0f8377] transition-all delay-150
          "
          onClick={() => {
            setReportViewModal(prev => !prev);
            setCurrentReport(report);
          }}
        >
          View
        </button>
      </td>
    </tr>
  );
};
