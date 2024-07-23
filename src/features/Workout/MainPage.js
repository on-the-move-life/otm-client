import { useDispatch, useSelector } from 'react-redux';
import { Loader, Error } from '../../components';
import SectionItem from './Section';
import { useNavigate } from 'react-router-dom';
import UpdateWorkout from './UpdateWorkout';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { setIndex } from './WorkoutSlice';
import { useEffect, useState } from 'react';
import AnimatedComponent from '../../components/AnimatedComponent';

const MainPage = () => {
  const [showUpdateWorkout, setShowUpdateWorkout] = useState(false);
  const [updatedWorkoutProgram, setUpdatedWorkoutProgram] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const status = useSelector((store) => store.workoutReducer.status);
  const workoutData = useSelector((store) => store.workoutReducer.workout);

  useEffect(() => {
    if (
      workoutData &&
      (!workoutData.coolDownSection || !workoutData.warmUpSection)
    ) {
      setUpdatedWorkoutProgram(...workoutData.program);
    }

    if (
      workoutData &&
      (workoutData.coolDownSection || workoutData.warmUpSection)
    ) {
      const workoutArr = [
        workoutData.warmUpSection,
        ...workoutData.program,
        workoutData.coolDownSection,
      ];

      const arrayFeed = workoutArr.some((item) => item.code === 'FEED');

      if (arrayFeed === true) {
        const secondLastIndex = workoutArr.length - 2;
        const lastIndex = workoutArr.length - 1;
        [workoutArr[secondLastIndex], workoutArr[lastIndex]] = [
          workoutArr[lastIndex],
          workoutArr[secondLastIndex],
        ];

        setUpdatedWorkoutProgram(workoutArr);
      }

      if (arrayFeed === false) {
        setUpdatedWorkoutProgram(workoutArr);
      }
    }
  }, [workoutData]);

  let memberName = 'Guest';
  let user = localStorage.getItem('user');
  if (user && !user.includes('undefined')) {
    user = JSON.parse(user);
    memberName = user['name'];
  }

  const handleUpdateClose = () => {
    setShowUpdateWorkout(false);
  };

  const handleStart = () => {
    dispatch(setIndex(0));
    navigate('/section-details');
  };

  if (status === 'loading') {
    return <Loader />;
  }

  if (status === 'error') {
    return <Error>Error Message</Error>; // Replace with actual error message
  }

  return (
    <div className="w-screen h-screen">
      {showUpdateWorkout && <UpdateWorkout onClose={handleUpdateClose} />}

      {!showUpdateWorkout && (
        <>
          {' '}
          <AnimatedComponent>
            <div className="flex py-6 mb-4 bg-cover h-fit bg-black/70 bg-workout-cover bg-blend-soft-light">
              <div className="flex justify-between w-full px-4">
                <div className="flex flex-col items-start justify-between w-full h-full gap-4">
                  <HiArrowNarrowLeft
                    size={20}
                    onClick={() => {
                      navigate('/home');
                    }}
                  />
                  <div className="flex flex-col items-start justify-center w-full mt-2">
                    <h1 className="text-2xl font-semibold metallic-workout-gradient-text ">
                      {memberName}
                    </h1>
                    <span className="text-xs tracking-wider font-extralight text-lightGray">
                      Let's crush this workout
                    </span>
                    <span className="mt-6 text-xs tracking-widest text-lightGray">
                      TODAY'S FOCUS
                    </span>
                    <div className="flex items-center justify-between w-full sm:justify-normal sm:gap-5">
                      <div className="flex items-center gap-2">
                        <div>
                          <h2 className="text-xl">{workoutData.theme}</h2>
                        </div>
                        <div className="flex items-center justify-center">
                          <button
                            onClick={() => setShowUpdateWorkout(true)}
                            className="w-fit rounded-[4px] border border-white bg-black p-[3px]"
                          >
                            <span className="block rounded-[4px] bg-white px-[2px] py-[1px] text-[10px] font-bold text-black">
                              Change
                            </span>
                          </button>
                        </div>
                      </div>
                      {(workoutData.workoutCalories ||
                        workoutData.workoutDuration) && (
                        <div className="flex flex-col items-end sm:flex-row sm:gap-2">
                          {workoutData.workoutCalories && (
                            <span className="text-sm ">
                              {workoutData.workoutCalories} calories
                            </span>
                          )}
                          {workoutData.workoutDuration && (
                            <span className="text-sm ">
                              {workoutData.workoutDuration} mins
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* <div className="mt-4 h-fit rounded-xl border border-white p-2 text-center text-[10px] uppercase tracking-widest">
            <p>{workoutData.day.split(' ')[0]} </p>
            <p>Day </p>
            <p className="text-base">{workoutData.day.split(' ')[2]}</p>
          </div> */}
              </div>
            </div>
          </AnimatedComponent>
          <div className="pb-32">
            <AnimatedComponent
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
              {updatedWorkoutProgram &&
                updatedWorkoutProgram.map((data, index) => (
                  <SectionItem
                    sectionList={updatedWorkoutProgram}
                    index={index}
                    key={index}
                  />
                ))}
            </AnimatedComponent>
          </div>
          <footer className="fixed w-full px-4 bottom-4">
            <button
              className="workout-gradient-button mt-4 flex h-12 w-full items-center justify-center rounded-xl border border-[rgba(209,209,209,0.70)] text-center"
              onClick={handleStart}
            >
              <p className="text-lg font-semibold text-black">START</p>
            </button>
            <style>
              {`
             @keyframes backgroundMove {
             0%, 100% { background-position: left; }
             50% { background-position: right; }
            }

            .animate-backgroundMove {
             animation: backgroundMove 3s infinite;
             }
            `}
            </style>
            <button
              className="animate-backgroundMove relative mt-2 flex h-12 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg border-none bg-gradient-to-r from-[#d1d1d1] via-[#FFFFFF] to-[#d1d1d1] bg-[length:250%] bg-left text-[#FFFFFF]"
              onClick={() => setShowUpdateWorkout(true)}
            >
              <span className="animate-backgroundMove absolute flex h-[90%] w-[97%] items-center justify-center rounded-md bg-black bg-opacity-90 text-[#ffffff]">
                Customise Workout
              </span>
            </button>
          </footer>
        </>
      )}
    </div>
  );
};

export default MainPage;
