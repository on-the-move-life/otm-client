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
  const [loading, setLoading] = useState(true);

  const { inputValues } = useSelector((store) => store.workoutReducer);
  console.log(inputValues);

  function getWorkoutSummary() {
    console.log('in get summary');

    const pl = {
      ...inputValues,
      code: 'KU',
      day: 'Nov Day 76',
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

        setWorkoutSummary({
          ...res.data,
          sectionPerformance: res.data.sectionPerformance.slice(1),
        });
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
    getWorkoutSummary();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="h-screen w-screen py-8">
          <div className="mb-4 px-4 ">
            <div className="mb-2 flex space-x-3 ">
              <h2 className="text-2xl">Total Workouts</h2>
              <span className="rounded-lg border border-white bg-[#1B1B1B] p-1">
                {workoutSummary.consistency.total}
              </span>
            </div>
            <span className="rounded border border-[#323232] p-1 text-xs text-lightGray">
              {workoutSummary.consistency.weekly}
            </span>
          </div>

          {workoutSummary.sectionPerformance.map((data, index) => (
            <SectionItem
              sectionList={data}
              index={index}
              key={index}
              isReport={true}
            />
          ))}
          <div className="px-4">
            <button
              className="metallic-gradient mt-4 flex h-10 w-full items-center justify-center rounded-xl border border-[rgba(209,209,209,0.70)] text-center font-semibold text-black"
              onClick={() => {
                navigate('/home');
              }}
            >
              Back to Home
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default WorkoutSummary;
