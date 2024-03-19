import React from 'react';
import Counter from '../../components/Counter';
import { HiOutlineChevronDoubleRight } from 'react-icons/hi';
import AnimatedComponent from '../../components/AnimatedComponent';
import styled from 'styled-components';

const MovecoinHeading = styled.div`
color: var(--Light-purple, #D6B6F0);
text-shadow: 0px 3.9px 3.9px rgba(0, 0, 0, 0.15);
font-family: -apple-system, BlinkMacSystemFont, sans-serif;
font-size: 26px;
font-style: normal;
font-weight: 500;
line-height: 41.6px; /* 160% */
text-transform: capitalize;
`
const Description = styled.p`
color: var(--New-White, rgba(255, 255, 255, 0.56));

/* Body condensed bold */
font-family: -apple-system, BlinkMacSystemFont, sans-serif;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: normal;
`
const Instruction = styled.p`
color: rgba(255, 255, 255, 0.56);
text-align: center;
font-family: -apple-system, BlinkMacSystemFont, sans-serif;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: normal;
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
            <div className='w-full flex flex-row justify-start items-center gap-5'>
              <img src={'/assets/movecoin.svg'} alt="movecoin" className='w-[50px] h-[50px]' />
              <MovecoinHeading>Movecoins Earned</MovecoinHeading>
            </div>
            <div
              className='w-full min-h-[100px] flex flex-row justify-center items-center bg-center rounded-[20px]'
              style={{ backgroundImage: `url('/assets/coins_popup_bg.svg')`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
            >
              <div className='w-full h-full bg-black/40 backdrop-blur-[1px] p-5 flex flex-col justify-center items-center rounded-[20px] border-[0.5px] border-white'>
                <Description className='flex flex-row gap-1'>You earned <span className='flex flex-row gap-1 bg-gradient-to-tr from-[#D6B6F0] to-[#7E87EF] text-black font-extrabold px-2 rounded-sm'><img src={"/assets/otm-logo.svg"} alt="logo" />{coinsEarned}</span> Movecoins!</Description>
                <Instruction>Redeem your coins on your next purchase and save</Instruction>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <span className="mx-2">Continue</span> <HiOutlineChevronDoubleRight />
          </div>
          <div></div>
        </div>
      </div>
    </AnimatedComponent>
  );
};

export default AchievementPage;
