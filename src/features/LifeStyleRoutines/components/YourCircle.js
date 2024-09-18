import React, { useMemo, useEffect, useState } from 'react';
import {
  MorningCircleIcon,
  AfternoonCircleIcon,
  EveningCircleIcon,
  NightCircleIcon,
  AlwaysActiveIcon,
} from '../index';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import CircleTask from './CircleTask';

function YourCircle({
  name,
  tasks,
  percentCompletion,
  date,
  setReloadCounter,
  time,
  setIsCircleOpen,
}) {
  const [tasksName, setTasksName] = useState('');
  const [showCircleDetails, setShowCircleDetails] = useState(false);

  const circleIcons = useMemo(
    () => ({
      'Morning Circle': <MorningCircleIcon />,
      'Afternoon Circle': <AfternoonCircleIcon />,
      'Evening Circle': <EveningCircleIcon />,
      'Night Circle': <NightCircleIcon />,
      'Always Active Circle': <AlwaysActiveIcon />,
    }),
    [],
  );

  const circleTime = useMemo(
    () => ({
      'Morning Circle': '8 AM',
      'Afternoon Circle': '12 PM',
      'Evening Circle': '5 PM',
      'Night Circle': '9 PM',
      'Always Active Circle': 'ALL DAY',
    }),
    [],
  );

  const colors = useMemo(
    () => [
      { threshold: 25, color: '#e74c3c' },
      { threshold: 50, color: '#F5C563' },
      { threshold: 75, color: '#7E87EF' },
      { threshold: 100, color: '#5ECC7B' },
    ],
    [],
  );

  const getColor = () => {
    for (let i = 0; i < colors.length; i++) {
      if (percentCompletion <= colors[i].threshold) {
        return colors[i].color;
      }
    }
    return colors[colors.length - 1].color;
  };

  const color = getColor();

  useEffect(() => {
    if (tasks.length > 0) {
      setTasksName(tasks.map((task) => task.name).join(', '));
    }
  }, []);

  return (
    <>
      {!showCircleDetails && (
        <div
          className="flex w-full flex-row items-center justify-between rounded-[12px] bg-black-opacity-45 px-4 py-2"
          onClick={() => {
            setShowCircleDetails(true);
            setReloadCounter(true);
            setIsCircleOpen(true);
          }}
        >
          <div className="flex w-full flex-row items-center justify-start gap-5">
            <div>{circleIcons[name]}</div>
            <div className="flex flex-col items-start justify-center">
              <p
                className="text-[12px] uppercase text-[#7E87EF]"
                style={{ fontWeight: 600 }}
              >
                {circleTime[name]}
              </p>
              <p className="text-[18.5px] capitalize text-[#F8F8F8]">{name}</p>
              <p className=" w-[200px] overflow-hidden text-ellipsis whitespace-nowrap text-[10px] text-[#545454]">
                {tasksName}
              </p>
            </div>
          </div>
          <div className="relative top-[8px]">
            <CircularProgressbar
              value={percentCompletion}
              circleRatio={0.5}
              strokeWidth={14}
              styles={buildStyles({
                rotation: 0.75,
                strokeLinecap: 'round',
                trailColor: '#ffffff1f',
                pathColor: color,
                pathTransitionDuration: 0.5,
              })}
              className="h-[50px] w-full"
            />
          </div>
        </div>
      )}
      {showCircleDetails && (
        <CircleTask
          SelectedCircle={name}
          tasks={tasks}
          date={date}
          setShowCircleDetails={setShowCircleDetails}
          setReloadCounter={setReloadCounter}
          setIsCircleOpen={setIsCircleOpen}
        />
      )}
    </>
  );
}

export default YourCircle;
