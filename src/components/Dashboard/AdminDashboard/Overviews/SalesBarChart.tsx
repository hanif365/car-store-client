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
  monthlyRevenue: number[];
}

const SalesBarChart = ({ monthlyRevenue }: SalesBarChartProps) => {
  console.log('Monthly Revenue in Chart:', monthlyRevenue);

  const months = [
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

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: 'top' as const,
        labels: {
          font: {
            size: window.innerWidth < 768 ? 12 : 14
          }
        }
      },
      title: {
        display: true,
        text: "Monthly Revenue",
        color: "#374151",
        font: {
          size: window.innerWidth < 768 ? 14 : 16,
          weight: "600",
        },
        padding: window.innerWidth < 768 ? 10 : 20,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `Revenue: ৳ ${context.parsed.y}K`;
          },
        },
        titleFont: {
          size: window.innerWidth < 768 ? 12 : 14
        },
        bodyFont: {
          size: window.innerWidth < 768 ? 11 : 13
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "#E5E7EB",
        },
        ticks: {
          color: "#6B7280",
          callback: (value: number) => `৳ ${value}K`,
          font: {
            size: window.innerWidth < 768 ? 10 : 12
          }
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#6B7280",
          font: {
            size: window.innerWidth < 768 ? 10 : 12
          },
          maxRotation: window.innerWidth < 768 ? 45 : 0
        },
      },
    },
  };

  const data = {
    labels: months,
    datasets: [
      {
        label: "Revenue",
        data: monthlyRevenue,
        backgroundColor: "rgba(56, 132, 255, 0.5)",
        borderColor: "rgb(56, 132, 255)",
        borderWidth: window.innerWidth < 768 ? 0.5 : 1,
        borderRadius: window.innerWidth < 768 ? 4 : 8,
        hoverBackgroundColor: "rgba(56, 132, 255, 0.7)",
        barThickness: window.innerWidth < 768 ? 15 : 25,
      },
    ],
  };

  return (
    <div className="relative h-full w-full">
      <Bar options={options as any} data={data} />
    </div>
  );
};

export default SalesBarChart;