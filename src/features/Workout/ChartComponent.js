import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { useState } from 'react';
import { BarChart } from './BarChart';
import { Data } from './Data';

Chart.register(CategoryScale);

export default function ChartComponent() {
  const [chartData, setChartData] = useState({
    labels: Data.map((data) => {
      const dateObject = new Date(data.date);
      const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because getMonth returns zero-based index
      const day = dateObject.getDate().toString().padStart(2, '0');
      const formattedDate = `${month}-${day}`;
      return formattedDate;
    }),
    datasets: [
      {
        label: '',
        data: Data.map((data) => data.load),
        backgroundColor: Data.map((data) =>
        // const isLastOccurrenceOf10 = array.lastIndexOf(10) === index && data.load === 10;
          data.load === 10 ? '#DDF988' : '#89899D',
        ),
        borderColor: 'black',
        // borderWidth: 8,
        // borderRadius: {
        //   topLeft: 10,
        //   topRight: 10,
        //   bottomLeft: 10,
        //   bottomRight: 10,
        // },
        borderSkipped: false, // 'bottom',
        barThickness: 10, //'flex'
      },
    ],
  });

  return (
    <div>
      <BarChart chartData={chartData} />
    </div>
  );
}
