import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Loader, Error, Counter } from '../../components';

import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUserContext } from '../../contexts/UserContext';
import FeatureUpdatePopup from '../../components/FeatureUpdatePopup';

import TotalWorkoutFitness from './TotalWorkoutFitness';
import { AiOutlineRight } from 'react-icons/ai';
import WeeklyWorkoutReport from './WeeklyWorkoutReport';
import FitnessScore from './FitnessScore';
import DuePaymentIndicator from './DuePaymentIndicator';
import { TimelineHeading } from '../Timeline/StyledComponents';

const FitnessPage = () => {
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

  console.log(homeStats);

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
      {!loader && !error && (
        <FeatureUpdatePopup backendVersion={homeStats?.lastSeenUiVersion} />
      )}
      {loader && <Loader />}
      {error && <Error>{error}</Error>}
      {homeStats && (
        <div className="flex w-screen grow flex-col gap-5 overflow-y-scroll px-4  pb-[78px]">
          <section className="pt-5 pb-0">
            <div className="flex justify-between">
              <div className="flex flex-col mt-3">
                <TimelineHeading>Fitness</TimelineHeading>

                {/* <h2 className="mt-3 inline-block w-40 bg-gradient-to-r from-[#9BF2C0] to-[#91BDF6]  bg-clip-text text-lg font-semibold text-transparent">
                  Today's Workout
                </h2> */}
              </div>
              {homeStats !== null && homeStats?.totalWorkoutsDone > 0 && (
                <TotalWorkoutFitness apiData={homeStats?.totalWorkoutsDone} />
              )}
            </div>
          </section>
          {/* <section>
            <div className="flex items-center">
              <div className="bg-gym-workout relative h-[102px] grow rounded-3xl">
                <div className="absolute bottom-1 left-4">
                  <h2 className="text-4xl font-semibold gradient-text">
                    Shred
                  </h2>
                  <div className="flex gap-3">
                    <h2 className="px-1 text-sm border rounded-md border-lightGray text-lightGray">
                      At Home
                    </h2>
                    <h2 className="px-1 text-sm border rounded-md border-lightGray text-lightGray">
                      60 mins
                    </h2>
                    <h2 className="px-1 text-sm border rounded-md border-lightGray text-lightGray">
                      {' '}
                      Knee Rehab
                    </h2>
                  </div>
                </div>
              </div>
              <div className="w-8 h-8 ml-2 text-3xl text-center rounded-full background-gray-gradient pb-7 text-white-opacity-23">
                +
              </div>
            </div>
          </section> */}

          <section>
            <WeeklyWorkoutReport
              consistencyTrend={homeStats?.consistencyTrend}
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
          {homeStats?.isPaymentDue && (
            <section>
              <DuePaymentIndicator />
            </section>
          )}
          <Link to="/workout" className="main-cta">
            <span className="inline-block bg-gradient-to-r from-[#9BF2C0] to-[#91BDF6] bg-clip-text text-transparent">
              Today's Workout
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

export default FitnessPage;
