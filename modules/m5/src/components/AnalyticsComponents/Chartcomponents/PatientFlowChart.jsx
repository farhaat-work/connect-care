import React from 'react'
import { Bar } from "react-chartjs-2";

function PatientFlowChart({data}) {
        const chartData = {
    labels: data.map(item => item.month),
    datasets: [
      {
        label: "In Patients",
        data: data.map(item => item.inPatients),
        backgroundColor: "#2563eb",
      },
      {
        label: "Out Patients",
        data: data.map(item => item.outPatients),
        backgroundColor: "#22c55e",
      },
    ],
  };

    return (
        <>
            <div className="bg-white p-4 rounded-xl shadow-sm">
      <h2 className="text-sm font-semibold text-gray-700 mb-2">
        In vs Out Patient Trend
      </h2>

      <div className="h-64 flex items-center justify-center text-gray-400 text-sm">
        <Bar data = {chartData}/>
      </div>
    </div>

        </>
    )
}

export default PatientFlowChart
