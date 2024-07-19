import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Loader, Error } from '../../components';

import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUserContext } from '../../contexts/UserContext';
import FeatureUpdatePopup from '../../components/FeatureUpdatePopup';
import LifeStyleScore from './LifeStyleScore';
import LifeStyleRoutine from './LifeStyleRoutine';

const Lifestryle = () => {
  const { setUserData } = useUserContext();
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  const [homeStats, setHomeStats] = useState(null);
  const { getUserFromStorage, user } = useAuth();

  const navigate = useNavigate();

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
        <div className="flex flex-col w-screen gap-5 px-4 pb-8 overflow-y-scroll grow">
          <section className="pt-5 pb-0">
            <div className="flex justify-between">
              <div className="flex flex-col mt-3">
                <h1 className="bg-gradient-to-r from-[#9BF2C0] to-[#91BDF6]  bg-clip-text text-3xl font-semibold text-transparent">
                  Fitness
                </h1>
              </div>
            </div>
          </section>

          {homeStats?.showLifestyle === true && (
            <section className="flex flex-col items-center justify-center w-full gap-3">
              <LifeStyleScore
                completionPercentage={homeStats?.routineProgress}
              />
              <LifeStyleRoutine />
            </section>
          )}
        </div>
      )}
    </>
  );
};

export default Lifestryle;
