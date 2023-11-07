import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FitnessScore, Loader, Error } from '../components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AiOutlinePoweroff, AiOutlineRight } from 'react-icons/ai';

const Home = () => {
  const { logout, isSignUp } = useAuth();
  const [user, setUser] = useState({});
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  const [homeStats, setHomeStats] = useState(null);

  const navigate = useNavigate();

  function handleLogout() {
    navigate('/login', { replace: true });
    logout();
  }

  useEffect(() => {
    const theUser = localStorage.getItem('user');

    if (theUser && !theUser.includes('undefined')) {
      setUser(JSON.parse(theUser));
    }

    function getUserData() {
      setLoader(true);
      axios
        .get('http://localhost:3001/user')
        .then((res) => {
          console.log(res.data);
          setHomeStats(res.data);
          setLoader(false);
        })
        .catch((err) => {
          console.log(err.message);
          setHomeStats(null);
        });
    }

    getUserData();
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
            <div className="tags mt-2 space-x-3">
              <span className="bg-[#172339] font-semibold text-[#C2D3FA]">
                Elite
              </span>
              <span className="bg-[#363629] font-semibold text-[#F2D670]">
                Perfect Week x{homeStats.totalPerfectWeeks}
              </span>
            </div>
            <p className="mt-2 w-11/12 font-extralight">
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
                EVOLVE CYCLE 1
              </span>
              <div>
                <span className="py-py rounded border-[0.5px] border-[#323232] px-2 text-xs font-bold text-lightGray">
                  Sep-Nov 2023
                </span>
                <span className="py-py ml-2 rounded border-[0.5px] border-[#323232] px-2 text-xs font-bold text-lightGray">
                  Week 2/12
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
                <h4>Fitness Score</h4>
                <span className="inline-block bg-gradient-to-r from-[#9BF2C0] to-[#91BDF6] bg-clip-text text-transparent">
                  8.5
                </span>
              </div>
              <div className="main-stat">
                <h4>Time Trained</h4>
                <span className="inline-block bg-gradient-to-r from-[#9BF2C0] to-[#91BDF6] bg-clip-text text-transparent">
                  46Hrs
                </span>
              </div>
              <div className="main-stat">
                <h4>Community Rank</h4>
                <span className="inline-block bg-gradient-to-r from-[#9BF2C0] to-[#91BDF6] bg-clip-text text-transparent">
                  8
                </span>
              </div>
            </div>
          </section>
          <Link to="/workout" className="main-cta">
            <span>Workouts</span>
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
