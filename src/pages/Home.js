import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { logout, isSignUp } = useAuth();
  const [user, setUser] = useState({});

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
  }, []);

  return (
    <div className="flex h-screen w-screen flex-col">
      {/* <nav className="h-{13vh} flex w-full justify-between rounded-b-3xl bg-darkGray">
        <div className="text-lightGray flex w-8/12 justify-between px-4 pb-4 pt-8 text-xs">
          <div className="flex flex-col items-center">
            <span>LEVEL</span>
            <span className="text-red mt-2 text-2xl">5</span>
          </div>
          <div className="flex flex-col items-center">
            <span>GOALS</span>
            <span className="text-blue mt-2 text-xl">40%</span>
          </div>
          <div className="flex flex-col items-center">
            <span>PERFECT DAYS</span>
            <span className="text-floYellow mt-2 text-2xl">3</span>
          </div>
        </div>
        <span className="px-4 py-8">PROFILE</span>
      </nav> */}
      <section className="px-4 pb-6 pt-10">
        <h1 className="inline-block bg-gradient-to-r from-[#9BF2C0] to-[#91BDF6]  bg-clip-text text-3xl font-semibold text-transparent">
          Rishi Solanki
        </h1>
        <div className="tags mt-2 space-x-3">
          <span className="bg-[#172339] font-semibold text-[#C2D3FA]">
            Elite
          </span>
          <span className="bg-[#363629] font-semibold text-[#F2D670]">
            Perfect Week x2
          </span>
        </div>
        <p className="mt-2 w-11/12 font-extralight">
          Fitness is not a destination. It's a journey of self-improvement, one
          workout at a time.
        </p>
      </section>
      <section className="px-4">
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
        <div className="mt-4 grid grid-cols-2 rounded-xl border-[0.5px] border-[#383838] bg-gradient-to-b">
          <div className="main-stat">
            <h4>Workouts Done</h4>
            <span className="inline-block bg-gradient-to-r from-[#9BF2C0] to-[#91BDF6] bg-clip-text text-transparent">
              5
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

      <footer className="px-4 text-end text-2xl">
        <button onClick={handleLogout}>Logout</button>
      </footer>
    </div>
  );
};

export default Home;
