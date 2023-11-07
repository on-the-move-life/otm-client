import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Error, Loader } from '../../components';

import Section from './Section';
import { getWorkout, setLoading } from './WorkoutSlice';

const Workout = () => {
  // const [workout, setWorkout] = useState([]);
  // const [section, setSection] = useState([]);
  // const navigate = useNavigate();

  const {status, error}= useSelector((store) => store.workoutReducer)
  const dispatch= useDispatch();


  // const fetchWorkout = async () => {
  //   try {
  //     const workoutRes = await fetch(
  //       'https://otm-main-production.up.railway.app/api/v1/workout/hyper?memberCode=KU',
  //     );

  //     const workoutData = await workoutRes.json();
  //     setWorkout(workoutData);
  //     const sectionData = workoutData[0].program.slice(1);
  //     setSection(sectionData);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

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
