import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Error, Loader } from '../../components';
import { getWorkout, setStatus } from './WorkoutSlice';
import MainPage from './MainPage';

const Workout = () => {
  const { status } = useSelector((store) => store.workoutReducer);
  const dispatch = useDispatch();
  let memberCode = '';

  let user = localStorage.getItem('user');
  if (user && !user.includes('undefined')) {
    user = JSON.parse(user);
    memberCode = user['code'];
  }

  useEffect(() => {
    if (memberCode) {
      dispatch(getWorkout(memberCode));
    } else {
      dispatch(setStatus('error'));
    }
  }, [dispatch, memberCode]);

  if (user === null || undefined) {
    return <Error>No User Found</Error>;
  }

  return (
    <>
      {status === 'loading' && <Loader />}
      {status === 'error' && <Error>Oops! Something Went Wrong</Error>}
      {status === 'success' && <MainPage />}
    </>
  );
};

export default Workout;
