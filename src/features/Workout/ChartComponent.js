import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { useState } from 'react';
import { BarChart } from './BarChart';

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

Chart.register(CategoryScale);

export default function ChartComponent({data}) {
  const {loadHistory, personalRecord}= data;
  const lastOccurrenceIndex = loadHistory.map(entry => entry.load).lastIndexOf(personalRecord);

  const [chartData, setChartData] = useState({
    labels: loadHistory.map((data) => {
      const dateObject = new Date();
      const month = (dateObject.getMonth()).toString().padStart(2, '0'); // Adding 1 because getMonth returns zero-based index
      const day = dateObject.getDate().toString().padStart(2, '0');
      const formattedDate = `${day} ${monthNames[month]}`;
      return formattedDate;
    }),
    datasets: [
      {
        label: '',
        data: loadHistory.map((data) => data.load),
        backgroundColor: loadHistory.map((data, index, array) => {
          const isLastOccurrenceOfPR = lastOccurrenceIndex === index && data.load === personalRecord;
          return isLastOccurrenceOfPR ? '#DDF988': '#89899D';
        }),
        borderColor: 'black',
        borderSkipped: false,
        barThickness: 10,
      },
    ],
  });

  return (
    <div>
      <BarChart chartData={chartData} maxValue={personalRecord} />
    </div>
  );
}
