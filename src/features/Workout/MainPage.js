import { useDispatch, useSelector } from 'react-redux';
import { Loader, Error } from '../../components';
import SectionItem from './Section';
import { useNavigate } from 'react-router-dom';
import UpdateWorkout from './UpdateWorkout';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { setIndex } from './WorkoutSlice';
import { useState } from 'react';
import AnimatedComponent from '../../components/AnimatedComponent';

const MainPage = () => {
  const [showUpdateWorkout, setShowUpdateWorkout] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const status = useSelector((store) => store.workoutReducer.status);
  const workoutData = useSelector((store) => store.workoutReducer.workout);

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
    <div className="h-screen w-screen">
      {showUpdateWorkout && <UpdateWorkout onClose={handleUpdateClose} />}

      {!showUpdateWorkout && (
        <>
          {' '}
          <AnimatedComponent>
          <div className="mb-4 flex h-fit bg-workout-cover bg-cover bg-blend-soft-light bg-black/70 py-6">
            <div className="flex w-full justify-between px-4">
              <div className="h-full w-full flex flex-col justify-between items-start gap-4">
                <HiArrowNarrowLeft
                  size={20}
                  onClick={() => {
                    navigate('/home');
                  }}
                />
                <div className='w-full flex flex-col justify-center items-start mt-2'>
                  <h1 className="metallic-workout-gradient-text text-2xl font-semibold ">
                    {memberName}
                  </h1>
                  <span className="text-xs font-extralight tracking-wider text-lightGray">
                    Let's crush this workout
                  </span>
                  <span className="mt-6 text-xs tracking-widest text-lightGray">
                    TODAY'S FOCUS
                  </span>
                  <div className="flex gap-2">
                    <div>
                      <h2 className="text-xl">{workoutData.theme}</h2>
                    </div>
                    <div className="flex items-center justify-center rounded-[7px] border border-white w-[64px] h-[25px]">
                      <button onClick={() => setShowUpdateWorkout(true)}
                       className="rounded border bg-white text-center text-[10px] font-bold -tracking-[0.36px] text-black">
                        Edit Workout
                      </button>
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
          <div className="pb-32">
            <AnimatedComponent transition={{ duration: 0.8, ease: 'easeInOut' }}>
              {workoutData.program.map((data, index) => (
                <SectionItem
                  sectionList={workoutData.program}
                  index={index}
                  key={index}
                />
              ))}
            </AnimatedComponent>
          </div>
          <footer className="fixed bottom-4 w-full px-4">
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
              className="relative mt-2 w-full h-12 border-none rounded-lg bg-gradient-to-r from-[#686D76] via-[#FFFFFF] to-[#686D76] bg-[length:250%] bg-left text-[#FFFFFF] flex items-center justify-center cursor-pointer overflow-hidden animate-backgroundMove"
              onClick={() => setShowUpdateWorkout(true)}
            >
              <span className="absolute w-[97%] h-[90%] rounded-md bg-black bg-opacity-90 text-[#FFFFFF] flex items-center justify-center animate-backgroundMove">Build Your Workout</span>
            </button>
          </footer>
        </>
      )}
    </div>
  );
};

export default MainPage;
