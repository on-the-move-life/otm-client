import React from 'react';
import YourCircle from './components/YourCircle';

function Routines({ circles, date, setReloadCounter, setIsCircleOpen }) {
  return (
    <div className="flex w-full flex-col items-start justify-center gap-3">
      <h3
        className="text-[20px] capitalize text-offwhite"
        style={{ lineHeight: '32px' }}
      >
        Your Circles
      </h3>
      {circles &&
        circles.map((circle) => {
          if (circle.tasks.length > 0) {
            return (
              <YourCircle
                name={circle?.name}
                percentCompletion={circle?.completionPercentage}
                tasks={circle?.tasks}
                date={date}
                setReloadCounter={setReloadCounter}
                time={circle?.tasks?.time}
                setIsCircleOpen={setIsCircleOpen}
              />
            );
          } else return null;
        })}
    </div>
  );
}

export default Routines;
