import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Error, Loader } from '../../components';

import Section from './Section';
import { getWorkout, setLoading } from './WorkoutSlice';

const Workout = () => {

  const {status, error}= useSelector((store) => store.workoutReducer)
  const dispatch= useDispatch();

  useEffect(() => {
    dispatch(setLoading());

    dispatch(getWorkout());
    console.log('got workout')
  }, [dispatch]);

  console.log(status, error)
  return (
    <>
      {status==='loading' && <Loader/>}
      {status === 'error' && <Error>{error}</Error>}
      {status === 'ready' && (
        <>
          <Section/>
        </>
      )}

    </>
  );
};

export default Workout;
