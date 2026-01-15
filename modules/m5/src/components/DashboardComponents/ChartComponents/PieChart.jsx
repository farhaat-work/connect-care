
// // src/components/PieChart.jsx
// import React from 'react';
// import { Pie } from 'react-chartjs-2';

// export default function PieChart() {
//   const data = {
//     labels: ['In-Person', 'Virtual'],
//     datasets: [
//       {
//         label: 'Appointment Distribution',
//         data: [65, 35],
//         backgroundColor: [
//           'rgba(59, 130, 246, 0.8)',  // blue
//           'rgba(59, 130, 246, 0.4)'
//         ],
//         borderColor: 'white',
//         borderWidth: 2,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { position: 'bottom' },
//       title: { display: true, text: 'Appointment Distribution' },
//       tooltip: { enabled: true },
//        },
//   };

//   return (

//     <div className="bg-white shadow-md rounded-lg p-2">
//           {/* Outer: scrollable horizontally */}
//           <div className="overflow-x-auto">
//                    {/* Inner: fixed wide canvas so scroll appears; flex-none prevents shrinking */}
//             <div className="flex-none w-[400px] h-[400px]">
//                    <Pie data={data} options={options} />
//             </div>
//           </div>
//         </div>


//   );
// }



// src/components/PieChart.jsx
// import React from 'react';
// import { Pie } from 'react-chartjs-2';

// export default function PieChart() {
//   const data = {
//     labels: ['In-Person', 'Virtual'],
//     datasets: [
//       {
//         label: 'Appointment Distribution',
//         data: [65, 35],
//         backgroundColor: [
//           '#1DB1A2',         // teal (≈ HSL 174 72% 40%)
//           'rgba(29, 177, 162, 0.18)', // soft teal tint for contrast
//         ],
//         borderColor: '#ffffff',
//         borderWidth: 2,
//         hoverOffset: 6,       // subtle hover expansion
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: 'bottom',
//         labels: {
//           color: '#607489', // muted slate
//           usePointStyle: true,
//           boxWidth: 10,
//           padding: 12,
//           font: { size: 12, weight: 500 },
//         },
//       },
//       title: {
//         display: true,
//         text: 'Appointment Distribution',
//         color: '#1f2a37',    // deep foreground
//         font: { size: 14, weight: 600 },
//         padding: { top: 6, bottom: 8 },
//       },
//       tooltip: {
//         enabled: true,
//         backgroundColor: 'rgba(17, 24, 39, 0.92)', // dark slate
//         titleColor: '#ffffff',
//         bodyColor: '#e9eef7',
//         borderColor: '#334155',
//         borderWidth: 1,
//         padding: 10,
//         cornerRadius: 8,
//         displayColors: true,
//       },
//     },
//   };

//   return (
//     <div
//       className="
//         group relative rounded-xl border p-3 md:p-4
//         shadow-sm transition-all duration-200
//         hover:shadow-md hover:-translate-y-0.5 cursor-pointer
//       "
//       style={{
//         // card surface: white → very light cool gray
//         backgroundImage: 'linear-gradient(180deg, #ffffff, #f6fbfc)',
//         borderColor: '#dbe5ef',
//         boxShadow: '0 4px 20px -4px rgba(33, 45, 63, 0.08)',
//       }}
//     >
//       {/* Optional accent strip (subtle identity) */}
//       <span
//         className="absolute left-0 top-0 h-[2px] w-full rounded-t-xl"
//         style={{ backgroundColor: '#1DB1A2' }}
//         aria-hidden="true"
//       />

//       {/* Outer: scrollable horizontally (kept) */}
//       <div className="overflow-x-auto">
//         {/* Inner: fixed wide canvas so scroll appears; flex-none prevents shrinking */}
//         <div className="flex-none w-[400px] h-[400px]">
//           <Pie data={data} options={options} />
//         </div>
//       </div>
//     </div>
//   );
// }




import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export default function PieChart() {
  
const data = {
  labels: ['In-Person', 'Virtual'],
  datasets: [
    {
      label: 'Appointment Distribution',
      data: [65, 35],
      backgroundColor: ['#1DB1A2', 'rgba(29, 177, 162, 0.18)'],
      borderColor: '#ffffff',
      borderWidth: 2,
      hoverOffset: 6,
      cutout: '40%', // 🍩 donut
    },
  ],
};


  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#607489',
          usePointStyle: true,
          boxWidth: 10,
          padding: 12,
          font: { size: 12, weight: 500 },
        },
      },
      title: {
        display: true,
        text: 'Appointment Distribution',
        color: '#1f2a37',
        font: { size: 14, weight: 600 },
        padding: { top: 6, bottom: 8 },
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(17, 24, 39, 0.92)',
        titleColor: '#ffffff',
        bodyColor: '#e9eef7',
        borderColor: '#334155',
        borderWidth: 1,
        padding: 10,
        cornerRadius: 8,
        displayColors: true,
      },
      // ✅ only addition to show labels without hover
      datalabels: {
        formatter: (value) => value, // counts only
        color: '#1f2a37',
        font: { size: 12, weight: 600 },
        anchor: 'center',
        align: 'center',
        clamp: true,
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
        backgroundImage: 'linear-gradient(180deg, #ffffff, #f6fbfc)',
        borderColor: '#dbe5ef',
        boxShadow: '0 4px 20px -4px rgba(33, 45, 63, 0.08)',
      }}
    >
      <span
        className="absolute left-0 top-0 h-[2px] w-full rounded-t-xl"
        style={{ backgroundColor: '#1DB1A2' }}
        aria-hidden="true"
      />
      <div className="overflow-x-auto">
        <div className="flex-none w-[400px] h-[400px]">
          <Pie data={data} options={options} />
        </div>
      </div>
    </div>
  );
}

