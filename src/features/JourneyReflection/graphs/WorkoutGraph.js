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

  return (
    <div className='flex items-center justify-center'>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="month" />
        <YAxis />
        <Legend />
        <Line type="monotone" dataKey="workouts" stroke="#8884d8" />
        <Area type="monotone" dataKey="workouts" fill="#FFF" />
      </LineChart>
    </div>
  )
}

export default WorkoutGraph