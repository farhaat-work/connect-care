
// src/components/BarChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';

export default function BarChart() {
  const data = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Revenue (₹Lakh)',
        data: [12, 19, 7, 15],
        backgroundColor: 'rgba(16, 185, 129, 0.7)', // green-500
        borderRadius: 6,                             // rounded bars
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
      title: { display: true, text: 'Quarterly Revenue' },
      tooltip: { enabled: true },
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true },
    },
  };

  return (
       <div style={{ height: 300 }} className='flex flex-row items-center justify-between bg-white shadow-md rounded-lg cursor-pointer p-2'>
      <Bar data={data} options={options} />
    </div>
  );
}