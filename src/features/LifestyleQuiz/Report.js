import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { axiosClient } from './apiClient';
import { Button } from '../../components';
import { 
  BookCallHeading, 
  BookCallContainer, 
  BookCallInnerText, 
  FeatureHeading, 
  LifestyleHeading, 
  Name, 
  PlanText, 
  PlanFeatureText,
  ActionText
} from "./SytledComponents"
import Loader from './Components/Loader';
import { Error } from '../../components';

function Report() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { sessionID } = useParams();


  useEffect(() => {
    setLoading(true);
    console.log("session ID in the report page : ", sessionID)
    axiosClient.get(`/lifestyle/snapshot?session_id=${sessionID}`)
      .then(res => setData(res.data))
      .catch(err => {
        setError(true);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      })
  }, [])

  const LifestyleFitnessCard = ({ name, description, score }) => {
    const calculateColor = () => {
      if (score <= 3) {
        return '#FA5757';
      }
      else if (score <= 7) {
        return '#F5C563'
      }
      else return '#5ECC7B'
    }
    const Values = useMemo(() => {
      return (
        {
          Fitness: ['fitness_report.svg', '#7E87EF'],
          Nutrition: ['nutrition_report.svg', '#5ECC7B'],
          Habits: ['habits_report.svg', '#F5C563']
        }
      )
    }, [])

    return (
      <div
        className='flex flex-col justify-start items-center gap-5 px-2 py-2'
        style={{
          borderRadius: '11.782px',
          border: '0.736px solid rgba(126, 135, 239, 0.27)',
          background: '#FFF',
          width: '265px',
          minHeight: '158px',
        }}
      >
        <div className='w-full flex flex-row justify-between items-center'>
          <div className='flex flex-row justify-center items-center gap-3'>
            <img src={`/assets/${Values[name][0]}`} alt={`${Values[name][0]}`} />
            <h3 className='capitalize text-[17px] font-semibold' style={{ color: Values[name][1] }}>{name}</h3>
          </div>
          <div className='px-3 py-1' style={{ backgroundColor: calculateColor(), borderRadius: '5.79px' }}>
            <p className='text-[28px] font-bold text-white'>{score}/10</p>
          </div>
        </div>
        <ActionText>
          {description}
        </ActionText>
      </div >
    )
  }
  return (
    <div className='bg-[#f5f5f5] min-h-screen overflow-y-scroll text-black flex flex-col justify-start items-start py-7'>

      {loading && <div className='w-full bg-black fixed top-0 left-0 z-50'><Loader className={'h-screen w-full'} message={'Hang tight as we create a personalized snapshot based on your choices'} /></div>}
      {error && !loading && <Error>Some Error Occured</Error>}

      <img src={'/assets/otm-logo-report.svg'} alt="otm-logo" className='px-2 mb-9' />

      <div className='flex flex-col justify-start items-start gap-9 mt-5 px-2 mb-10'>

        {/* Top Section */}
        <div className='flex flex-col justify-center items-start'>
          <Name>Hi {data && data?.name},</Name>
          <p className='font-light text-[16px] text-[#929292]'>Based on your results, you have a <span className='font-bold text-black'>lifestyle rating</span> of...</p>
          <div
            className='px-5 py-1 mt-3'
            style={{
              background: 'linear-gradient(95deg, #D6B6F0 2.94%, #848CE9 74.36%)',
              boxShadow: '0px 35.345px 9.573px 0px rgba(77, 19, 124, 0.00), 0px 22.827px 8.836px 0px rgba(77, 19, 124, 0.03), 0px 12.518px 7.364px 0px rgba(77, 19, 124, 0.10), 0px 5.891px 5.891px 0px rgba(77, 19, 124, 0.17), 0px 1.473px 2.945px 0px rgba(77, 19, 124, 0.20)',
              border: '0.736px solid rgba(126, 135, 239, 0.27)',
              borderRadius: '11.782px',
            }}
          >
            <p className='text-[56px] uppercase text-white font-bold'>{data && data?.lifestyleScore}/10</p>
          </div>
        </div>

        {/* Lifestyle Analysis */}
        <div className='flex flex-col justify-center items-start gap-4 mb-3'>
          <div>
            <LifestyleHeading>Lifestyle Analysis</LifestyleHeading>
            <p className='text-[#929292] text-[12px] font-semibold'>Let's dive into your results to uncover areas where you truly shine and where you have a fantastic opportunity to grow!</p>
          </div>
          <div className="w-full flex flex-col">
            {data && data?.categoryResults.map((item, index) => (
              <div
                key={index}
                className={`${index % 2 === 0 ? 'self-start' : 'self-end'
                  } p-3`}
              >
                <LifestyleFitnessCard name={item && item?.name} description={item && item?.description} score={item && item?.score} />
              </div>
            ))}
          </div>
        </div>

        {/* Focus Area */}
        <div className='w-full flex flex-col justify-center items-center gap-7 p-4 mb-4' style={{
          borderRadius: '11.782px',
          border: '0.736px solid rgba(126, 135, 239, 0.27)',
          background: '#FFF'
        }}>
          <div className='w-full flex flex-col justify-center items-center gap-1'>
            <div className='w-full flex flex-row justify-start items-center gap-2'>
              <h2 className='text-[44px]'>🚨</h2>
              <h2 className='text-[24px] font-semibold text-[#1f1f1f]'>Focus Area</h2>
            </div>
            <ActionText>{data?.focusArea[0]?.description}</ActionText>
          </div>
          <div className='w-full flex flex-col justify-center items-center gap-1'>
            <div className='w-full flex flex-row justify-start items-center gap-2'>
              <h2 className='text-[44px]'>💡</h2>
              <h2 className='text-[24px] font-semibold text-[#1f1f1f]'>Did You Know</h2>
            </div>
            <ActionText>{data?.focusArea[0]?.didYouKnow} </ActionText>
          </div>
          <div className='w-full flex flex-col justify-center items-center gap-1'>
            <div className='w-full flex flex-row justify-start items-center gap-2'>
              <h2 className='text-[44px]'>💪🏻</h2>
              <h2 className='text-[24px] font-semibold text-[#1f1f1f]'>Take Action</h2>
            </div>
            <ActionText>{data?.focusArea[0]?.takeAction}</ActionText>
          </div>
        </div>

        {/* Book a Call */}
        <div className='w-full flex flex-col justify-center items-start gap-2 mb-4'>
          <BookCallHeading>Ready to turn these insights into action?</BookCallHeading>
          <p className='text-[17px] font-semibold tracking-wide'>Join our mission at</p>
          <img src={'/assets/otm_logo_book_call.svg'} alt="otm logo" />
          <Button text={"Book a Free Call"} type="lifestyle" action={() => {
            console.log("call booked");
          }} />
        </div>


        {/* Plan */}
        <PlanText>
          {data?.plan}
        </PlanText>

        {/* Plan Features */}
        <div className='flex flex-col justify-start items-center gap-4 bg-white rounded-[12px] px-2 py-4 mb-4'>
          <FeatureHeading>Your Plan Features</FeatureHeading>
          <div className='w-full grid grid-cols-4 place-items-start'>
            <div className='flex flex-col justify-center items-center gap-2'>
              <img src={'/assets/coaches.svg'} alt="coaches" />
              <PlanFeatureText>Personal Team of Coaches</PlanFeatureText>
            </div>
            <div className='flex flex-col justify-center items-center gap-2'>
              <img src={'/assets/fitnessprogram.svg'} alt="coaches" />
              <PlanFeatureText>Fitness Programm</PlanFeatureText>
            </div>
            <div className='flex flex-col justify-center items-center gap-2'>
              <img src={'/assets/dietplan.svg'} alt="coaches" />
              <PlanFeatureText>Tailored Diet Plan</PlanFeatureText>
            </div>
            <div className='flex flex-col justify-center items-center gap-2'>
              <img src={'/assets/habitbuilding.svg'} alt="coaches" />
              <PlanFeatureText>Habit Building</PlanFeatureText>
            </div>
          </div>
        </div>
      </div>

      {/* Book A Call */}
      <BookCallContainer className='flex flex-col justify-center items-center gap-2 p-[22px] mb-12'>
        <BookCallInnerText>Book a call with us to start your journey to glory.</BookCallInnerText>
        <div className='w-full bg-[#1f1f1f] h-[49px] rounded-[12px] flex flex-row justify-center items-center'>
          <p className='text-white text-[18px] font-semibold'>Book Now!</p>
        </div>
      </BookCallContainer>
    </div >
  )
}

export default Report