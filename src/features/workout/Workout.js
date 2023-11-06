import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Error, Loader } from '../../components';

import SectionItem from './SectionItem';
import { getWorkout } from './WorkoutSlice';

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
  }, [dispatch]);

  const handleStart = () => {
    navigate('/section-details', { state: { sectionList: section, index: 0 } });
  };

  return (
    <div>
      {workout && workout[0]?.program ? (
        <div>
          {section.map((sect, index) => (
            <SectionItem key={sect.code} sectionList={section} index={index} />
          ))}
          <p onClick={handleStart}>Start</p>
        </div>
      ) : (
        <p>Loading .....</p>
      )}
    </div>
  );
};

export default Workout;
