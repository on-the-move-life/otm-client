import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

export default function BarChart({ inputData = [4, 2, 6, 1, 4, 2, 1] }) {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend,
    );

    // options part
    const options = {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1|1.11,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                    color: "rgba(255, 255, 255, 0.11)", // grid line color
                    borderWidth: 1, // grid line width
                },
                ticks: {
                    display: true,
                    color: "rgba(255, 255, 255, 0.11)", // tick color
                    font: {
                        size: 12,
                        family: "Arial",
                    },
                },
                barPercentage: 0.5, // width of each bar (0.0 - 1.0)
                categoryPercentage: 0.5, // space taken by the bars in the category (0.0 - 1.0)
            },
            y: {
                beginAtZero: true,
                grid: {
                    display: true,
                    color: "rgba(255, 255, 255, 0.11)", // grid line color
                    borderWidth: 1, // grid line width
                },
                ticks: {
                    display: true,
                    color: "rgba(255, 255, 255, 0.11)", // tick color
                    font: {
                        size: 16,
                        family: "Arial",
                    },
                },
            },
        },
    };

    // data part
    const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]; // week days labels
    // border color of the bars are set using a threshold function(self explanatory)
    const borderColor = inputData.map((data) => {
        const value = data / 2;
        if (value <= 1) return "rgb(250, 87, 87)";
        else if (value <= 2) return "rgb(221, 249, 136)";
        else if (value <= 3) return "rgb(126, 135, 239)";
        else return "rgb(94, 204, 123)";
    });

    const data = {
        labels: labels,
        datasets: [
            {
                data: inputData,
                backgroundColor: "rgba(255,255,255,0.1)",
                borderColor: borderColor,
                borderWidth: 1,
                barThickness: 18,
                borderRadius: 2.7,
                borderSkipped: false,
            },
        ],
    };

    return (
        <div className="w-[100%] h-[100%] max-w-[326px] max-h-[457px] bar-chart-style px-4 pb-3 flex flex-col justify-between items-start">
            <img src="/assets/star_bar_chart.png" alt="star" height={74} width={74} className="relative right-[10px]"/>
            <Bar options={options} data={data} />
            <p className="bar-chart-text text-start text-[#ffffff42]" style={{marginBlock: '1em'}}><span className="text-[#7E87EF]">Wednesday,&nbsp;</span> is your favourite day to workout</p>
        </div>
    );
}
