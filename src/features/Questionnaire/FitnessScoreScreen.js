import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useTagAndColor } from '../../hooks/useTagAndColor';
import FitnessLoader from './FitnessLoader';

const HorizontalBar = styled.div`
  --color: ${(props) => props.color};
  width: 40px;
  height: 7.7px;
  border-radius: 5px;
  background: var(--color);
`;

const TagText = styled.p`
  color: #000;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 590;
  line-height: normal;
  letter-spacing: -0.36px;
  text-transform: capitalize;
`;

function FitnessScorePage({
  setShowFitnessInsightScreen,
  fitnessScorePageLoading,
  fitnessScoreData,
}) {
  const [name, setName] = useState(null);
  const [timer, setTimer] = useState(true);

  const [pageError, setPageError] = useState(false);
  const navigate = useNavigate();

  // function to determine if the devive is iPhone or not
  const isIPhone = () => {
    const userAgent = navigator.userAgent;
    console.log('user agent : ', userAgent.includes('iPhone'));
    return userAgent.includes('iPhone');
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')) || {};
    setName(user.name);

    // Simulate loading timer (e.g., 2 seconds)
    const time = setTimeout(() => {
      setTimer(false);
    }, 5000);

    return () => clearTimeout(time); // Cleanup the timer on component unmount
  }, []);

  // function getFitnessScore(email) {
  //   setPageLoading(true);
  //   axiosClient
  //     .get(`/signup/snapshot?email=${email}`)
  //     .then((res) => {
  //       console.log(res);
  //       setData(res?.data);
  //     })
  //     .catch((err) => {
  //       setPageError(true);
  //       console.log(err);
  //     })
  //     .finally(() => {
  //       setTimeout(() => {
  //         setPageLoading(false);
  //       }, 1000);
  //     });
  // }

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const email = user['email'];
      const name = user['name'];
      setName(name);
      // getFitnessScore(email);
    } catch (err) {}
  }, []);

  // Indicator component
  const Indicator = ({ style }) => {
    return (
      <div style={style} className="relative">
        <div className="h-[12px] w-[2px] bg-white"></div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="8"
          height="8"
          viewBox="0 0 2 2"
          className="absolute bottom-0 left-[-3px]"
        >
          <polygon points="0,2 1,0 2,2" fill="white" />
        </svg>
      </div>
    );
  };

  // Score Indicator component
  const ScoreIndicator = ({ score }) => {
    const [tag, color, position, colors, tags] = useTagAndColor(score, 40);
    return (
      <div className="flex w-full flex-col  justify-start gap-2 rounded-t-[12px] bg-black-opacity-65 p-4">
        <p
          className=" font-sfpro text-[14px] text-white
          "
          style={{ fontWeight: 500 }}
        >
          Your Fitness Insights
        </p>

        <div
          className="flex w-full flex-row items-center justify-between px-3"
          style={{ marginBlock: '8px' }}
        >
          <div className="flex flex-col items-start justify-center gap-1">
            <p
              className="text-[9.3px]  text-[#929292]"
              style={{ fontWeight: 500 }}
            >
              Fitness score
            </p>
            <div
              className="font-futura text-[45px] "
              style={{
                fontWeight: 400,

                color: color,
              }}
            >
              {score}
            </div>
          </div>
          <div className="flex w-fit flex-col items-start justify-center gap-4">
            <div className="flex flex-col items-start justify-center gap-1">
              <p
                className="text-[9.3px] uppercase text-[#929292]"
                style={{ fontWeight: 500 }}
              >
                Fitness Level
              </p>
              <div
                style={{ backgroundColor: color }}
                className="flex h-fit w-fit flex-row items-center justify-center rounded-[4px] px-[5px] py-[1px]"
              >
                <TagText>{tag}</TagText>
              </div>
            </div>

            <div className="relative w-fit">
              <Indicator
                style={{
                  position: 'absolute',
                  left: `${position}px`,
                  top: '3px',
                }}
              />
              <div className="flex w-fit flex-row items-center justify-center gap-[1px]">
                {[...Array(5)].map((_, index) => {
                  return (
                    <HorizontalBar
                      color={colors[index]}
                      key={Math.random() * 1000}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  // personalised workout component

  return (
    <>
      {!timer && !fitnessScorePageLoading && fitnessScoreData ? (
        <div
          className="relative z-[140] flex  h-screen w-screen flex-col justify-between overflow-y-scroll bg-black bg-auto bg-fixed bg-center bg-no-repeat "
          style={{
            backgroundImage: `url(${'/assets/bg_report.png'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="flex h-screen w-screen flex-col items-start justify-between overflow-y-scroll bg-black/70 px-4 pb-[50px] pt-[70px]  backdrop-blur-[8.5px]">
            {/* <div className="flex flex-col items-center justify-center gap-5">
                            <div className="flex items-center justify-center w-full mx-auto my-4">
                                <BackButton
                                    size={30}
                                    action={() => {
                                        navigate('/questionnaire')
                                    }}
                                    className="absolute left-[5%] w-fit cursor-pointer"
                                />
                            </div>
                        </div> */}
            <div className="flex w-full flex-col items-start justify-start gap-9">
              {/* Name */}
              <div className="flex w-full flex-row items-center justify-start gap-3">
                {/* <motion.h1
                  className="text-[32px]"
                  animate={{
                    rotate: [0, 10, -10, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    ease: 'easeInOut',
                    times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                    repeat: Infinity,
                  }}
                >
                  👋
                </motion.h1> */}
                <h1 className="text-[32px] text-offwhite">Hi, {name}</h1>
              </div>
              {/* Fitness Score */}
              <div className="flex w-full flex-col items-start justify-center ">
                {fitnessScoreData && (
                  <ScoreIndicator score={fitnessScoreData?.fitnessScore} />
                )}
                <div className="w-full rounded-b-[12px] bg-black-opacity-65 px-4 pb-4">
                  {fitnessScoreData && (
                    <p
                      className="text-[14px] text-[#fff]"
                      style={{ fontWeight: 400 }}
                    >
                      You are already better than{' '}
                      {fitnessScoreData?.fitnessPercetile}% of the OTM community
                    </p>
                  )}
                </div>
              </div>
              {/* Personalised Workout */}
              {/* <div className="flex flex-col items-start justify-center w-full">
                <h1
                  className="text-[25.33px] text-[#7e87ef]"
                  style={{ lineHeight: '40px', marginBlock: '10px' }}
                >
                  Your personalised workout
                </h1>
                <div className="flex flex-row w-full gap-5 overflow-x-scroll hide-scrollbar">
                  {data?.workout.map((item, index) => {
                    if (item?.description) {
                      return (
                        <PersonalisedWorkout
                          heading={item?.name}
                          detail={item?.description}
                          index={index}
                          key={item?.name}
                        />
                      );
                    }
                  })}
                </div>
              </div> */}
              <p
                className="text-[20px] text-white "
                style={{
                  fontWeight: 400,
                  lineHeight: '30px',
                }}
              >
                <span className="bg-gradient-to-r from-lightPurple to-blue bg-clip-text text-transparent brightness-150">
                  {' '}
                  It’s a journey,
                </span>{' '}
                we emphasize on{' '}
                <span className="bg-gradient-to-r from-lightPurple to-blue bg-clip-text text-transparent brightness-150">
                  {' '}
                  longterm lifestyle changes
                </span>{' '}
                instead of quick fixes
              </p>
            </div>
          </div>
          <div className="fixed bottom-6 left-0 flex w-full gap-[10px] px-4">
            <button
              onClick={() => setShowFitnessInsightScreen(false)}
              className="    flex h-[54px] w-full items-center justify-center rounded-lg bg-white text-center text-black "
            >
              {' '}
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="relative z-[140] flex h-screen w-screen flex-col justify-between bg-black bg-auto bg-fixed bg-center bg-no-repeat">
          <FitnessLoader />
        </div>
      )}
    </>
  );
}

export default FitnessScorePage;
