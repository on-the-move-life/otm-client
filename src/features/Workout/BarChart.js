import { Bar } from 'react-chartjs-2';
export const BarChart = ({ chartData, maxValue }) => {
  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Weight Lifted (KG)',
          font: {
            size: 14,
          },
        },
        grid: {
          display: true, // Show gridlines
          color: 'rgba(255, 255, 255, 0.1)',

        },
        suggstedMin: 0,
        suggestedMax: maxValue+2, // Set the dynamic maximum value for the y-axis
        stepSize: Math.floor(maxValue/10),
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: function (tooltipItem, data) {
            if (tooltipItem[0]) {
              const dataIndex = tooltipItem[0].dataIndex;
              const barHeader = getBarHeader(dataIndex);
              return barHeader;
            }
            return '';
          },
        },
      },
    },
    layout: {
      padding: {
        left: 5,
        right: 5,
        top: 5,
        bottom: 5,
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
      },
    },
  };

  function getBarHeader(dataIndex) {
    if (dataIndex === 5) {
      return 'PR 10KG';
    } else {
      return ''; // Return an empty string for other bars
    }
  }

  return (
    <div className="chart-container">
      {/* <h2 style={{ textAlign: 'center' }}>Bar Chart</h2> */}
      <Bar data={chartData} options={options} />
    </div>
  );
};
