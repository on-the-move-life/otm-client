import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Error, Loader } from '../../components';

import Section from './Section';
import { getWorkout, setLoading } from './WorkoutSlice';

const Workout = () => {
  const { status, error } = useSelector((store) => store.workoutReducer);
  const dispatch = useDispatch();

  let memberCode = '';

  let user = localStorage.getItem('user');
  if (user && !user.includes('undefined')) {
    user = JSON.parse(user);
    memberCode = user['code'];
  }

  useEffect(() => {
    dispatch(getWorkout(memberCode));
    console.log('got workout');
  }, [dispatch, memberCode]);

  console.log(status, error);
  return (
    <>
      {status === 'loading' && <Loader />}
      {status === 'error' && <Error>{error}</Error>}
      {status === 'ready' && <Section />}
    </>
  );
};

export default Workout;
