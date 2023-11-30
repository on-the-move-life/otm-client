import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';
import Section from './Section';
import { Error, Loader } from '../../components';
import { HiHome } from 'react-icons/hi';

const WorkoutSummary = () => {
  console.log('loaded workout summary');
  const navigate = useNavigate();
  const [workoutSummary, setWorkoutSummary] = useState({});
  const [loading, setLoading] = useState(true);

  const { inputValues, workout } = useSelector((store) => store.workoutReducer);
  console.log(inputValues);

  function getWorkoutSummary() {
    console.log('in get summary');

    const pl = {
      ...inputValues,
      code: workout.memberCode,
      day: workout.day,
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
      ) : workoutSummary.consistency ? (
        <div className="h-screen w-screen py-8">
          <div className="mb-4 px-4 ">
            <div className="flex justify-between">
              <div className="mb-2 flex space-x-3 ">
                <h2 className="text-2xl">Total Workouts</h2>
                <span className="flex items-center justify-center rounded-lg border border-white bg-[#1B1B1B] p-1">
                  {workoutSummary.consistency?.total}
                </span>
              </div>

              <Link to="/home">
                <HiHome size={40} color="#5ECC7B" />
              </Link>
            </div>

            <span className="rounded border border-[#323232] p-1 text-xs text-lightGray">
              {workoutSummary.consistency?.weekly}
            </span>
          </div>

          {workoutSummary &&
            workoutSummary.sectionPerformance?.map((data, index) => (
              <Section
                sectionList={data}
                index={index}
                key={index}
                isReport={true}
              />
            ))}
        </div>
      ) : (
        <Error> no data</Error>
      )}
    </>
  );
};

export default WorkoutSummary;
