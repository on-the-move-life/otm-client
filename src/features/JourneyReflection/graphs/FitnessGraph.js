import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import {
  Line,
  Legend,
  XAxis,
  YAxis,
  LineChart,
  Area,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { CustomizedProgressLabel } from '../CustomizedProgressLabel';

const formatData = (data) => {
  const groupedData = {};
  data?.forEach((item) => {
    const { day, month, year } = item.assessmentMonth;
    const period = day <= 15 ? '1st half' : '2nd half';
    const key = `${year}-${month}-${period}`;

    if (!groupedData[key]) {
      groupedData[key] = {
        date: new Date(year, month - 1, day),
        score: item.totalScore,
      };
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
    'Jan',
    'Feb',
    'Mar',
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

  if (day <= 15) {
    return `${monthNames[month - 1]} 1st half `;
  } else {
    return `${monthNames[month - 1]} 2nd half `;
  }
};

const FitnessGraph = ({ apiData }) => {
  const [chartWidth, setChartWidth] = useState(400); // Initial width

  useEffect(() => {
    // Update the chart width when the window is resized
    const handleResize = () => {
      setChartWidth(window.innerWidth < 430 ? window.innerWidth - 5 : 400);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const data = formatData(apiData?.data?.fitnessScore);
  return (
    <div className="mx-auto my-auto mt-5 max-w-[450px]">
      <ResponsiveContainer width="95%" height={200}>
        <LineChart
          data={data}
          margin={{
            top: 22,
            right: 40,
            left: 20,
            bottom: 2,
          }}
        >
          <XAxis
            padding={{ left: 16 }}
            label={<CustomizedProgressLabel chartWidth={chartWidth} />}
            tick={{ width: 80, fontSize: 11 }}
            tickSize={8}
            dataKey="date"
            tickFormatter={customXAxisTickFormatter}
            interval={0}
          />
          <YAxis
            label={{
              value: 'TOTAL SCORE',
              angle: -90,
              fontSize: 12,
              position: 'insideLeft',
              offset: 20,
              YAxis: 67,
            }}
            tick={{ width: 80, fontSize: 11 }}
            minTickGap={4}
            tickSize={5}
            axisLine={false}
            className="mt-7"
          />
          <CartesianGrid opacity={0.3} vertical={false} />
          <defs>
            <linearGradient id="gradient" x1="8%" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#58C778" stopOpacity={0.8} />
              <stop offset="30%" stopColor="#F8C255" stopOpacity={0.7} />
              <stop offset="90%" stopColor="#FD5356" stopOpacity={0.9} />
            </linearGradient>
          </defs>

          <Line
            dot={false}
            type="linear"
            dataKey="score"
            stroke="url(#gradient)"
            strokeWidth={3}
          />
          <Area type="monotone" dataKey="score" fill="#FFF" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FitnessGraph;
