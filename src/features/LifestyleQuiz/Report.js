import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosClient } from './apiClient';
import { Button } from '../../components';
import styled from 'styled-components';
import Loader from './Components/Loader';
import { Error } from '../../components';

function Report() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { sessionID } = useParams();

  const FeatureHeading = styled.div`
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 31.5px; /* 131.25% */
    background: var(
      --Gradient-purple,
      linear-gradient(95deg, #d6b6f0 2.94%, #848ce9 74.36%)
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  `;
  useEffect(() => {
    setLoading(true);
    console.log('session ID in the report page : ', sessionID);
    axiosClient
      .get(`/lifestyle/snapshot?session_id=${sessionID}`)
      .then((res) => setData(res.data))
      .catch((err) => {
        setError(true);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const LifestyleFitnessCard = ({ name, description, score }) => {
    const calculateColor = () => {
      if (score <= 3) {
        return '#FA5757';
      } else if (score <= 7) {
        return '#F5C563';
      } else return '#5ECC7B';
    };
    const Values = useMemo(() => {
      return {
        Fitness: ['fitness_report.svg', '#7E87EF'],
        Nutrition: ['nutrition_report.svg', '#5ECC7B'],
        Habits: ['habits_report.svg', '#F5C563'],
      };
    }, []);

    return (
      <div
        className="flex flex-col items-center justify-start gap-5 px-2 py-2"
        style={{
          borderRadius: '11.782px',
          border: '0.736px solid rgba(126, 135, 239, 0.27)',
          background: '#FFF',
          width: '265px',
          minHeight: '158px',
        }}
      >
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex flex-row items-center justify-center gap-3">
            <img
              src={`/assets/${Values[name][0]}`}
              alt={`${Values[name][0]}`}
            />
            <h3
              className="text-[17px] font-semibold capitalize"
              style={{ color: Values[name][1] }}
            >
              {name}
            </h3>
          </div>
          <div
            className="px-3 py-1"
            style={{
              backgroundColor: calculateColor(),
              borderRadius: '5.79px',
            }}
          >
            <p className="text-[28px] font-bold text-white">{score}/10</p>
          </div>
        </div>
        <p
          style={{
            color: '#1F1F1F',
            fontFamily: "'SF Pro Rounded', sans-serif",
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: '18px',
            letterSpacing: '0.28px',
          }}
        >
          {description}
        </p>
      </div>
    );
  };
  return (
    <div className="flex min-h-screen flex-col items-start justify-start overflow-y-scroll bg-[#f5f5f5] px-2 py-5 text-black">
      {loading && (
        <div className="fixed left-0 top-0 z-50 w-full bg-black">
          <Loader
            className={'h-screen w-full'}
            message={
              'Hang tight as we create a personalized snapshot based on your choices'
            }
          />
        </div>
      )}
      {error && !loading && <Error>Some Error Occured</Error>}

      <div className="flex flex-col items-start justify-start gap-9 px-2 py-6">
        <img src={'/assets/otm-logo-report.svg'} alt="otm-logo" />

        {/* Top Section */}
        <div
          className="flex flex-col items-start justify-center"
          style={{
            'font-family': 'SF Pro Rounded Regular',
          }}
        >
          <h1 className="mt-12 text-[36px] font-semibold text-[#7E87EF]">
            Hi {data && data?.name},
          </h1>
          <p className="text-[16px] font-light text-[#929292]">
            Based on your results, you have a{' '}
            <span className="font-bold text-black">lifestyle rating</span> of
          </p>
        </div>

        <div
          className="-mt-4 mb-4 px-5 py-1"
          style={{
            background: 'linear-gradient(95deg, #D6B6F0 2.94%, #848CE9 74.36%)',
            boxShadow:
              '0px 35.345px 9.573px 0px rgba(77, 19, 124, 0.00), 0px 22.827px 8.836px 0px rgba(77, 19, 124, 0.03), 0px 12.518px 7.364px 0px rgba(77, 19, 124, 0.10), 0px 5.891px 5.891px 0px rgba(77, 19, 124, 0.17), 0px 1.473px 2.945px 0px rgba(77, 19, 124, 0.20)',
            border: '0.736px solid rgba(126, 135, 239, 0.27)',
            borderRadius: '11.782px',
          }}
        >
          <p className="text-[56px] font-bold uppercase text-white">
            {data && data?.lifestyleScore}/10
          </p>
        </div>
        {/* Lifestyle Analysis */}
        <div className="flex flex-col items-start justify-center gap-4">
          <h2 className="text-[28px] font-semibold text-[#1f1f1f]">
            Lifestyle Analysis
          </h2>
          <p className="text-[12px] font-semibold text-[#929292]">
            Let's dive into your results to uncover areas where you truly shine
            and where you have a fantastic opportunity to grow!
          </p>
          <div className="flex w-full flex-col">
            {data &&
              data?.categoryResults.map((item, index) => (
                <div
                  key={index}
                  className={`${
                    index % 2 === 0 ? 'self-start' : 'self-end'
                  } p-3`}
                >
                  <LifestyleFitnessCard
                    name={item && item?.name}
                    description={item && item?.description}
                    score={item && item?.score}
                  />
                </div>
              ))}
          </div>
        </div>

        {/* Focus Area */}
        <div
          className="flex w-full flex-col items-center justify-center gap-7 p-4 text-center"
          style={{
            borderRadius: '11.782px',
            border: '0.736px solid rgba(126, 135, 239, 0.27)',
            background: '#FFF',
          }}
        >
          <div className="px-10 py-9 text-center">
            <div className="flex w-full flex-col items-center justify-center gap-1 ">
              <div className="flex w-full flex-row items-center justify-around ">
                <h2 className="text-[54px]">🚨</h2>
                <h2 className="pr-12 text-[28px] font-semibold text-[#1f1f1f]">
                  Focus Area
                </h2>
              </div>
              <p className="text-start text-[14px]">
                {data?.focusArea[0]?.description}
              </p>
            </div>
            <div className="my-6 flex w-full flex-col items-center justify-center gap-1">
              <div className="flex w-full flex-row items-center justify-around  ">
                <h2 className="text-[54px]">💡</h2>
                <h2 className="pr-6 text-[28px] font-semibold text-[#1f1f1f]">
                  Did You Know
                </h2>
              </div>
              <p className="text-start text-[14px]">
                {data?.focusArea[0]?.didYouKnow}{' '}
              </p>
            </div>
            <div className="flex w-full flex-col items-center justify-center gap-1">
              <div className="flex w-full flex-row items-center justify-around ">
                <h2 className="text-[54px]">💪🏻</h2>
                <h2 className="pr-12 text-[28px] font-semibold text-[#1f1f1f]">
                  Take Action
                </h2>
              </div>
              <p className="text-start text-[14px]">
                {data?.focusArea[0]?.takeAction}
              </p>
            </div>
          </div>
        </div>

        {/* Plan */}
        <h2 className="-mb-4 text-[28px] font-semibold text-[#1f1f1f]">
          Your Estimated Timeline
        </h2>
        <p className="text-[17px] font-medium tracking-wide text-[#6D6C6C]">
          {data?.plan}
        </p>

        {/* Plan Features */}
        <div className="flex flex-col items-center justify-start gap-4 rounded-[12px] bg-white px-2 py-3.5">
          <FeatureHeading>Your Plan Features</FeatureHeading>
          <div className="grid w-full grid-cols-4 place-items-start text-[14px]">
            <div className="flex flex-col items-center justify-center">
              <img src={'/assets/coaches.svg'} alt="coaches" />
              <p className="px-4  text-center">Team of coaches</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img src={'/assets/fitnessprogram.svg'} alt="coaches" />
              <p className="px-4  text-center">Fitness programm</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img src={'/assets/dietplan.svg'} alt="coaches" />
              <p className="px-4  text-center">Tailored diet plan</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img src={'/assets/habitbuilding.svg'} alt="coaches" />
              <p className="px-4  text-center">Habit building</p>
            </div>
          </div>
        </div>

        {/* Book a Call */}
        <div className="flex w-full flex-col items-start justify-center gap-2">
          <h2 className="text-[24px] font-semibold">
            Ready to turn these insights into action?
          </h2>
          <p className="text-[17px] font-semibold tracking-wide">
            Join our mission at
          </p>
          <img src={'/assets/otm_logo_book_call.svg'} alt="otm logo" />
          <Button
            text={'Book a Free Call'}
            type="lifestyle"
            action={() => {
              console.log('call booked');
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Report;
