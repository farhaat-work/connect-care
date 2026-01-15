import { ReportRow } from "./ReportRow";

export const ReportTable = ({ reports, setReportViewModal, setCurrentReport }) => {
  return (
    <div
      className="relative bg-white rounded-xl border shadow-sm overflow-x-scroll"
      style={{
        borderColor: "#dbe5ef",
        boxShadow: "0 4px 20px -4px rgba(33, 45, 63, 0.08)",
        backgroundImage: "linear-gradient(180deg, #ffffff, #f6fbfc)",
      }}
    >
      {/* Top Accent Line */}
      <span
        className="absolute left-0 top-0 w-full h-[3px] rounded-t-xl"
        style={{ backgroundColor: "#1DB1A2" }} // teal accent
        aria-hidden="true"
      />

      <table className="w-full border-collapse">
        <thead className="bg-gray-50">
          <tr className="text-left text-sm font-medium text-gray-700">
            <th className="p-4">Report ID</th>
            <th className="p-4">Period</th>
            <th className="p-4">Recovery Rate</th>
            <th className="p-4">Readmission</th>
            <th className="p-4 text-center">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {reports.map((report) => (
            <ReportRow
              key={report.reportId}
              report={report}
              setReportViewModal={setReportViewModal}
              setCurrentReport={setCurrentReport}
            />
          ))}
        </tbody>
      </table>

      <div className="p-4 text-right text-sm text-gray-500">
        {reports[0]?.generatedDate}
      </div>
    </div>
  );
};
