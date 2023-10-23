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
      <nav className="h-{13vh} flex w-full justify-between rounded-b-3xl bg-darkGray">
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
      </nav>
      <section className="px-4 pb-6 pt-10">
        <h1 className="text-3xl font-semibold">Hi, Rishi</h1>
        <div className="tags mt-2 space-x-3">
          <span className="border border-[#8DACEF66] bg-[#172339] text-[#8DACEF66]">
            Elite
          </span>
          <span className="border border-[#F2D670] bg-[#363629] text-[#F2D670]">
            Perfect Week x2
          </span>
        </div>
      </section>
      <section className="container grid grid-cols-2 grid-rows-2 gap-2 px-4">
        <div className="grid-title">
          <h4>Workouts Done</h4>
          <span>5</span>
        </div>
        <div className="grid-title">
          <h4>Fitness Score</h4>
          <span>8.5</span>
        </div>
        <div className="grid-title">
          <h4>Time Trained</h4>
          <span>46Hrs</span>
        </div>
        <div className="grid-title">
          <h4>Community Rank</h4>
          <span>8</span>
        </div>
      </section>
      <section className="px-4">
        <div className="main-section bg-blue">
          <h4>Workouts</h4>
          <div></div>
        </div>

        <div className="main-section bg-yellow">
          <h4>Meal Planner</h4>
          <div></div>
        </div>

        <div className="main-section bg-red">
          <h4>Leaderboard</h4>
          <div></div>
        </div>
      </section>
      <footer className="px-4 text-end text-2xl">
        <button onClick={handleLogout}>Logout</button>
      </footer>
    </div>
  );
};

export default Home;
