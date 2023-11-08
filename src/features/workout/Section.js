import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader, Error } from '../../components';
import { getWorkout } from './WorkoutSlice';

import SectionItem from './SectionItem';
import { useNavigate } from 'react-router-dom';

const Section = () => {
  const navigate= useNavigate();
  const dispatch = useDispatch();
  const status = useSelector((store) => store.workoutReducer.status);
  const workoutData = useSelector((store) => store.workoutReducer.workout); // Access the workout data from Redux store

  useEffect(() => {
    if (status === 'loading' || status === 'ready') {
      dispatch(getWorkout());
    }
  }, [dispatch, status]);

  const handleStart = () => {
    navigate('/section-details', { state: { sectionList: workoutData[0].program, index: 1 } });
  };

  if (status === 'loading') {
    return <Loader />;
  }

  if (status === 'error') {
    return <Error>Error Message</Error>; // Replace with actual error message
  }

  const topBgImgStyle = {
    backgroundImage:
      "url('./assets/workout-top.png') , lightgray 50% / cover no-repeat",
  };

  const bgStyle = {
    background:
      'linear-gradient(96deg, #999 1.59%, #616161 15%, #323232 19.77%, #818181 31.33%, #E7E7E7 43.14%, #848484 56.78%, #474747 67.1%, #C2C2C2 72.27%, #FFF 80.72%, #B7B7B7 87.42%, #242424 96.75%)',
    'mix-blend-mode': 'screen',
  };

  // Now, you can safely access the workout data
  return (
    <div className="bg-slate-50 h-[844px] w-[390px] pl-4">
      <div
        className="relative left-[-14px] top-2 h-[233px] w-[390px] pb-5"
        style={topBgImgStyle}
      >
        <h1 className="relative left-5 top-10 bg-clip-text text-[32px] font-[SF_Pro_Display] font-medium not-italic leading-[40px]">
          Rishi Solanki
        </h1>
        <p className="relative left-5 top-10 text-[12px] font-[SF_Pro_Text] font-extralight not-italic leading-[17px]">
          Let's crush this workout
        </p>
        <p className="relative left-5 top-20 text-[12px] font-[SF_Pro_Text] font-extralight not-italic leading-[17px]">
          Today's focus
        </p>
        <h2 className="relative left-5 top-20 text-[20px] font-[SF_Pro_Display] font-medium not-italic leading-[32px]">
          Theme: {workoutData[0].theme}
        </h2>
      </div>
      {workoutData[0].program.map((data, index) => (
        <SectionItem sectionList={workoutData[0].program} index={index} />
      ))}
      <div
        className="mt-4 flex h-[49px] w-[358px] items-center justify-center rounded-[12px] border-[2px] border-[rgba(209,209,209,0.70)] border-[solid] mix-blend-screen"
        style={bgStyle}
        onClick={handleStart}
      >
        <p className="text-[18px] font-[SF_Pro_Display] font-medium not-italic leading-[normal]">
          Start
        </p>
      </div>
      <div className="mt-4 flex h-[49px] w-[358px] items-center justify-center rounded-[12px] border-[2px]">
        <p className="text-[18px] font-[SF_Pro_Display] font-medium not-italic leading-[normal]">
          Customize Workout
        </p>
      </div>
    </div>
  );
};

export default Section;
