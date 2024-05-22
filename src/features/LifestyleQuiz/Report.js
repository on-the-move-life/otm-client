import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosClient } from './apiClient';
import {
  BookCallHeading,
  BookCallContainer,
  BookCallInnerText,
  FeatureHeading,
  LifestyleHeading,
  Name,
  PlanText,
  PlanFeatureText,
  ActionText,
} from './SytledComponents';
import Loader from './Components/Loader';
import { Error } from '../../components';

function Report() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { sessionID } = useParams();

  useEffect(() => {
    setLoading(true);
    console.log('session ID in the report page : ', sessionID);
    axiosClient
      .get(`/lifestyle/snapshot?session_id=${sessionID}`)
      .then((res) => {
        console.log('respnose : ', res);
        if (res?.data?.error) {
          return Promise.reject(new Error('invalid session id'));
        } else {
          setData(res?.data);
        }
      })
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
        <ActionText>{description}</ActionText>
      </div>
    );
  };
  return (
    <div className="flex min-h-screen flex-col items-start justify-start overflow-y-scroll bg-[#f5f5f5] py-7 text-black">
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
      {error && !loading && (
        <Error showButton={false}>Some Error Occured</Error>
      )}
      <div className="flex flex-col items-start justify-start gap-9 px-4 py-6">
        <img src={'/assets/otm-logo-report.svg'} alt="otm-logo" />

        {/* ////// */}
        <div className="mt-5 flex flex-col items-start justify-start gap-9">
          {/* Top Section */}
          <div className="flex flex-col items-start justify-center">
            <Name>Hi {data && data?.name},</Name>
            <p className="text-[16px] font-light text-[#929292]">
              Based on your results, you have a{' '}
              <span className="font-bold text-black">lifestyle rating</span> of
            </p>
            <div
              className="mt-3 px-5 py-1"
              style={{
                background:
                  'linear-gradient(95deg, #D6B6F0 2.94%, #848CE9 74.36%)',
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
          </div>
          {/* Lifestyle Analysis */}
          <div className="mb-2 flex flex-col items-start justify-center gap-4">
            <div>
              <LifestyleHeading>Lifestyle Analysis</LifestyleHeading>
              <p className="text-[12px] font-semibold text-[#929292]">
                Let's dive into your results to uncover areas where you truly
                shine and where you have a fantastic opportunity to grow!
              </p>
            </div>
            <div className="flex w-full flex-col">
              {data &&
                data?.categoryResults.map((item, index) => (
                  <div
                    key={index}
                    className={`${
                      index % 2 === 0 ? 'self-start' : 'self-end'
                    } py-2`}
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
                  <h2 className="pr-4 text-[28px] font-semibold text-[#1f1f1f]">
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
                  <h2 className=" text-[28px] font-semibold text-[#1f1f1f]">
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
                  <h2 className="pr-4 text-[28px] font-semibold text-[#1f1f1f]">
                    Take Action
                  </h2>
                </div>
                <p className="text-start text-[14px]">
                  {data?.focusArea[0]?.takeAction}
                </p>
              </div>
            </div>
          </div>

          {/* Book a Call */}
          <div className="mb-4 flex w-full flex-col items-start justify-center gap-2">
            <BookCallHeading>
              Ready to turn these insights into action?
            </BookCallHeading>
            <p className="mt-4 text-[17px] tracking-wide">
              Join our mission at
            </p>
            <img src={'/assets/otm_logo_book_call.svg'} alt="otm logo" />

            <button
              onClick={() => {
                window.open(
                  'https://calendly.com/pranavyadav996/30min',
                  '_blank',
                );
              }}
              className={`lifestyle-gradient-button mt-4 h-[48px] w-full rounded-xl border-[rgba(209,209,209,0.70)] font-semibold uppercase text-white`}
            >
              Book a Free Call
            </button>
          </div>
          {/* //////// */}
          {/* Plan */}
          <h2 className="-mb-4 text-[28px] font-semibold text-[#1f1f1f]">
            Your Estimated Timeline
          </h2>
          {/* <p className="text-[17px] font-medium tracking-wide text-[#6D6C6C]"> */}
          <PlanText>{data?.plan}</PlanText>

          {/* Plan Features */}
          <div className="flex flex-col items-center justify-start gap-4 rounded-[12px] bg-white px-2 py-3.5">
            <FeatureHeading>Your Plan Features</FeatureHeading>
            <div className="grid w-full grid-cols-4 place-items-start text-[14px]">
              <div className="flex flex-col items-center justify-center gap-1">
                <img src={'/assets/coaches.svg'} alt="coaches" />
                <PlanFeatureText>Team of coaches</PlanFeatureText>
              </div>
              <div className="flex flex-col items-center justify-center gap-1">
                <img src={'/assets/fitnessprogram.svg'} alt="coaches" />
                <PlanFeatureText>Fitness program</PlanFeatureText>
              </div>
              <div className="flex flex-col items-center justify-center gap-1">
                <img src={'/assets/dietplan.svg'} alt="coaches" />
                <PlanFeatureText>Tailored diet plan</PlanFeatureText>
              </div>
              <div className="flex flex-col items-center justify-center gap-1">
                <img src={'/assets/habitbuilding.svg'} alt="coaches" />
                <PlanFeatureText>Habit building</PlanFeatureText>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Book A Call */}
      <BookCallContainer className="mb-12 flex flex-col items-center justify-center gap-2 p-[22px]">
        <BookCallInnerText>
          Book a call with us to start your journey to glory
        </BookCallInnerText>
        <div
          className="flex h-[49px] w-full flex-row items-center justify-center rounded-[12px] bg-[#1f1f1f]"
          onClick={() => {
            window.open('https://calendly.com/pranavyadav996/30min', '_blank');
          }}
        >
          <p className="text-[18px] font-semibold text-white">Book Now!</p>
        </div>
      </BookCallContainer>
    </div>
  );
}

export default Report;
