import React from 'react';
import { Bar, XAxis, YAxis, ComposedChart, Cell } from 'recharts';

const FitnessGraph = () => {
  const data = [
    { month: 'FEB - 1st Half', score: 1 },
    { month: 'FEB - 2nd Half', score: 4 },
    { month: 'MARCH - 1st Half', score: 3 },
    { month: 'MARCH - 2nd Half', score: 1 },
    { month: 'APR - 1st Half', score: 8 },
    { month: 'APR - 2nd Half', score: 5 },
  ];

  const getBarColor = (score) => {
    if (score < 4) return '#FA5757';
    if (score >= 4 && score <= 7) return '#DDF988';
    if (score > 7) return '#5ECC7B';
  };
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}
      C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
      ${x + width / 2},${y}
      C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${
        y + height
      } ${x + width},${y + height}
      Z`;
  };
  const CustomBarShape = (props) => {
    const { x, y, width, height, fill } = props;
    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
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
    <div className="ml-[22.5px] flex h-auto w-[600px] flex-shrink-0 items-center justify-center sm:ml-0 sm:w-[900px]">
      <div className="">
        <ComposedChart
          width={650}
          height={300}
          data={data}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <XAxis dataKey="month" tick={{ fontSize: 10 }} />
          <YAxis />
          <Bar dataKey="score" fill="#8884d8" shape={<CustomBarShape />}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.score)} />
            ))}
          </Bar>
        </ComposedChart>
      </div>
    </div>
  );
};

export default FitnessGraph;
