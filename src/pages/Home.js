import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FitnessScore, Loader, Error } from '../components';
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
        <div className="flex h-screen w-screen flex-col px-4">
          <section className="pb-6 pt-10">
            <div className="flex items-center justify-between">
              <h1 className="inline-block bg-gradient-to-r from-[#9BF2C0] to-[#91BDF6]  bg-clip-text text-3xl font-semibold text-transparent">
                {homeStats.name}
              </h1>
              <button onClick={handleLogout}>
                <AiOutlinePoweroff size={22} />
              </button>
            </div>
            <div className="tags space-x-3">
              {homeStats.avgIntensity > 75 && (
                <span className="bg-[#172339] p-1 text-xs font-semibold text-[#C2D3FA]">
                  {showElite ? 'Elite' : 'Advanced'}
                </span>
              )}
              {parseInt(homeStats.streak) > 0 && (
                <span className="bg-[#363629] p-1 text-xs font-semibold  text-[#F2D670]">
                  Perfect Week x{homeStats.streak}
                </span>
              )}
            </div>
            <p className="mt-2 w-11/12 font-extralight text-lightGray">
              Fitness is not a destination. It's a journey of self-improvement,
              one workout at a time.
            </p>
          </section>
          <section className="mb-4 rounded-xl border-[0.5px] border-[#323232] bg-darkGray">
            <p className="m-4 text-center text-xs tracking-widest text-lightGray">
              FITNESS SCORE
            </p>
            <FitnessScore progress={homeStats.score} />
          </section>
          <section>
            <p className="inline-block bg-gradient-to-r from-[#9BF2C0] to-[#91BDF6] bg-clip-text text-xl font-semibold text-transparent">
              At a glance
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs tracking-widest text-lightGray">
                EVOLVE CYCLE {homeStats.evolveCycleDetails?.count || 0}
              </span>
              <div>
                <span className="py-py rounded border-[0.5px] border-[#323232] px-2 text-xs text-lightGray">
                  {homeStats.evolveCycleDetails?.duration}
                </span>

                <span className="py-py ml-2 rounded border-[0.5px] border-[#323232] px-2 text-xs text-lightGray">
                  Week {homeStats.evolveCycleDetails.currentWeek}/
                  {homeStats.evolveCycleDetails?.totalWeeks}
                </span>
              </div>
            </div>
            <div className="mt-2 grid grid-cols-2 rounded-xl border-[0.5px] border-[#383838] bg-gradient-to-b">
              <div className="main-stat">
                <h4>Workouts Done</h4>
                <span className="inline-block bg-gradient-to-r from-[#9BF2C0] to-[#91BDF6] bg-clip-text text-transparent">
                  {homeStats.totalWorkoutsDone}
                </span>
              </div>
              <div className="main-stat">
                <h4>level</h4>
                <span className="inline-block bg-gradient-to-r from-[#9BF2C0] to-[#91BDF6] bg-clip-text text-transparent">
                  {Math.ceil(homeStats.totalWorkoutsDone / 11)}
                </span>
              </div>
              <div className="main-stat">
                <h4>Points</h4>
                <span className="inline-block bg-gradient-to-r from-[#9BF2C0] to-[#91BDF6] bg-clip-text text-transparent">
                  {homeStats.points}
                </span>
              </div>
              <div className="main-stat">
                <h4>Community Rank</h4>
                <span className="inline-block bg-gradient-to-r from-[#9BF2C0] to-[#91BDF6] bg-clip-text text-transparent">
                  {homeStats.rank}
                </span>
              </div>
            </div>
          </section>
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
