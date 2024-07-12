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
  Tooltip,
} from 'recharts';
import { CustomizedWorkoutLabel } from '../CustomizedWorkoutLabel';
import ParabolicBar from './bar/ParabolicBar';

const WorkoutGraph = ({ apiData }) => {
  const [chartWidth, setChartWidth] = useState(400);

  const monthNames = [
    'Jan',
    'Feb',
    'March',
    'April',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
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
            tick={{ width: 55, fontSize: 13 }}
            padding={{ left: 6, right: 8 }}
            dataKey="MonthYear"
            className="pt-7"
            label={<CustomizedWorkoutLabel chartWidth={chartWidth} />}
            interval={'preserveStartEnd'}
          />
          <YAxis
            domain={[0, 20]}
            label={{
              value: 'NO. OF WORKOUTS',
              angle: -90,
              fontSize: 12,
              position: 'insideBottomLeft',
              offset: 25,
            }}
            axisLine={false}
            className="mt-7"
            tick={{ fontSize: 12 }}
            tickCount={6} // This sets the number of ticks on the Y-axis
            interval="preserveEnd"
          />
          <Tooltip
            content={({ payload }) => {
              if (payload && payload.length > 0) {
                const { payload: tooltipPayload } = payload[0];
                return (
                  <div className="custom-tooltip rounded-md border border-[#1c1c1e] bg-black  p-2 text-[#808080]">
                    <p>{`Date: ${tooltipPayload.MonthYear}`}</p>
                    <p>{`Count: ${tooltipPayload.Count}`}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <CartesianGrid opacity={0.3} vertical={false} />
          <Bar
            dataKey="Count"
            fill="#8884d8"
            shape={
              <ParabolicBar
                controlPointOffset={15}
                data={apiData?.data?.monthlyConsistency?.map((entry, index) => (
                  <Cell key={`cell-${index}`} />
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
