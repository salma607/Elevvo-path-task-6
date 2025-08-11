import { monthlyData, COLORS } from "../../Component/Graphs/Graphs";

export const getScatterData = (monthIndex) => ({
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
});

export const getScatterOptions = (monthIndex) => ({
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
});
