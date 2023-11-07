import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader, Error } from '../../components';
import { getWorkout } from './WorkoutSlice';

import SectionItem from './SectionItem';

const Section = () => {
  const dispatch = useDispatch();
  const status = useSelector((store) => store.workoutReducer.status);
  const workoutData = useSelector((store) => store.workoutReducer.workout); // Access the workout data from Redux store

  useEffect(() => {
    if (status === 'loading' || status === 'ready') {
      dispatch(getWorkout());
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return <Loader />;
  }

  if (status === 'error') {
    return <Error>Error Message</Error>; // Replace with actual error message
  }

  // Now, you can safely access the workout data
  return (
    <div className="bg-slate-50 pl-4">
      <div>
        <p className="font-['SF_Pro_Display'] text-[16px] font-bold not-italic leading-[25px] text-[#FFF]">
          Theme: {workoutData[0].theme} 
        </p>
        <p className="pt-[5px] font-['Regio_Mono'] text-[13.125px] font-normal not-italic leading-[normal] text-[#A3926F]">
          Theme: {workoutData[0].memberCode} 
        </p>
        {workoutData[0].program.map((data, index) => (
          <SectionItem  sectionList={workoutData[0].program} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Section;
