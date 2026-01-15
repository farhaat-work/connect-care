import React from 'react'
import { Line } from "react-chartjs-2";

function RecoveryReadmissionChart({data}) {

      const chartData = {
    labels: data.map(item => item.month),
    datasets: [
      {
        label: "Recovery Rate (%)",
        data: data.map(item => item.recoveryRate),
        borderColor: "#2563eb",
        backgroundColor: "rgba(37,99,235,0.2)",
        tension: 0.4,
      },
      {
        label: "Readmission Rate (%)",
        data: data.map(item => item.readmissionRate),
        borderColor: "#16a34a",
        backgroundColor: "rgba(22,163,74,0.2)",
        tension: 0.4,
      },
    ],
  };

    return (
        <>
            <div className="bg-white p-4 rounded-xl shadow-sm">
      <h2 className="text-sm font-semibold text-gray-700 mb-2">
        Recovery Rate vs Readmission Rate
      </h2>

      <div className="h-64 flex items-center justify-center text-gray-400 text-sm">
        <Line data={chartData} />
      </div>
    </div>

        </>
    )
}

export default RecoveryReadmissionChart;



