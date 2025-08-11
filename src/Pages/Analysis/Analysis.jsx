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

  const totalMonths = monthlyData.length;
  const goPrev = () => setMonthIndex((prev) => (prev - 1 + totalMonths) % totalMonths);
  const goNext = () => setMonthIndex((prev) => (prev + 1) % totalMonths);

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
              Number.isInteger(value) &&
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

  return (
    <div style={{ width: "100%", maxWidth: 900, margin: "0 auto", padding: "10px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 8,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            onClick={goPrev}
            style={{ padding: "8px 12px", borderRadius: 4, border: "1px solid #ccc", background: "#f5f5f5", cursor: "pointer" }}
          >
            Prev
          </button>
          <span style={{ fontWeight: 600 }}>
            {monthlyData[monthIndex].month} ({monthIndex + 1}/{monthlyData.length})
          </span>
          <button
            onClick={goNext}
            style={{ padding: "8px 12px", borderRadius: 4, border: "1px solid #ccc", background: "#f5f5f5", cursor: "pointer" }}
          >
            Next
          </button>
        </div>

        <select
          value={monthIndex}
          onChange={(e) => setMonthIndex(parseInt(e.target.value))}
          style={{ padding: "8px", borderRadius: 4 }}
        >
          {monthlyData.map((month, index) => (
            <option key={index} value={index}>
              {month.month}
            </option>
          ))}
        </select>
      </div>

      <div style={{ position: "relative", width: "100%", height: "55vh", maxHeight: 420, minHeight: 260 }}>
        <CurrentGraph
          data={graphTypeIndex === 0 ? radarData : scatterData}
          options={graphTypeIndex === 0 ? radarOptions : scatterOptions}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        {graphTypes.map((graphType, index) => (
          <button
            key={index}
            onClick={() => setGraphTypeIndex(index)}
            style={{
              padding: "8px 16px",
              margin: "0 5px",
              backgroundColor: graphTypeIndex === index ? "#36A2EB" : "#ddd",
              color: graphTypeIndex === index ? "white" : "black",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
              fontWeight: graphTypeIndex === index ? "bold" : "normal",
            }}
          >
            {graphType.name}
          </button>
        ))}
      </div>
    </div>
  );
}
