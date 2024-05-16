import React from 'react';
import Counter from '../../components/Counter';
import { HiOutlineChevronDoubleRight } from 'react-icons/hi';
import AnimatedComponent from '../../components/AnimatedComponent';
import styled from 'styled-components';

const MovecoinHeading = styled.div`
color: var(--Light-purple, #D6B6F0);
text-shadow: 0px 3.9px 3.9px rgba(0, 0, 0, 0.15);
font-family: -apple-system, BlinkMacSystemFont, sans-serif;
font-size: 25px;
font-style: normal;
font-weight: 500;
line-height: 41.6px; /* 160% */
text-transform: capitalize;
`
const Description = styled.p`
color: var(--New-White, rgba(255, 255, 255, 0.86));

/* Body condensed bold */
font-family: -apple-system, BlinkMacSystemFont, sans-serif;
font-size: 20px;
font-style: normal;
font-weight: 500;
line-height: normal;
`
const Instruction = styled.p`
color: rgba(255, 255, 255, 0.86);
text-align: center;
font-family: -apple-system, BlinkMacSystemFont, sans-serif;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: normal;
`
const GradientText = styled.span`
/* Small shadow */
text-shadow: 0px 3px 3px rgba(0, 0, 0, 0.15);

/* H1 */
font-family: -apple-system, BlinkMacSystemFont, sans-serif;
font-style: normal;
font-weight: 500;
background: var(--Gradient-purple, linear-gradient(95deg, #D6B6F0 2.94%, #7E87EF 96.92%));
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
`

const AchievementPage = ({ setShowAchievemntsPage, totalWorkouts, coinsEarned }) => {

  return (
    <AnimatedComponent>
      <div className="hero bg-no-repeat">
        <div
          onClick={() => setShowAchievemntsPage(false)}
          className="relative flex h-full flex-col items-center justify-around"
        >
          {/* heading */}
          <div className="">
            <img src="/assets/congratulations.svg" alt="" />

            <h3 className="-mt-4 text-center text-xs text-yellow">
              You completed another workout today
            </h3>
          </div>

          {/* total workout */}
          <div className=" text-center text-lightGray">
            <h4 className="text-[10px] uppercase  tracking-[3px]">
              total workouts
            </h4>
            <Counter currentValue={totalWorkouts} />
          </div>

          {/* achievements */}
          {/* <h3 className="text-md text-lightGray">Achievements Unlocked</h3> */}
          <div className='w-full h-fit flex flex-col justify-center items-start gap-5'>

            <div
              className='w-full min-h-[100px] flex flex-row justify-center items-center rounded-[20px] bg-[#121212]'
            >
              <div
                className='w-full h-full bg-contain backdrop-blur-[1px] p-5  rounded-[20px] border-[0.5px] border-[#383838] bg-right bg-no-repeat bg-25%'
                style={{ backgroundImage: `url('/assets/coins_popup_bg.svg')` }}
              >
                <Description className='flex flex-row gap-1'><span className='text-[#D6B6F0]'>•Movecoins</span> <br></br> </Description>
                <div >
                  <Description className='text-lightGray '>You earned  <span className=' font-extrabold px-2 rounded-sm'>   {coinsEarned}</span> MoveCoins! </Description>

                </div>


                <Description> < p className='break-words font-normal text-slate-400 leading-normal '> Redeem your coins on your next purchase and<GradientText> SAVE</GradientText></p> </Description>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <span className="mx-2">Continue</span> <HiOutlineChevronDoubleRight />
          </div>
          <div></div>
        </div>
      </div>
    </AnimatedComponent >
  );
};

export default AchievementPage;



//comment