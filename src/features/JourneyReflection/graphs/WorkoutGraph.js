import React from 'react'
import { Bar, XAxis, YAxis, ComposedChart, Cell } from 'recharts';

const workoutGraph = () => {
  const data = [
    { month: 'January', workouts: 10 },
    { month: 'February', workouts: 15 },
    { month: 'March', workouts: 8 },
    { month: 'April', workouts: 12 },
    { month: 'May', workouts: 20 },
    { month: 'June', workouts: 18 },
  ];
  const getBarColor = (workout) => {
    if (workout < 11) return '#FA5757';
    if (workout >= 11 && workout <= 16) return '#DDF988';
    if (workout > 16) return '#5ECC7B';
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
    <div className="flex h-auto flex-shrink-0 sm:ml-0 ml-[120px]">
      <div className="">
        <ComposedChart
          width={550}
          height={300}
          data={data}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <XAxis dataKey="month" tick={{ fontSize: 9 }} />
          <YAxis />
          <Bar dataKey="workouts" fill="#8884d8" shape={<CustomBarShape />}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.workouts)} />
            ))}
          </Bar>
        </ComposedChart>
      </div>
    </div>
  );

}

export default workoutGraph