import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MealGlance = () => {

    const data = {
        labels: ['Carbs', 'Fats', 'Protein'],
        datasets: [
            {
                label: 'Nutrient Distribution',
                data: [40, 17, 43],
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderRadius: 10, // For rounded corners
                barThickness: 20, // Adjust the thickness of the bars
            },
        ],
    };

    const options = {
        indexAxis: 'y', // Make the chart horizontal
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
            },
        },
        scales: {
            x: {
                beginAtZero: true,
                display: false, // Hide the x-axis
            },
            y: {
                beginAtZero: true,
                display: false, // Hide the y-axis
            },
        },
        layout: {
            padding: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20,
            },
        },
    };




    return (
        <div className="relative flex flex-col items-center justify-center w-full max-w-md mx-auto">
            <div className="relative w-full">
                <Bar data={data} options={options} />
            </div>
            <div className="flex justify-around w-full mt-4 text-white">
                <div className="flex flex-col items-center">
                    <p className="text-red-500">40% carbs</p>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-blue-500">17% fats</p>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-green-500">43% protein</p>
                </div>
            </div>
        </div>
    )
}

export default MealGlance