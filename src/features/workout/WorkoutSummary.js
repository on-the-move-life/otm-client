import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import SectionItem from './SectionItem';
import { Loader } from '../../components';

const WorkoutSummary = () => {
  console.log('loaded workout summary');
  const navigate = useNavigate();
  const [workoutSummary, setWorkoutSummary] = useState({});
  const [loading, setLoading] = useState(false);

  const { inputValues } = useSelector((store) => store.workoutReducer);
  console.log(inputValues);

  function getWorkoutSummary() {
    console.log('in get summary');

    const pl = {
      ...inputValues,
      code: 'KU',
      day: 'Nov Day 2',
      batch: 'HYPER',
    };
    console.log('pl', pl);
    setLoading(true);
    axios
      .post(
        'https://otm-main-production.up.railway.app/api/v1/workout/hyper/score',
        pl,
      )
      .then((res) => {
        console.log('workout summary', res.data);
        setWorkoutSummary(res.data);
      })
      .catch((err) => {
        console.log(err.message, 'ERROR');
        // Handle errors as needed
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    console.log('in ue');
    getWorkoutSummary();
  }, []);

  const handleHomeRedirect = () => {
    navigate('/home');
  };

  const bgStyle = {
    background:
      'linear-gradient(96deg, #999 1.59%, #616161 15%, #323232 19.77%, #818181 31.33%, #E7E7E7 43.14%, #848484 56.78%, #474747 67.1%, #C2C2C2 72.27%, #FFF 80.72%, #B7B7B7 87.42%, #242424 96.75%)',
    mixBlendMode: 'screen',
  };

  return (
    <>
      {loading && <Loader />}
      {workoutSummary && (
        <div className="bg-slate-50 h-[844px] w-[390px] overflow-hidden p-4">
          <div className="mt-5 flex w-2/5 items-center justify-between text-[17px]">
            <h2>Total Workouts </h2>
            <p className="rounded-[6px] border-[#B1B1B1] bg-[#1B1B1B] p-1">
              {workoutSummary.consistency.total}
            </p>
          </div>
          <p className="mt-4 w-40 rounded-[4px] border-[0.5px] border-[#323232] border-[solid] py-2 pl-1 text-[12px] font-[590] font-[SF_Pro] lowercase not-italic leading-[normal] tracking-[-0.36px]">
            {workoutSummary.consistency.weekly}
          </p>
          {/* {workoutSummary.sectionPerformance.slice(1).map((data, index) => (
            <SectionItem
              sectionList={workoutSummary.sectionPerformance.slice(1)}
              index={index}
              key={index}
              isReport={true}
            />
          ))} */}
          <div
            className="relative top-[6%] flex h-[49px] w-[358px] flex-shrink-0 items-center justify-center rounded-[12px] border-[2px] border-[rgba(209,209,209,0.70)] border-[solid] mix-blend-screen"
            style={bgStyle}
            onClick={handleHomeRedirect}
          >
            <p className="text-[18px] font-medium not-italic leading-[normal] text-[#000]">
              Done
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default WorkoutSummary;
