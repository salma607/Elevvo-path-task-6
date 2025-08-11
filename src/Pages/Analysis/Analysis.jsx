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
import { monthlyData } from "../../Component/Graphs/Graphs";
import { getScatterData, getScatterOptions } from "../../Component/Graphs/Scatter";
import { getRadarData, getRadarOptions } from "../../Component/Graphs/Radar";

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


const scatterData = getScatterData(monthIndex);
  const radarData = getRadarData(monthIndex);
  const scatterOptions = getScatterOptions(monthIndex);
  const radarOptions = getRadarOptions(monthIndex);

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
    <div className="bg-white rounded-xl shadow p-3 sm:p-6 flex-1 ml-20 sm:ml-20 ">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4 sm:mb-6">
        <h3 className="text-[var(--color-gray)] sm:text-lg font-semibold text-[var(--color-gray)]">
          {graphTypes[currentGraphIndex].name} Chart
        </h3>
        <select
          value={monthIndex}
          onChange={(e) => setMonthIndex(parseInt(e.target.value))}
          className="px-2 py-1 border border-[var(--color-gray)] rounded-md text-sm w-full sm:w-auto" 
        >
          {monthlyData.map((month, index) => (
            <option key={index} value={index}>
              {month.month}
            </option>
          ))}
        </select>
      </div>

      <div className="h-64 sm:h-80 md:h-96 mb-4 sm:mb-6">
        <CurrentGraph
          data={graphTypes[currentGraphIndex].data}
          options={graphTypes[currentGraphIndex].options}
        />
      </div>

      <div className="flex justify-center gap-2">
        {graphTypes.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentGraphIndex(index)}
            className={`w-10 h-10 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-sm ${
              currentGraphIndex === index
                ? "bg-[var(--color-green)] text-[var(--color-beig)]"
                : "bg-[var(--color-beig)] text-[var(--color-gray)]"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}