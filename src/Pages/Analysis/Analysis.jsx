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
    <div style={{ width: 700,marginLeft:"50px" ,padding: "10px" }}>
    

      <div style={{  textAlign: "center" }}>
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

      <div style={{ height: 400 ,width:700}}>
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
