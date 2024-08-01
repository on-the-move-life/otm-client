import React from 'react';
import SummaryTile from './components/SummaryTile';
import { isIPhone } from './utils';

function Summary({ circles, date }) {
  return (
    <div className="flex flex-col items-center justify-start w-full gap-3 ">
      {circles?.map((circle, index) => {
        return <SummaryTile circle={circle} key={index} date={date} />;
      })}
    </div>
  );
}

export default Summary;
