import  { useState } from "react";
import { Radar, Scatter } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { monthlyData, COLORS } from "../../Component/Graphs/Graphs";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  Tooltip,
  Legend
);

export default function Graphs() {
  const [monthIndex, setMonthIndex] = useState(0);
  const [currentGraphIndex, setCurrentGraphIndex] = useState(0);

  // Define the data and options first
  const scatterData = {
    datasets: [
      {
        data: monthlyData[monthIndex].taskTypes.map((type, index) => ({
          x: index,
          y: monthlyData[monthIndex].earnings[index],
        })),
        backgroundColor: COLORS,
        pointRadius: 10,
        pointHoverRadius: 12,
      },
    ],
  };

  const radarData = {
    labels: monthlyData[monthIndex].taskTypes,
    datasets: [
      {
        data: monthlyData[monthIndex].earnings,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
      },
    ],
  };

  const scatterOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        min: -0.5,
        max: monthlyData[monthIndex].taskTypes.length - 0.5,
        ticks: {
          callback: (value) => {
            if (
              value >= 0 &&
              value < monthlyData[monthIndex].taskTypes.length
            ) {
              return monthlyData[monthIndex].taskTypes[value];
            }
            return "";
          },
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Earnings ($)",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 0,
        suggestedMax: Math.max(...monthlyData[monthIndex].earnings) + 200,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  // Define graph types
  const graphTypes = [
    { name: "Radar", component: Radar, data: radarData, options: radarOptions },
    {
      name: "Scatter",
      component: Scatter,
      data: scatterData,
      options: scatterOptions,
    },
  ];

  const CurrentGraph = graphTypes[currentGraphIndex].component;

  return (
    <div className="bg-white rounded-xl shadow p-6 flex-1 ml-20 ">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-700">
          {graphTypes[currentGraphIndex].name} Chart
        </h3>
        <select
          value={monthIndex}
          onChange={(e) => setMonthIndex(parseInt(e.target.value))}
          className="px-3 py-1 border border-gray-300 rounded-md text-sm " 
        >
          {monthlyData.map((month, index) => (
            <option key={index} value={index}>
              {month.month}
            </option>
          ))}
        </select>
      </div>

      <div className="h-100 mb-6">
        <CurrentGraph
          data={graphTypes[currentGraphIndex].data}
          options={graphTypes[currentGraphIndex].options}
        />
      </div>

      <div className="flex justify-center gap-2 ">
        {graphTypes.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentGraphIndex(index)}
            className={`w-8 h-8 rounded-full flex items-center justify-center mt-30 ${
              currentGraphIndex === index
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}