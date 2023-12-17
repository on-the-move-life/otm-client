import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Section } from '../Workout';
import { Error, Loader } from '../../components';
import { HiHome } from 'react-icons/hi';
import { axiosClient } from './apiClient';
import { setStatus } from './WorkoutSlice';
// import { useAuth } from '../../contexts/AuthContext';

const WorkoutSummary = () => {
  const [workoutSummary, setWorkoutSummary] = useState({});

  const dispatch = useDispatch();

  const { inputValues, workout, status } = useSelector(
    (store) => store.workoutReducer,
  );

  // const { getUserFromStorage } = useAuth();

  // const today = new Date().toLocaleDateString('en-GB');

  function getWorkoutSummary() {
    const payload = {
      ...inputValues,
      code: workout.memberCode,
      day: workout.day,
      batch: 'HYPER',
    };

    dispatch(setStatus('loading'));
    axiosClient
      .post('/score', payload)
      .then((res) => {
        if (res.data) {
          dispatch(setStatus('success'));
          setWorkoutSummary({
            ...res.data,
            sectionPerformance: res.data.sectionPerformance.slice(1),
          });
        }
      })
      .catch((err) => {
        console.log(err.message, 'ERROR');
        dispatch(setStatus('error'));
        // Handle errors as needed
      });
  }

  useEffect(() => {
    if (inputValues && workout) {
      getWorkoutSummary();
    }
  }, []);

  return (
    <>
      {status === 'loading' && <Loader />}
      {status === 'error' && <Error>Oops! Something Went Wrong</Error>}

      {status === 'success' && Object.keys(workoutSummary).length > 0 && (
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
      )}
    </>
  );
};

export default WorkoutSummary;
