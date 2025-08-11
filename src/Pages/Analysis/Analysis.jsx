import React, { useState } from "react";
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

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  Tooltip,
  Legend
);
import { monthlyData, COLORS } from "../../Component/Graphs/Graphs";

export default function Analysis() {
  const [monthIndex, setMonthIndex] = useState(0);
  const [graphTypeIndex, setGraphTypeIndex] = useState(0); // 0 for Radar, 1 for Scatter

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

  // Now define graphTypes after the data and options are defined
  const graphTypes = [
    { name: "Radar", component: Radar, data: radarData, options: radarOptions },
    {
      name: "Scatter",
      component: Scatter,
      data: scatterData,
      options: scatterOptions,
    },
  ];

  const CurrentGraph = graphTypes[graphTypeIndex].component;

  const goPrev = () =>
    setGraphTypeIndex((prev) => (prev - 1 + graphTypes.length) % graphTypes.length);
  const goNext = () => setGraphTypeIndex((prev) => (prev + 1) % graphTypes.length);

  return (
    <div className="w-full max-w-[900px] mx-auto px-4 py-3 box-border">
      <div className="flex justify-center mb-3">
        <select
          value={monthIndex}
          onChange={(e) => setMonthIndex(parseInt(e.target.value))}
          className="px-3 py-2 rounded-md border border-gray-300 bg-white"
        >
          {monthlyData.map((month, index) => (
            <option key={index} value={index}>
              {month.month}
            </option>
          ))}
        </select>
      </div>

      <div className="relative w-full h-[340px] md:h-[380px] lg:h-[420px]">
        <CurrentGraph
          data={graphTypeIndex === 0 ? radarData : scatterData}
          options={graphTypeIndex === 0 ? radarOptions : scatterOptions}
        />
      </div>

      {/* Desktop toggle buttons */}
      <div className="hidden lg:flex justify-center items-center mt-4 gap-2">
        {graphTypes.map((graphType, index) => (
          <button
            key={index}
            onClick={() => setGraphTypeIndex(index)}
            className={
              (graphTypeIndex === index
                ? "bg-sky-500 text-white font-bold"
                : "bg-gray-300 text-gray-900 font-medium") +
              " px-4 py-2 rounded-md"
            }
          >
            {graphType.name}
          </button>
        ))}
      </div>

      {/* Mobile/tablet pagination */}
      <div className="block lg:hidden">
        <div className="flex justify-center items-center gap-3 mt-4">
          <button onClick={goPrev} className="px-4 py-2 rounded-md bg-gray-900 text-white">
            Prev
          </button>
          <span className="font-semibold">{graphTypes[graphTypeIndex].name}</span>
          <button onClick={goNext} className="px-4 py-2 rounded-md bg-gray-900 text-white">
            Next
          </button>
        </div>
        <div className="flex justify-center items-center gap-2 mt-2">
          {graphTypes.map((_, idx) => (
            <span
              key={idx}
              className={(graphTypeIndex === idx ? "bg-sky-500" : "bg-gray-300") + " w-2.5 h-2.5 rounded-full inline-block cursor-pointer"}
              onClick={() => setGraphTypeIndex(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
