import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Error, Loader } from '../../components';
import { getWorkout, setLoading } from './WorkoutSlice';
import MainPage from './MainPage';

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
    if (memberCode) {
      dispatch(getWorkout(memberCode));
    } else {
      return <Error>No member code found</Error>;
    }
    console.log('got workout');
  }, [dispatch, memberCode]);

  console.log(status, error);
  return (
    <>
      {status === 'loading' && <Loader />}
      {status === 'error' && <Error>{error}</Error>}
      {status === 'ready' && <MainPage />}
    </>
  );
};

export default Workout;
