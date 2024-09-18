import React from 'react';
import SummaryTile from './components/SummaryTile';
import { isIPhone } from './utils';

function Summary({ circles, date, color }) {
  return (
    <div className="flex w-full flex-col items-center justify-start gap-3 ">
      {circles?.map((circle, index) => {
        return (
          <SummaryTile
            tileColor={color}
            circle={circle}
            key={index}
            date={date}
          />
        );
      })}
    </div>
  );
}

export default Summary;
