import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import {
  Bar,
  XAxis,
  YAxis,
  ComposedChart,
  Cell,
  ResponsiveContainer,
  CartesianGrid,
  Line,
} from 'recharts';
import { CustomizedWorkoutLabel } from '../CustomizedWorkoutLabel';
import ParabolicBar from './bar/ParabolicBar';

const WorkoutGraph = ({ apiData }) => {
  const [chartWidth, setChartWidth] = useState(400);

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  useEffect(() => {
    const handleResize = () => {
      setChartWidth(window.innerWidth < 430 ? window.innerWidth - 20 : 400);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const formattedData = apiData?.data?.monthlyConsistency?.map((item) => ({
    ...item,
    MonthYear: `${monthNames[item.Month - 1]} ${item.Year}`,
  }));

  const getBarColor = (workoutnumber) => {
    if (workoutnumber < 12) return '#FA5757';
    if (workoutnumber >= 12 && workoutnumber <= 20) return '#DDF988';
    if (workoutnumber > 20) return '#5ECC7B';
  };

  //const BellBarShape = (props) => {
  //const { x, y, width, height, fill } = props;
  //const path = `
  //M${x},${y + height}
  //Q${x + width / 2},${y - height}
  //${x + width},${y + height}
  //Z
  //`;
  //return <path d={path} stroke="none" fill={fill} />;
  //};
  return (
    <div className="mx-auto my-auto mt-5 max-w-[450px]">
      <ResponsiveContainer width="95%" height={200}>
        <ComposedChart
          width={500}
          height={300}
          data={formattedData}
          margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
        >
          <XAxis
            padding={{ left: 6, right: 8 }}
            dataKey="MonthYear"
            className="pt-7"
            label={<CustomizedWorkoutLabel chartWidth={chartWidth} />}
          />
          <YAxis
            label={{
              value: 'NO. OF WORKOUTS',
              angle: -90,
              fontSize: 12,
              position: 'insideBottomLeft',
              offset: 25,
            }}
            axisLine={false}
            className="mt-7"
            minTickGap={0}
            tick={{ fontSize: 13 }}
          />
          <CartesianGrid opacity={0.3} vertical={false} />
          <Bar
            dataKey="Count"
            fill="#8884d8"
            shape={
              <ParabolicBar
                controlPointOffset={15}
                data={apiData?.data?.monthlyConsistency?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.Count)} />
                ))}
              />
            }
          />
          <Line
            dot={false}
            type="monotone"
            dataKey="Count"
            stroke="#7D86EB"
            strokeWidth={2}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WorkoutGraph;
