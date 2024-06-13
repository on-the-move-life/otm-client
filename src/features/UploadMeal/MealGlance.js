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

        <div>
            <div className="bg-mediumGray p-4 w-[410px] rounded-lg ">
                <div className="flex h-2.5 rounded-full w-auto">
                    <div className="flex-1  rounded-lg bg-[#FA5757] mr-1" style={{ width: "40%" }} />
                    <div className="flex-1 bg-[#7E87EF] rounded-lg mr-1" style={{ width: "17%" }} />
                    <div className="flex-1 bg-[#5ECC7B] mr-1 rounded-lg" style={{ width: "43%" }} />
                </div>
                <div className="flex text-white text-sm mt-2">
                    <span className='mr-2 text-[#FA5757] font-sfpro text-xs font-medium' > <p> 40% carbs </p> </span>
                    <span className='mr-2 text-[#7E87EF] font-sfpro text-xs font-medium'> <p>17% fats </p>  </span>
                    <span className='mr-2 text-[#5ECC7B] font-sfpro text-xs font-medium'> <p>43% protein </p> </span>
                </div>
            </div>
            {/* <div className="relative flex flex-col items-center justify-center w-full max-w-md mx-auto">
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
        </div> */}
        </div>
    )
}

export default MealGlance