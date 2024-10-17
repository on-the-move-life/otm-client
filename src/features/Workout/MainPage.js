import { useDispatch, useSelector } from 'react-redux';
import { Loader, Error } from '../../components';
import SectionItem from './Section';
import { useNavigate, useParams } from 'react-router-dom';
import UpdateWorkout from './UpdateWorkout';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { setIndex } from './WorkoutSlice';
import { useEffect, useState } from 'react';
import AnimatedComponent from '../../components/AnimatedComponent';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import LazyImage from '../../components/LazyLoadImage';

const MainPage = () => {
  const [showUpdateWorkout, setShowUpdateWorkout] = useState(false);
  const [updatedWorkoutProgram, setUpdatedWorkoutProgram] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const queryString = window.location.search;
  const queryParams = new URLSearchParams(queryString);
  const movementId = queryParams.get('movementId');
  const date = queryParams.get('date');
  const status = useSelector((store) => store.workoutReducer.status);
  const workoutData = useSelector((store) => store.workoutReducer.workout);

  useEffect(() => {
    if (
      workoutData &&
      (!workoutData.coolDownSection || !workoutData.warmUpSection)
    ) {
      setUpdatedWorkoutProgram(workoutData.program);
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
    navigate(
      `/section-details/${params.value}?movementId=${movementId}&date=${date}`,
    );
  };

  if (status === 'loading') {
    return <Loader />;
  }

  if (status === 'error') {
    return <Error>Error Message</Error>; // Replace with actual error message
  }

  return (
    <div className=" h-screen w-screen  bg-cover">
      <img
        loading="eager"
        src={'/assets/Movement-Frame.png'}
        className={`absolute left-0 -z-20 h-screen w-full saturate-150 ${
          showUpdateWorkout === true ? 'top-0' : 'top-60 '
        } `}
      />
      {showUpdateWorkout && <UpdateWorkout onClose={handleUpdateClose} />}

      {!showUpdateWorkout && (
        <>
          {' '}
          <AnimatedComponent>
            <div
              className={` flex  h-[246px] overflow-hidden  bg-full py-6 bg-blend-soft-light `}
            >
              <LazyImage
                hash={
                  workoutData.theme
                    ? '|28NteQ-4TNH_M4TH?b^%#$*8xt7kqxa%LtRx]bb.89FRP.7Ndx[RjaKR5yXIUV@V[RjS4xuofn4RPt7tR%LIAM|R+ozxuxtofaKWBbcWBR+RkX8jFj[n$bbtRV@jFjZRkH?tRbbozjEsmo2jFRPV[WXaKaexuaxt7t7of'
                    : '|ABDTh_3WBRPxus:Rkoeof-oR*t7ofWBofazjZfk~q%MbHRjbHt7WBWVkCx]ofRjofofV@ofayayjERjoffkWBofWBj[j@o#j[WBkCjsWBj[jZa|x[oKWVj@ofWBofayazRij[a|j[WBofWBj[a|ozWVayoLazWBj]j[WB'
                }
                altText={'Image not found'}
                src={
                  workoutData.theme
                    ? '/assets/workout-img.png'
                    : '/assets/flex-img.png'
                }
                ImageWrapperClassName={
                  'absolute left-0 top-0 -z-10  h-[246px] w-full '
                }
                ImageClassName={'h-[246px] w-screen  object-cover'}
              />

              <div className="flex w-full justify-between px-4">
                <div className="flex h-full w-full flex-col items-start justify-between gap-4">
                  <HiArrowNarrowLeft
                    size={20}
                    onClick={() => {
                      navigate('/home');
                    }}
                  />
                  <div className="mt-2 flex w-full flex-col items-start justify-center">
                    <h1 className="metallic-workout-gradient-text text-[32px] leading-[40px]  text-offwhite">
                      {memberName}
                    </h1>
                    <span className="text-sm   text-white-opacity-50">
                      Let's crush this workout
                    </span>

                    <div className="flex w-full justify-between">
                      <div className="flex grow flex-col">
                        <span className="mt-4 text-sm  text-white-opacity-50">
                          Today's Focus
                        </span>

                        <div>
                          {workoutData.theme ? (
                            <div className="flex items-center gap-2">
                              <div>
                                <h2 className="text-xl text-offwhite">
                                  {workoutData.theme}
                                </h2>
                              </div>

                              <button
                                onClick={() => setShowUpdateWorkout(true)}
                                className="flex h-[18px] w-fit  justify-center rounded-[4px] bg-offwhite px-2 "
                              >
                                <span className="  text-[12px] text-black">
                                  Change
                                </span>
                              </button>
                            </div>
                          ) : (
                            <div>
                              <h2 className="text-xl text-offwhite">Core</h2>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex  items-end justify-between sm:justify-normal sm:gap-5">
                        {(workoutData.workoutCalories ||
                          workoutData.workoutDuration) && (
                          <div className="flex flex-col items-end text-offwhite sm:flex-row sm:gap-2">
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
                </div>

                {/* <div className="mt-4 h-fit rounded-xl border border-white p-2 text-center text-[10px] uppercase tracking-widest">
            <p>{workoutData.day.split(' ')[0]} </p>
            <p>Day </p>
            <p className="text-base">{workoutData.day.split(' ')[2]}</p>
          </div> */}
              </div>
            </div>
          </AnimatedComponent>
          <div className="pb-32 pt-[24px]">
            <AnimatedComponent
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
              {updatedWorkoutProgram &&
                updatedWorkoutProgram.length > 0 &&
                updatedWorkoutProgram.map((data, index) => (
                  <SectionItem
                    movementId={movementId}
                    date={date}
                    sectionList={updatedWorkoutProgram}
                    index={index}
                    key={index}
                  />
                ))}
            </AnimatedComponent>
          </div>
          <footer className="fixed bottom-4 w-full px-4">
            <button
              className=" mt-4 flex h-12 w-full items-center justify-center rounded-lg bg-[#F8F8F8]   text-center"
              onClick={handleStart}
            >
              <p className="text-lg font-semibold text-black">Start</p>
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
            {params.value === 'today' && (
              <button
                className="animate-backgroundMove relative mt-2 flex h-12 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg border-none bg-gradient-to-r from-[#d1d1d1] via-[#FFFFFF] to-[#d1d1d1] bg-[length:250%] bg-left text-[#FFFFFF]"
                onClick={() => setShowUpdateWorkout(true)}
              >
                <span className="animate-backgroundMove absolute flex h-[90%] w-[97%] items-center justify-center rounded-md bg-black bg-opacity-90 text-[#ffffff]">
                  Customise Workout
                </span>
              </button>
            )}
          </footer>
        </>
      )}
    </div>
  );
};

export default MainPage;
