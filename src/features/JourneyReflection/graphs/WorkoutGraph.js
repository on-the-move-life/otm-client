import React from 'react'
import { Line, Legend, XAxis, YAxis, LineChart, Area } from 'recharts';

const WorkoutGraph = () => {
  const data = [
    { month: 'January', workouts: 10 },
    { month: 'February', workouts: 15 },
    { month: 'March', workouts: 8 },
    { month: 'April', workouts: 12 },
    { month: 'May', workouts: 20 },
    { month: 'June', workouts: 18 },
  ];
  
  const CustomTick = ({ x, y, payload }) => (
    <text x={x} y={y} dy={10} textAnchor="middle" fill="#ffffff" className="text-[10px]">
      {payload.value}
    </text>
  );

  return (
    <div className='flex items-center justify-center flex-shrink-0 w-[300px] sm:w-[900px] h-auto sm:ml-0 ml-4'>
      <div>
      <LineChart
        width={450}
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
        <Line type="monotone" dataKey="workouts" stroke="#8884d8" />
        <Area type="monotone" dataKey="workouts" fill="#FFF" />
      </LineChart>
      </div>
    </div>
  )
}

export default WorkoutGraph