/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface MonthlySalesDoughnutProps {
  monthlySoldProducts: number[];
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom" as const,
      display: false,
      labels: {
        font: {
          size: window.innerWidth < 768 ? 10 : 12,
        },
      },
    },
    title: {
      display: true,
      text: "Car Sales Statistics",
      color: "#374151",
      font: {
        size: window.innerWidth < 768 ? 14 : 16,
        weight: "bold" as const,
      },
      padding: window.innerWidth < 768 ? 10 : 20,
    },
    tooltip: {
      callbacks: {
        label: function (context: any) {
          return `${context.formattedValue} cars`;
        },
      },
      titleFont: {
        size: window.innerWidth < 768 ? 12 : 14,
      },
      bodyFont: {
        size: window.innerWidth < 768 ? 11 : 13,
      },
    },
  },
};

// Group months into bimonthly periods
const labels = [
  "Jan - Feb",
  "Mar - Apr",
  "May - June",
  "July - Aug",
  "Sep - Oct",
  "Nov - Dec",
];

const currentMonth = new Date().getMonth();

const MonthlySalesDoughnut: React.FC<MonthlySalesDoughnutProps> = ({
  monthlySoldProducts = [],
}) => {
  // Group monthly data into bimonthly periods
  // If we don't have real data, use fallback data
  const defaultData = [5, 3, 4, 1, 2, 3, 4, 1, 2, 1, 3, 5];
  const monthlyData =
    monthlySoldProducts.length === 12 ? monthlySoldProducts : defaultData;

  // Convert monthly data to bimonthly data
  const bimonthlyData = [
    monthlyData[0] + monthlyData[1], // Jan-Feb
    monthlyData[2] + monthlyData[3], // Mar-Apr
    monthlyData[4] + monthlyData[5], // May-Jun
    monthlyData[6] + monthlyData[7], // Jul-Aug
    monthlyData[8] + monthlyData[9], // Sep-Oct
    monthlyData[10] + monthlyData[11], // Nov-Dec
  ];

  const data = {
    labels,
    datasets: [
      {
        data: bimonthlyData,
        backgroundColor: [
          currentMonth === 0 || currentMonth === 1
            ? "rgba(255, 99, 132, 0.2)"
            : "rgb(56, 132, 255, 0.5)",
          currentMonth === 2 || currentMonth === 3
            ? "rgb(56, 132, 255, 0.5)"
            : "rgba(54, 162, 235, 0.2)",
          currentMonth === 4 || currentMonth === 5
            ? "rgb(56, 132, 255, 0.5)"
            : "rgba(255, 206, 86, 0.2)",
          currentMonth === 6 || currentMonth === 7
            ? "rgb(56, 132, 255, 0.5)"
            : "rgba(75, 192, 192, 0.2)",
          currentMonth === 8 || currentMonth === 9
            ? "rgb(56, 132, 255, 0.5)"
            : "rgba(153, 102, 255, 0.2)",
          currentMonth === 10 || currentMonth === 11
            ? "rgb(56, 132, 255, 0.5)"
            : "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          currentMonth === 0 || currentMonth === 1
            ? "rgba(255, 99, 132, 0.3)"
            : "rgb(56, 132, 255, 1)",
          currentMonth === 2 || currentMonth === 3
            ? "rgb(56, 132, 255, 1)"
            : "rgba(54, 162, 235, 0.3)",
          currentMonth === 4 || currentMonth === 5
            ? "rgb(56, 132, 255, 1)"
            : "rgba(255, 206, 86, 0.3)",
          currentMonth === 6 || currentMonth === 7
            ? "rgb(56, 132, 255, 1)"
            : "rgba(75, 192, 192, 0.3)",
          currentMonth === 8 || currentMonth === 9
            ? "rgb(56, 132, 255, 1)"
            : "rgba(153, 102, 255, 0.3)",
          currentMonth === 10 || currentMonth === 11
            ? "rgb(56, 132, 255, 1)"
            : "rgba(255, 159, 64, 0.3)",
        ],
        borderWidth: window.innerWidth < 768 ? 0.5 : 1,
      },
    ],
  };

  return (
    <div className="relative w-full h-full">
      <div className="h-[200px] sm:h-[220px] md:h-[250px] lg:h-[340px]">
        <Doughnut options={options} data={data} className="w-full h-full" />
      </div>
    </div>
  );
};

export default MonthlySalesDoughnut;
