import React, { useState, useEffect } from "react";
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
import "./Analysis.css";

export default function Analysis() {
  const [monthIndex, setMonthIndex] = useState(0);
  const [graphTypeIndex, setGraphTypeIndex] = useState(0); // 0 for Radar, 1 for Scatter
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 900px)");
    const updateIsMobile = () => setIsMobile(mediaQuery.matches);
    updateIsMobile();
    mediaQuery.addEventListener("change", updateIsMobile);
    return () => mediaQuery.removeEventListener("change", updateIsMobile);
  }, []);

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

  const goPrev = () => setGraphTypeIndex((prev) => (prev - 1 + graphTypes.length) % graphTypes.length);
  const goNext = () => setGraphTypeIndex((prev) => (prev + 1) % graphTypes.length);

  return (
    <div className="analysisContainer">
      <div className="selectWrapper">
        <select
          value={monthIndex}
          onChange={(e) => setMonthIndex(parseInt(e.target.value))}
          className="monthSelect"
        >
          {monthlyData.map((month, index) => (
            <option key={index} value={index}>
              {month.month}
            </option>
          ))}
        </select>
      </div>

      <div className="chartWrapper">
        <CurrentGraph
          data={graphTypeIndex === 0 ? radarData : scatterData}
          options={graphTypeIndex === 0 ? radarOptions : scatterOptions}
        />
      </div>

      {/* Desktop toggle buttons */}
      <div className="controlsDesktop">
        {graphTypes.map((graphType, index) => (
          <button
            key={index}
            onClick={() => setGraphTypeIndex(index)}
            className={graphTypeIndex === index ? "toggleButton active" : "toggleButton"}
          >
            {graphType.name}
          </button>
        ))}
      </div>

      {/* Mobile/tablet pagination */}
      <div className="paginationMobile">
        <div className="paginationButtons">
          <button onClick={goPrev} className="navButton">Prev</button>
          <span className="pageLabel">{graphTypes[graphTypeIndex].name}</span>
          <button onClick={goNext} className="navButton">Next</button>
        </div>
        <div className="dots">
          {graphTypes.map((_, idx) => (
            <span
              key={idx}
              className={graphTypeIndex === idx ? "dot active" : "dot"}
              onClick={() => setGraphTypeIndex(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
