import React, { useMemo, useState, useEffect } from 'react';
import {
  GrayMorningCircleIcon,
  GrayAfternoonCircleIcon,
  GrayEveningCircleIcon,
  GrayNightCircleIcon,
  GrayAlwaysActiveCircleIcon,
} from '../index';
// Import react-circular-progressbar module and styles
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import SummaryTag from './SummaryTag';
import CircleSummary from './CircleSummary';
import { getColor } from '../utils';

/**
 * @returns a component which shows the list of completed and incompleted tasks
 */

function SummaryTile({ circle, date }) {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [incompletedTasks, setIncompletedTasks] = useState([]);
  const [showSummary, setShowSummary] = useState(false);

  console.log(circle, date);

  const grayIcons = useMemo(() => {
    return {
      'Morning Circle': <GrayMorningCircleIcon />,
      'Afternoon Circle': <GrayAfternoonCircleIcon />,
      'Evening Circle': <GrayEveningCircleIcon />,
      'Night Circle': <GrayNightCircleIcon />,
      'Always Active Circle': <GrayAlwaysActiveCircleIcon />,
    };
  }, []);

  const colors = useMemo(
    () => [
      { threshold: 25, color: '#e74c3c' },
      { threshold: 50, color: '#F5C563' },
      { threshold: 75, color: '#7E87EF' },
      { threshold: 100, color: '#5ECC7B' },
    ],
    [],
  );

  const color = getColor(colors, circle?.completionPercentage);

  useEffect(() => {
    setCompletedTasks(circle?.tasks.filter((task) => task?.completed === true));
    setIncompletedTasks(
      circle?.tasks.filter((task) => task?.completed !== true),
    );
  }, [circle]);

  return (
    <>
      {!showSummary && (
        <div
          className="flex w-full flex-col items-start justify-start gap-[2px] bg-transparent"
          onClick={() => setShowSummary(true)}
        >
          <div className="flex w-full flex-row items-center justify-between  rounded-t-[12px] bg-[#1C1C1E] px-4 py-2">
            <div className="flex flex-row items-center justify-start gap-[3px]">
              {grayIcons[circle?.name]}
              <p className="text-[14px] text-[#F8F8F8]">{circle?.name}</p>
            </div>
            <div className="relative top-[5px]">
              <CircularProgressbar
                value={circle?.completionPercentage}
                circleRatio={0.5}
                strokeWidth={14}
                styles={buildStyles({
                  rotation: 0.75,
                  strokeLinecap: 'round',
                  trailColor: '#ffffff1f',
                  pathColor: color,
                  textSize: '16px',
                  pathTransitionDuration: 0.5,
                })}
                className="h-8 w-fit" // Set the size of the progress bar
              />
            </div>
          </div>
          {completedTasks.length > 0 && (
            <div className="flex w-full flex-row flex-wrap items-center justify-start gap-2 bg-[#1C1C1E] px-4 py-2">
              {circle?.tasks.map((task) => {
                return (
                  task?.completed === true && (
                    <SummaryTag
                      key={task?.taskId}
                      name={task?.name}
                      id={task?.taskId}
                      isCompleted={task?.completed}
                    />
                  )
                );
              })}
            </div>
          )}
          {incompletedTasks.length > 0 && (
            <div className="flex w-full flex-row flex-wrap items-center justify-start gap-2 rounded-b-[12px] bg-[#1C1C1E] px-4 py-2">
              {circle?.tasks.map((task) => {
                return (
                  task?.completed !== true && (
                    <SummaryTag
                      key={task?.taskId}
                      name={task?.name}
                      id={task?.taskId}
                      isCompleted={task?.completed}
                    />
                  )
                );
              })}
            </div>
          )}
        </div>
      )}
      {showSummary && (
        <CircleSummary
          circleName={circle?.name}
          circleTasks={circle?.tasks}
          completionPercentage={circle?.completionPercentage}
          setShowSummary={setShowSummary}
          date={date}
        />
      )}
    </>
  );
}

export default SummaryTile;
