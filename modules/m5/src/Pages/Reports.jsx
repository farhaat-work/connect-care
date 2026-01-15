// import { useEffect, useState } from "react";
// import { ReportTable } from "../components/ReportComponents/ReportTable";
// import { getReportsData } from "../Services/ReportsService";
// import { Reportgeneration } from "../components/ReportComponents/Reportgeneration";
// import { ReportView } from "../components/ReportComponents/ReportView";

// export const Reports = () => {
//   const [Report, setReport] = useState([]);
//   const [ReportSelectionModal, setReportSelectionModal] = useState(false);
//   const [ReportViewModal, setReportViewModal] = useState(false);
//   const [CurrentReport, setCurrentReport] = useState({})
//   const [format, setFormat] = useState("");
//   const [periodType, setPeriodType] = useState("");
//   const [selectedDate, setSelectedDate] = useState("");
//   const generatedreports = []

//   const onGenerate = ({ periodType, selectedDate }) => {
//     generatedreports.push({ periodType, selectedDate })
//   }

//   const handleGenerate = () => {
//     if (!periodType || !selectedDate) return;

//     onGenerate({
//       periodType,
//       selectedDate,
//     });

//     setReportSelectionModal(prev => !prev)
//     setPeriodType("");
//     setSelectedDate("");
//   };

//   const handleDownload = () => {
//     setReportViewModal(prev => !prev);
//   }



//   useEffect(() => {
//     const data = getReportsData();
//     setReport(data);
//   }, [])

//   return (
//     <div className="p-6 mx-auto max-w-[70%]" >
//       <div className="flex flex-col gap-10 mb-4 ">
//         <h1 className="text-2xl font-semibold mb-6">Reports & Compliance</h1>
//         <button className="bg-blue-500 hover:bg-blue-300 w-fit p-3 rounded text-white mb" onClick={() => setReportSelectionModal(prev => !prev)}> Generate Report </button>
//       </div>

//       {ReportSelectionModal &&  
//       <Reportgeneration 
//         setReportSelectionModal = {setReportSelectionModal}
//         periodType = {periodType}
//         setCurrentReport = {setPeriodType}
//         setSelectedDate = {setSelectedDate}
//         handleGenerate = {handleGenerate}
//         setPeriodType={setPeriodType}
//         />
//       }

//       {ReportViewModal && <ReportView 
//       CurrentReport= {CurrentReport}
//       format = {format}
//       handleDownload = {handleDownload}
//       setFormat = {setFormat}
//       setReportViewModal = {setReportViewModal}
      
//       />}

//       <ReportTable reports={Report}
//         setReportViewModal={setReportViewModal}
//         setCurrentReport={setCurrentReport}
//       />

//     </div>
//   );
// };



import { useEffect, useState } from "react";
import { ReportTable } from "../components/ReportComponents/ReportTable";
import { getReportsData } from "../Services/ReportsService";
import { Reportgeneration } from "../components/ReportComponents/Reportgeneration";
import { ReportView } from "../components/ReportComponents/ReportView";

export const Reports = () => {
  const [Report, setReport] = useState([]);
  const [ReportSelectionModal, setReportSelectionModal] = useState(false);
  const [ReportViewModal, setReportViewModal] = useState(false);
  const [CurrentReport, setCurrentReport] = useState({});
  const [format, setFormat] = useState("");
  const [periodType, setPeriodType] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const generatedreports = [];

  const onGenerate = ({ periodType, selectedDate }) => {
    generatedreports.push({ periodType, selectedDate });
  };

  const handleGenerate = () => {
    if (!periodType || !selectedDate) return;

    onGenerate({
      periodType,
      selectedDate,
    });

    setReportSelectionModal(prev => !prev);
    setPeriodType("");
    setSelectedDate("");
  };

  const handleDownload = () => {
    setReportViewModal(prev => !prev);
  };

  useEffect(() => {
    const data = getReportsData();
    setReport(data);
  }, []);

  return (
    <div
      className="
        relative mx-auto max-w-[70%]
        rounded-xl border p-6 md:p-7
        shadow-sm bg-white mt-16
      "
      style={{
        borderColor: "#dbe5ef",
        boxShadow: "0 8px 30px -12px rgba(33, 45, 63, 0.12), 0 0 36px rgba(29, 177, 162, 0.14)", // soft + teal glow
        backgroundImage: "linear-gradient(180deg, #ffffff, #f6fbfc)",
      }}
    >
      {/* Top Accent Line */}
      <span
        className="absolute left-0 top-0 w-full h-[3px] rounded-t-xl"
        style={{ backgroundColor: "#1DB1A2" }} // teal accent
        aria-hidden="true"
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-slate-800">Reports &amp; Compliance</h1>
        <button
          className="
            inline-flex items-center gap-2
            rounded-lg px-4 py-2
            text-white
            transition-all duration-150
            hover:opacity-90 active:scale-[0.98]
          "
          style={{
            backgroundImage: "linear-gradient(135deg, #1DB1A2, #3b82f6)",
            boxShadow: "0 6px 20px -8px rgba(33, 45, 63, 0.18)",
          }}
          onClick={() => setReportSelectionModal(prev => !prev)}
        >
          Generate Report
        </button>
      </div>

      {/* Modals */}
      {ReportSelectionModal && (
        <Reportgeneration
          setReportSelectionModal={setReportSelectionModal}
          periodType={periodType}
          setCurrentReport={setPeriodType}       
          setSelectedDate={setSelectedDate}
          handleGenerate={handleGenerate}
          setPeriodType={setPeriodType}
        />
      )}

      {ReportViewModal && (
        <ReportView
          CurrentReport={CurrentReport}
          format={format}
          handleDownload={handleDownload}
          setFormat={setFormat}
          setReportViewModal={setReportViewModal}
        />
      )}

      {/* Table */}
      <div className="mt-4">
        <ReportTable
          reports={Report}
          setReportViewModal={setReportViewModal}
          setCurrentReport={setCurrentReport}
        />
      </div>
    </div>
  );
};
