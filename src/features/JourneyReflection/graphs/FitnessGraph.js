import React from 'react'
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
    if (score < 4) return 'red';
    if (score >= 4 && score <= 7) return 'yellow';
    if (score > 7) return 'green';
  };
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}
      C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
      ${x + width / 2},${y}
      C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width},${y + height}
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
    <div className='flex items-center justify-center flex-shrink-0 w-full sm:w-[900px] h-auto sm:ml-0 ml-24'>
      <div className=''>
      <ComposedChart
        width={650}
        height={300}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="month" tick={{ fontSize: 10 }} />
        <YAxis />
        <Bar dataKey="score" fill="#8884d8" shape={<CustomBarShape/>}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getBarColor(entry.score)} />
          ))}
        </Bar>
      </ComposedChart>
      </div>
    </div>
  )
}

export default FitnessGraph;