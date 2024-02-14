import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Loader, Error } from '../../components';
import {
  WeeklyWorkoutReport,
  FitnessScore,
  LeaderBoard,
  DuePaymentIndicator,
  MoveCoins,
} from '.';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineRight } from 'react-icons/ai';
import { FaUser } from "react-icons/fa";
import { useUserContext } from '../../contexts/UserContext';


const Home = () => {
  const { setUserData } = useUserContext();
  const { logout } = useAuth();
  // const [user, getUserFromStorage] = useState({});
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  const [homeStats, setHomeStats] = useState(null);
  const { getUserFromStorage, user } = useAuth();

  const showElite =
    homeStats && parseInt(homeStats.avgIntensity) > 100 ? true : false;

  const navigate = useNavigate();

  function navigateToProfile() {
    navigate('/profile');
  }

  useEffect(() => {
    const today = new Date().toLocaleDateString('en-GB');

    getUserFromStorage();

    if (user === null) navigate('/');

    function getUserData() {
      setLoader(true);
      axios
        .get(`${process.env.REACT_APP_INSIGHT_SERVICE_BASE_URL}/client`, {
          params: {
            email: user.email,
            day: today,
          },
        })
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            setUserData(res.data);
            setHomeStats(res.data);
            setLoader(false);
            setError(null);
          }
        })
        .catch((err) => {
          console.log(err.message);
          setHomeStats(null);
        });
    }

    if (user && user.email) {
      getUserData();
    } else {
      setError('Please login first');
    }
  }, []);

  return (
    <>
      {loader && <Loader />}
      {error && <Error>{error}</Error>}
      {homeStats && (
        <div className="flex min-h-screen w-screen flex-col gap-5 px-4 pb-8 ">
          <section className="pb-0 pt-10">
            <div className="flex items-center justify-between">
              <h1 className="inline-block bg-gradient-to-r from-[#9BF2C0] to-[#91BDF6]  bg-clip-text text-3xl font-semibold text-transparent">
                {homeStats.name}
              </h1>
              <button className='mr-4 mt-4' onClick={navigateToProfile}>
              {homeStats && homeStats?.profilePicture ? <img src={homeStats?.profilePicture} alt="profilePic" className='h-[50px] w-[50px] rounded-full object-cover'/>: <FaUser size={30}/>}
              </button>
            </div>
            <div className="flex items-center">
            {parseInt(homeStats.streak) > 0 && (
                <div className="flex items-center ">
                  <div className="perfect-week my-2 flex w-fit items-center rounded">
                    <img src="assets/star.svg" alt="" />
                    <span className="mx-0.5  text-xs font-[900] -tracking-[0.36px] text-[#4a3e1d]">
                      Perfect Week x{homeStats.streak}
                    </span>
                  </div>
                </div>
              )}
              {/* {homeStats.avgIntensity > 75 && (
                <span
                  className={`mx-2 rounded  ${
                    showElite ? 'bg-[#7E87EF]' : 'bg-[#7CDCF6]'
                  } px-2  py-0.5 text-[10px] font-extrabold text-black`}
                >
                  {showElite ? 'Elite' : 'Advanced'}
                </span>
              )} */}
            </div>
            <p className="w-11/12 font-extralight text-lightGray">
              Fitness is not a destination. It's a journey of self-improvement,
              one workout at a time.
            </p>
          </section>
          <section>
            <WeeklyWorkoutReport
              suggestedWorkoutPerWeek={homeStats?.frequency}
              lastEightWeeksWorkout={homeStats?.lastEightWeeksWorkout}
            />
          </section>
          <section>
            <FitnessScore
              score={homeStats?.score}
              percentile={homeStats?.fitnessPercentileScore}
            />
          </section>
          <section className='w-full flex flex-row justify-center items-center gap-3'>
            <LeaderBoard rank={homeStats?.workoutRank?.rank} totalParticipants={homeStats?.workoutRank?.totalMembers} />
            <MoveCoins coins={homeStats?.points}/>
          </section>
          {homeStats?.isPaymentDue && (
            <section>
              <DuePaymentIndicator />
            </section>
          )}
          <Link to="/workout" className="main-cta">
            <span className="inline-block bg-gradient-to-r from-[#9BF2C0] to-[#91BDF6] bg-clip-text text-transparent">
              Workouts
            </span>
            <span>
              <AiOutlineRight size={22} />
            </span>
          </Link>
          <Link to="/timeline" className="main-cta">
            <span className="inline-block bg-gradient-to-r from-[#9BF2C0] to-[#91BDF6] bg-clip-text text-transparent">
              Timeline
            </span>
            <span>
              <AiOutlineRight size={22} />
            </span>
          </Link>
        </div>
      )}
    </>
  );
};

export default Home;
