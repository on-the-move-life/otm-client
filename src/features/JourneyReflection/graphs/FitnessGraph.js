import React from 'react';
import { Line, Legend, XAxis, YAxis, LineChart, Area } from 'recharts';

const formatData = (data) => {
  const groupedData = {};
  data?.forEach(item => {
    const { day, month, year } = item.assessmentMonth;
    const period = day <= 15 ? '1st half' : '2nd half';
    const key = `${year}-${month}-${period}`;

    if (!groupedData[key]) {
      groupedData[key] = { date: new Date(year, month - 1, day), score: item.totalScore };
    } else {
      // Average the scores if there are multiple entries for the same period
      groupedData[key].score = (groupedData[key].score + item.totalScore) / 2;
    }
  });

  return Object.values(groupedData).sort((a, b) => a.date - b.date);
};

const customXAxisTickFormatter = (tick) => {
  const date = new Date(tick);
  const day = date.getDate();
  const month = date.getMonth() + 1;

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  if (day <= 15) {
    return `${monthNames[month - 1]} 1st half`;
  } else {
    return `${monthNames[month - 1]} 2nd half`;
  }
};

const FitnessGraph = ({apiData}) => {
  const data = formatData(apiData?.data?.fitnessScore)
  return (
    <div className='flex items-start flex-shrink-0 w-auto h-auto sm:ml-[0px] ml-[360px]'>
      <div>
      <LineChart
        width={800}
        height={400}
        data={data}
        margin={{
          top: 5,
          right: 40,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis
          dataKey="date"
          tickFormatter={customXAxisTickFormatter}
          tick={{ fontSize: '12px' }}
          interval={0}
        />
        <YAxis />
        <Legend />
        <Line type="monotone" dataKey="score" stroke="#8884d8" />
        <Area type="monotone" dataKey="score" fill="#FFF" />
      </LineChart>
      </div>
    </div>
  )
};

export default FitnessGraph;
