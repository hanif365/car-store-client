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
    },
    tooltip: {
      callbacks: {
        label: function (context: any) {
          return `${context.formattedValue} cars`;
        },
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

const MonthlySalesDoughnut: React.FC<MonthlySalesDoughnutProps> = ({ monthlySoldProducts = [] }) => {
  // Group monthly data into bimonthly periods
  // If we don't have real data, use fallback data
  const defaultData = [5, 3, 4, 1, 2, 3, 4, 1, 2, 1, 3, 5];
  const monthlyData = monthlySoldProducts.length === 12 ? monthlySoldProducts : defaultData;
  
  // Convert monthly data to bimonthly data
  const bimonthlyData = [
    monthlyData[0] + monthlyData[1],     // Jan-Feb
    monthlyData[2] + monthlyData[3],     // Mar-Apr
    monthlyData[4] + monthlyData[5],     // May-Jun
    monthlyData[6] + monthlyData[7],     // Jul-Aug
    monthlyData[8] + monthlyData[9],     // Sep-Oct
    monthlyData[10] + monthlyData[11],   // Nov-Dec
  ];

  const data = {
    labels,
    datasets: [
      {
        data: bimonthlyData,
        backgroundColor: [
          currentMonth === 0 || currentMonth === 1
            ? "rgb(56, 132, 255, 0.5)"
            : "rgba(255, 99, 132, 0.2)",
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
            ? "rgb(56, 132, 255, 1)"
            : "rgba(255, 99, 132, 0.3)",
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
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="mt-3 p-3 sm:p-4 md:p-5 bg-white rounded-lg shadow-sm w-full lg:w-1/2">
      <h4 className="text-base sm:text-lg md:text-xl pb-3 sm:pb-4 md:pb-5 font-medium">Car Sales Statistics</h4>
      <div className="relative w-full" style={{ height: "calc(100% - 2rem)" }}>
        <div className="h-[200px] sm:h-[250px] md:h-[280px] lg:h-[300px]">
          <Doughnut
            options={options}
            data={data}
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default MonthlySalesDoughnut;