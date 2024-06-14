import React, { useState, useEffect } from 'react';
import BarChart from './Components/BarChart';
import RadarChart from './Components/RadarChart';
import Overview from './Components/Overview';
import { getCurrentMonthYear } from './utils';
import Stories, { WithHeader, WithSeeMore } from 'react-insta-stories';

function MainPage() {
  const todayDate = getCurrentMonthYear();
  function closePage() {
    // implementation
  }

  const stories = [
    {
      content: ({ action, isPaused }) => {
        return (
          <div className='w-full h-[100%] flex flex-col justify-start items-center gap-[100px] bg-transparent mt-[50px] px-2'>
            <h2 className='text-[23px] text-white/80' style={{ lineHeight: '49.87px', letterSpacing: '0.46px', fontWeight: 600 }}>Ayushi</h2>
            <div className="h-[200px] w-[350px] relative bottom-[100px]">
              <img src="/assets/star_fire_streak.png" alt="star" />
            </div>
            <div className='w-full flex flex-col justify-center items-center gap-3'>
              <h1 className='text-[47px] text-white/80' style={{ textAlign: 'center', fontWeight: 600, lineHeight: '49.87px', letterSpacing: '0.935px' }}>Monthly Wrapped</h1>
              <p style={{
                color: 'rgba(255, 255, 255, 0.23)',
                textAlign: 'center',
                fontSize: '23.225px',
                fontWeight: 600,
                letterSpacing: '0.464px'
              }}>
                Insights into the reflection of your months
              </p>
            </div>
          </div>
        );
      }
    },
    {
      content: ({ action, isPaused }) => {
        return (
          <div className='w-full h-[100%] flex flex-col justify-start items-center gap-5 bg-transparent mt-[50px] px-4'>
            <h2 className='text-[23px] text-white/80' style={{ lineHeight: '49.87px', letterSpacing: '0.46px', fontWeight: 600 }}>Ayushi</h2>
            <div className='w-full flex flex-row justify-between items-center'>
              <div className='w-fit flex flex-col justify-center items-start'>
                <h4 style={{letterSpacing: '0.288px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.33)', fontSize: '14.385px'}}>Rank</h4>
                <p style={{letterSpacing: '0.579px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.80)', fontSize: '28.952px', lineHeight: '30.888px'}}>1</p>
              </div>
              <div className='w-fit flex flex-col justify-center items-start'>
                <h4 style={{letterSpacing: '0.288px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.33)', fontSize: '14.385px'}}>Workouts</h4>
                <p style={{letterSpacing: '0.579px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.80)', fontSize: '28.952px', lineHeight: '30.888px'}}>19</p>
              </div>
              <div className='w-fit flex flex-col justify-center items-start'>
                <h4 style={{letterSpacing: '0.288px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.33)', fontSize: '14.385px'}}>Perfect Weeks</h4>
                <p style={{letterSpacing: '0.579px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.80)', fontSize: '28.952px', lineHeight: '30.888px'}}>4/5</p>
              </div>
            </div>
            <BarChart/>
          </div>
        );
      }
    },
    {
      content: ({ action, isPaused }) => {
        return (
          <div className='w-full h-[100%] flex flex-col justify-start items-center gap-5 bg-transparent mt-[50px] px-4'>
            <h2 className='text-[23px] text-white/80' style={{ lineHeight: '49.87px', letterSpacing: '0.46px', fontWeight: 600 }}>Ayushi</h2>
            <div className="flex flex-col justify-center items-center gap-1">
              <h4 style={{letterSpacing: '0.288px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.33)', fontSize: '14.385px'}}>Fitness Score</h4>
              <div className="flex flex-row justify-center items-end">
                <h4 style={{color: 'rgba(255, 255, 255, 0.80)', fontSize: '28.952px', fontWeight: 600, lineHeight: '30.888px', letterSpacing: '0.579px'}}>5.6</h4>
                <p className="text-[#5ECC7B]" style={{fontSize: '15.263px', fontWeight: 600, lineHeight: '16.283px', letterSpacing: ' 0.305px'}}>+1.2</p>
              </div>
            </div>
            <RadarChart />
          </div>
        );
      }
    },
    {
      content: ({ action, isPaused }) => {
        return (
          <div className='w-full h-[100%] flex flex-col justify-start items-center gap-5 bg-transparent mt-[50px] px-4'>
            <h2 className='text-[23px] text-white/80' style={{ lineHeight: '49.87px', letterSpacing: '0.46px', fontWeight: 600 }}>Ayushi</h2>
            <div className="flex flex-col justify-center items-center gap-1">
              <h4 style={{letterSpacing: '0.288px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.33)', fontSize: '14.385px'}}>Weight Lifted</h4>
              <h4 style={{color: 'rgba(255, 255, 255, 0.80)', fontSize: '28.952px', fontWeight: 600, lineHeight: '30.888px', letterSpacing: '0.579px'}}>157 Kg</h4>
            </div>
            <Overview />
          </div>
        );
      }
    },
  ];

  return (
    <div className='w-full min-h-screen bg-center bg-no-repeat bg-cover overflow-y-screen' style={{ backgroundImage: `url(${'/assets/monthly_wrapped_bg.svg'})` }}>
      <div className='w-full min-h-screen flex flex-col justify-start items-center gap-3 bg-black/40 backdrop-blur-sm py-5 overflow-y-scroll'>
        <div className='relative w-full flex flex-col justify-center items-center gap-[1px]'>
          <p className='text-[#929292] text-[9.3px] '>Monthly Wrapped</p>
          <p className='text-[#7E87EF] text-[14px]'>{todayDate}</p>
          <img src="/assets/close_icon.svg" alt="star" height={37} width={37} className="absolute right-0" onClick={closePage} />
        </div>
        <div className='w-full h-full flex-1 bg-transparent'>
          <Stories
            loop={false}
            keyboardNavigation
            defaultInterval={3000}
            stories={stories}
            width={'100vw'}
            height={'100%'}
            storyContainerStyles={{ background: 'transparent' }}
          />
        </div>
      </div>
    </div>
  );
}

export default MainPage;