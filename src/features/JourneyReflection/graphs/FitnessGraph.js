import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import {
  Line,
  XAxis,
  YAxis,
  LineChart,
  Area,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { CustomizedProgressLabel } from '../CustomizedProgressLabel';

const calculatePercentageAndColor = (...ranges) => {
  const totalLength = ranges.reduce(
    (acc, [start, end]) => acc + (end - start),
    0,
  );

  const percentages = ranges.map(
    ([start, end]) => ((end - start) / totalLength) * 100,
  );

  const cumulativeSumArray = percentages.reduce((acc, current) => {
    acc.push((acc.length ? acc[acc.length - 1] : 0) + current);
    return acc;
  }, []);

  const colors = ['#FA5757', '#F5C563', '#DDF988', '#5ECC7B', '#7E87EF'];

  const getColorSlices = (start) => {
    if (start >= 0 && start <= 2) return colors;
    if (start > 2 && start <= 4) return colors.slice(1);
    if (start > 4 && start <= 6) return colors.slice(2);
    if (start > 6 && start <= 8) return colors.slice(3);
    if (start > 8) return colors.slice(4);
    return null;
  };

  const selectedColors = ranges.map(([start]) => getColorSlices(start));
  return { percentages, selectedColors, cumulativeSumArray };
};

const findMinAndMaxScores = (data) => {
  return data.reduce(
    (acc, curr) => {
      if (curr.score < acc.minScore) {
        acc.minScore = curr.score;
      }
      if (curr.score > acc.maxScore) {
        acc.maxScore = curr.score;
      }
      return acc;
    },
    { minScore: Infinity, maxScore: -Infinity },
  );
};

const splitRangeIntoEvenSegments = (start, end) => {
  const segments = [];
  let currentStart = start; // Start from the next integer

  const getNextEvenNumber = (num) => {
    const nextEven = Math.ceil(num / 2) * 2; // Round up to the next even number
    return nextEven;
  };

  while (currentStart < end) {
    let currentEnd = getNextEvenNumber(currentStart + 0.1); // Adjust for floating-point precision
    if (currentEnd > end) {
      currentEnd = end;
    }
    segments.push([currentStart, currentEnd]);
    currentStart = currentEnd;
  }

  return segments;
};

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
    return `${monthNames[month - 1]} 1st Half `;
  } else {
    return `${monthNames[month - 1]} 2nd Half `;
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

  const { minScore, maxScore } = findMinAndMaxScores(data);
  const segments = splitRangeIntoEvenSegments(minScore, maxScore);

  const percentArr = calculatePercentageAndColor(...segments);

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
            tick={{ width: 60, fontSize: 12 }}
            tickSize={8}
            dataKey="date"
            tickFormatter={customXAxisTickFormatter}
            interval={'preserveStartEnd'}
          />
          <YAxis
            domain={[0, 10]}
            dataKey="totalScore"
            label={{
              value: 'TOTAL SCORE',
              angle: -90,
              fontSize: 12,
              position: 'insideStart',
            }}
            tick={{ width: 80, fontSize: 12 }}
            minTickGap={4}
            tickSize={5}
            axisLine={false}
            tickCount={6}
            interval="preserveEnd"
          />
          <Tooltip
            content={({ payload }) => {
              if (payload && payload.length > 0) {
                const { payload: tooltipPayload } = payload[0];
                return (
                  <div className="custom-tooltip rounded-md border border-[#1c1c1e] bg-black  p-2 text-[#808080]">
                    <p>{`Date: ${customXAxisTickFormatter(
                      tooltipPayload.date,
                    )}`}</p>
                    <p>{`Count: ${tooltipPayload.score.toFixed(1)}`}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <CartesianGrid opacity={0.3} vertical={false} />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="100%" x2="0%" y2="0%">
              {percentArr.cumulativeSumArray.map((item, index) => {
                const color = percentArr.selectedColors[0][index];
                const previousItem =
                  percentArr.cumulativeSumArray[index - 1] || 0;
                return (
                  <>
                    <stop
                      key={`${index}-start`}
                      offset={`${previousItem}%`}
                      stopColor={color}
                      stopOpacity={1}
                    />
                    <stop
                      key={`${index}-end`}
                      offset={`${item}%`}
                      stopColor={color}
                      stopOpacity={1}
                    />
                  </>
                );
              })}
            </linearGradient>
          </defs>
          <Line
            dot={false}
            type="linear"
            dataKey="score"
            stroke="url(#gradient)"
            strokeWidth={2}
          />
          <Area type="monotone" dataKey="score" fill="#FFF" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FitnessGraph;
