import React from 'react'
import { Bar, XAxis, YAxis, ComposedChart, Cell } from 'recharts';

const workoutGraph = ({apiData}) => {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const formattedData = apiData?.data?.monthlyConsistency?.map(item => ({
    ...item,
    MonthYear: `${monthNames[item.Month - 1]} ${item.Year}`
  }));
  
  const getBarColor = (workoutnumber) => {
    if (workoutnumber < 12) return '#FA5757';
    if (workoutnumber >= 12 && workoutnumber <= 20) return '#DDF988';
    if (workoutnumber > 20) return '#5ECC7B';
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
    <div className="flex h-auto flex-shrink-0 sm:ml-0 ml-[80px] px-4">
      <div className="">
        <ComposedChart
          width={500}
          height={300}
          data={formattedData}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <XAxis dataKey="MonthYear" tick={{ fontSize: 9 }} />
          <YAxis />
          <Bar dataKey="Count" fill="#8884d8" shape={<CustomBarShape />}>
            {apiData?.data?.monthlyConsistency?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.Count)} />
            ))}
          </Bar>
        </ComposedChart>
      </div>
    </div>
  );

}

export default workoutGraph