import { monthlyData } from "../../Component/Graphs/Graphs";

export const getRadarData = (monthIndex) => ({
  labels: monthlyData[monthIndex].taskTypes,
  datasets: [
    {
      data: monthlyData[monthIndex].earnings,
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 2,
    },
  ],
});

export const getRadarOptions = (monthIndex) => ({
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
});
