import React from 'react';
import { Line, Legend, XAxis, YAxis, LineChart, Area } from 'recharts';

const FitnessGraph = () => {
  const data = [
    { month: 'FEB - 1st Half', score: 1 },
    { month: 'FEB - 2nd Half', score: 4 },
    { month: 'MARCH - 1st Half', score: 3 },
    { month: 'MARCH - 2nd Half', score: 1 },
    { month: 'APR - 1st Half', score: 8 },
    { month: 'APR - 2nd Half', score: 5 },
  ];

  const CustomTick = ({ x, y, payload }) => (
    <text x={x} y={y} dy={10} textAnchor="middle" fill="#ffffff" className="text-[8px]">
      {payload.value}
    </text>
  );

  return (
    <div className='flex items-start flex-shrink-0 w-auto h-auto sm:ml-0 ml-[370px]'>
      <div>
      <LineChart
        width={830}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 20,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="month" tick={<CustomTick />} />
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
