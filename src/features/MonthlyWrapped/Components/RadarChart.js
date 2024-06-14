import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";


export default function RadarChart({currentMonthData = [10, 8, 4, 9, 5], prevMonthData = [8, 6, 6, 3, 7]}) {
  ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
  );
  
  // scaling the unit based on the max value in the input data, so that the graph doesn't go out of the box
  const maxScaleUnit = (Math.ceil(Math.max(...currentMonthData, ...prevMonthData) / 5) + 1) * 5; 
  
  const data = {
    labels: ["Endurance", "Pull", "Squat", "Core", "Push"],
    datasets: [
      {
        label: "Current Month",
        data: currentMonthData,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderColor: "rgba(94, 204, 123, 1)",
        borderWidth: 2,
        borderJoinStyle: "miter",
        pointRadius: 0, // Remove circular points
        pointHoverRadius: 0, // Remove hover effect on points
      },
      {
        label: "Previous Month",
        data: prevMonthData,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderColor: "rgba(126, 135, 239, 1)",
        borderWidth: 2,
        borderJoinStyle: "miter",
        pointRadius: 0, // Remove circular points
        pointHoverRadius: 0, // Remove hover effect on points
      },
    ],
  };
  
  const options = {
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      r: {
        min: 0,
        max: maxScaleUnit,
        grid: {
          display: false,
        },
        ticks: {
          display: false, // hide scale labels
        },
        pointLabels: {
          display: false, // hide point labels
        },
        angleLines: {
          display: false,
          borderDash: [5, 5], // dotted line
          lineWidth: 1,
          color: [
            "rgba(219, 112, 147, 1)",
            "rgba(175, 198, 232, 1)",
            "rgba(253, 231, 168, 1)",
            "rgba(143, 216, 170, 1)",
            "rgba(116, 172, 209, 1)",
          ],
        },
      },
    },
  };
  return (
    <div className="w-[100%] h-[100%] max-w-[326px] max-h-[457px] bar-chart-style px-4 pb-3 flex flex-col justify-between items-start">
      <div className="w-full flex flex-row justify-between items-center">
        <img src="/assets/fire_radar_chart.svg" alt="star" height={74} width={74} className="relative right-[10px]"/>
        <div className="w-fit flex flex-col justify-center items-start gap-1 text-[15px]" style={{fontWeight: 600, letterSpacing: '0.292px' }}>
            <p className="text-[#7E87EF]">Previous Month</p>
            <p className="text-[#5ECC7B]">Current Month</p>
        </div>
      </div>
      <div className="w-full h-[250px] bg-center bg-contain bg-no-repeat flex flex-col justify-center items-center" style={{backgroundImage: `url(${'/assets/radar_chart_bg.svg'})`}}>
        <Radar data={data} options={options} className="relative left-[7px] top-[10px]"/>
      </div>
      <p className="bar-chart-text text-start text-[#ffffff42]"><span className="text-[#7E87EF]">Endurance,&nbsp;</span> is your strongest element of fitness</p>
    </div>
  );
}
