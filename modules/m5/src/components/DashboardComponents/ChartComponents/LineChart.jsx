


import React from 'react';
import { Line } from 'react-chartjs-2';

export default function LineChart() {
  const labels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Readmission Rate',
        data: [120,150,180,170,220,260,30,300,12,1,231,123],
        borderColor: '#1DB1A2',               // teal (≈ HSL 174 72% 40%)
        backgroundColor: 'rgba(29, 177, 162, 0.12)',
        tension: 0.35,
        pointRadius: 2.5,
        pointHoverRadius: 4,
        pointBorderColor: '#1DB1A2',
        pointBackgroundColor: '#ffffff',
        borderWidth: 2,
      },
      {
        label: 'Recovery Rate',
        data: [100,90,40,70,120,60,330,200,102,10,31,203],
        borderColor: '#F0745A',               // warm coral (≈ HSL 12 80% 60%)
        backgroundColor: 'rgba(240, 116, 90, 0.12)',
        tension: 0.35,
        pointRadius: 2.5,
        pointHoverRadius: 4,
        pointBorderColor: '#F0745A',
        pointBackgroundColor: '#ffffff',
        borderWidth: 2,
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          usePointStyle: true,
          pointStyle: 'line',
          boxWidth: 18,
          boxHeight: 6,
          color: '#607489',          // muted slate
          padding: 16,
          font: { size: 12, weight: 500 },
        },
      },
      title: {
        display: true,
        text: 'Readmission vs Recovery (Monthly)',
        color: '#1f2a37',             // deep foreground
        font: { size: 14, weight: 600 },
        padding: { top: 6, bottom: 8 },
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(17, 24, 39, 0.92)',  // dark slate
        titleColor: '#ffffff',
        bodyColor: '#e9eef7',
        borderColor: '#334155',
        borderWidth: 1,
        padding: 10,
        displayColors: true,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: '#6b7f92',          // muted
          font: { size: 11 },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(99, 115, 129, 0.15)', // soft grid
          borderDash: [4, 4],
        },
        ticks: {
          color: '#6b7f92',
          font: { size: 11 },
        },
      },
    },
    elements: {
      point: {
        hoverBorderWidth: 2,
      },
      line: {
        capBezierPoints: true,
      },
    },
  };

  return (
    <div
      className="
        group relative rounded-xl border p-3 md:p-4
        shadow-sm transition-all duration-200
        hover:shadow-md hover:-translate-y-0.5 cursor-pointer
      "
      style={{
        // gradient-card: white → very light cool gray
        backgroundImage: 'linear-gradient(180deg, #ffffff, #f6fbfc)',
        borderColor: '#dbe5ef',      // light border
        boxShadow: '0 4px 20px -4px rgba(33, 45, 63, 0.08)',
      }}
    >
      {/* Optional accent strip (subtle identity) */}
      <span
        className="absolute left-0 top-0 h-[2px] w-full rounded-t-xl"
        style={{ backgroundColor: '#1DB1A2' }}
        aria-hidden="true"
      />

      {/* Outer: scrollable horizontally (kept as-is) */}
      <div className="overflow-x-auto">
        {/* Inner: fixed wide canvas so scroll appears; flex-none prevents shrinking */}
        <div className="flex-none w-[700px] h-[400px]">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
