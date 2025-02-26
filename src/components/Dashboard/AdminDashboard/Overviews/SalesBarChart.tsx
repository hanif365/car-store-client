/* eslint-disable @typescript-eslint/no-explicit-any */
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

const SalesBarChart = ({ monthlySales }: SalesBarChartProps) => {
  const displayData =
    Array.isArray(monthlySales) && monthlySales.length === 12
      ? monthlySales
      : demoData;

  console.log("Chart displaying data:", displayData);

  const data = {
    labels,
    datasets: [
      {
        label: "Monthly Revenue",
        data: displayData,
        backgroundColor: labels.map((_, index) =>
          index === currentMonthIndex ? highlightColor : "#D5E6FB"
        ),
        borderRadius: 5,
      },
    ],
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const chartOptions = {
    ...options,
    plugins: {
      ...options.plugins,
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return formatCurrency(context.parsed.y);
          },
        },
      },
    },
  };

  return (
    <div className="mt-3 p-3 bg-white rounded-lg shadow-sm w-full lg:w-1/2">
      <h4 className="text-lg font-medium pb-5">Monthly Sales Revenue</h4>
      <div className="">
        <Bar options={chartOptions} data={data} className="" />
      </div>
    </div>
  );
};

export default SalesBarChart;
