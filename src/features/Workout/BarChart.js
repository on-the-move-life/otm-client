import { Bar } from 'react-chartjs-2';
export const BarChart = ({ chartData }) => {
  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Load (KG)',
          font: {
            size: 14,
          },
        },
        grid: {
          display: true, // Show gridlines
          color: 'rgba(255, 255, 255, 0.1)', // Set the color to white with some opacity
        },
        // ticks: {
        //   min: 0,
        //   max: 12,
        //   stepSize: 2,
        //   callback: function (value) {
        //     return value;
        //   },
        // },
        suggstedMin: 0,
        suggestedMax: 12, // Set the maximum value for the y-axis
        stepSize: 2,
        // callback: function (value) {
        //   // Customize the tick labels if needed
        //   return value + '%';
        // }
      },
    },
    plugins: {
      legend: {
        display: false,
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
    elements: {
      bar: {
        borderRadius: {
          topLeft: 5,
          topRight: 5,
          bottomLeft: 5,
          bottomRight: 5,
        },
        // borderSkipped: 'bottom', // Apply borderRadius to bottom corners
      },
    },
  };

  return (
    <div className="chart-container">
      <h2 style={{ textAlign: 'center' }}>Bar Chart</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};
