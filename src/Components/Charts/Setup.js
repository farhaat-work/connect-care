
// src/charts/setup.js
import {
  Chart as ChartJS,
  CategoryScale,   // x-axis for categorical data
  LinearScale,     // y-axis linear
  PointElement,
  LineElement,
  BarElement,
  ArcElement,      // for Pie/Doughnut
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);
