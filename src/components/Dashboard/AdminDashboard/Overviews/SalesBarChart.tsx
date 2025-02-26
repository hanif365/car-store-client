/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useRef } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface SalesBarChartProps {
  monthlySales: number[];
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom" as const,
      display: false,
    },
    title: {
      display: false,
      text: "Chart.js Bar Chart",
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: "Revenue (BDT)",
      },
    },
  },
};

const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const currentMonthIndex = new Date().getMonth();
const highlightColor = "#A3CCFF";
const demoData = [15, 8, 10, 3, 5, 7, 10, 3, 5, 2, 10, 13];

// This is a wrapper component that will re-mount the chart whenever data changes
// to avoid the cleanup issues with Chart.js
const ChartWrapper = ({ data, options }) => {
  const chartKey = useRef(`chart-${Date.now()}`).current;
  
  return (
    <div style={{ height: "300px", position: "relative" }}>
      <Bar 
        data={data}
        options={options}
        key={chartKey}
      />
    </div>
  );
};

const SalesBarChart = ({ monthlySales }: SalesBarChartProps) => {
  const [chartKey, setChartKey] = useState(Math.random());

  useEffect(() => {
    // Update the key to force re-render the chart when monthlySales changes
    setChartKey(Math.random());
  }, [monthlySales]);

  const displayData = Array.isArray(monthlySales) && monthlySales.length === 12 ? monthlySales : demoData;
  const data = {
    labels,
    datasets: [
      {
        data: displayData,
        backgroundColor: displayData.map((_, index) =>
          index === new Date().getMonth() ? highlightColor : "#E5E7EB"
        ),
        borderRadius: 4,
        borderSkipped: false,
        barThickness: 12,
      },
    ],
  };

  return (
    <div className="mt-3 p-3 bg-white rounded-lg shadow-sm w-full lg:w-1/2">
      <h4 className="text-lg font-medium pb-5">Monthly Sales Revenue</h4>
      <div style={{ height: "300px", position: "relative" }}>
        <Bar key={chartKey} data={data} options={options} />
      </div>
    </div>
  );
};

export default SalesBarChart;
