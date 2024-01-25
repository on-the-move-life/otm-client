import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Loader, Error, WeeklyWorkoutReport, FitnessScore, LeaderBoard, DuePaymentIndicator, MoveCoins } from '../components';
import { FaStar } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AiOutlinePoweroff, AiOutlineRight } from 'react-icons/ai';

const Home = () => {
  const { logout } = useAuth();
  // const [user, getUserFromStorage] = useState({});
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  const [homeStats, setHomeStats] = useState(null);
  const { getUserFromStorage, user } = useAuth();

  const showElite =
    homeStats && parseInt(homeStats.avgIntensity) > 100 ? true : false;

  const navigate = useNavigate();

  function handleLogout() {
    navigate('/login', { replace: true });
    logout();
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
          setHomeStats(res.data);
          setLoader(false);
          setError(null);
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
        <div className="flex h-screen w-screen flex-col px-4 gap-5">
          <section className="pb-6 pt-10">
            <div className="flex items-center justify-between">
              <h1 className="inline-block bg-gradient-to-r from-[#9BF2C0] to-[#91BDF6]  bg-clip-text text-3xl font-semibold text-transparent">
                {homeStats.name}
              </h1>
              <button onClick={handleLogout}>
                <AiOutlinePoweroff size={22} />
              </button>
            </div>
            <>
              {parseInt(homeStats.streak) > 0 && (
                <div className="flex items-center ">
                  <div className="perfect-week my-2 flex w-fit items-center rounded">
                    {/* <span className="pb-0.5">
                    <FaStar color="black" size={14} />{' '}
                  </span>

                  <span className="mx-0.5 text-xs -tracking-[0.36px]">
                    Perfect Week x{homeStats.streak}
                  </span> */}
                    <img src="/assets/perfect-week.svg" alt="" />{' '}
                  </div>
                  {/* <span className="mx-1 text-xs text-[#F1E7AC]">x{homeStats.streak}</span> */}
                </div>
              )}
              {homeStats.avgIntensity > 75 && (
                <span className="mx-2 rounded bg-[#7CDCF6] px-2 py-0.5 font-bold text-black">
                  {showElite ? 'Elite' : 'Advanced'}
                </span>
              )}
            </>
            <p className="w-11/12 font-extralight text-lightGray">
              Fitness is not a destination. It's a journey of self-improvement,
              one workout at a time.
            </p>
          </section>
          <section>
            <WeeklyWorkoutReport currentScore={homeStats?.consistency} suggestedWorkoutPerWeek={homeStats?.frequency} lastEightWeeksWorkout={homeStats?.lastEightWeeksWorkout} />
          </section>
          <section>
            <FitnessScore score={homeStats?.score} percentile={homeStats?.fitnessPercentileScore} />
          </section>
          <section className='w-full flex flex-row justify-center items-center gap-3'>
            <LeaderBoard rank={homeStats?.rank} />
            <MoveCoins coins={homeStats?.points}/>
          </section>
          {
            homeStats?.isPaymentDue &&
            <section>
              <DuePaymentIndicator />
            </section>
          }
          <Link to="/workout" className="main-cta">
            <span className="inline-block bg-gradient-to-r from-[#9BF2C0] to-[#91BDF6] bg-clip-text text-transparent">
              Workouts
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
