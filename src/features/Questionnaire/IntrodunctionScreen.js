import React from 'react';
import { StarterText } from './utils';

const IntrodunctionScreen = () => {
  return (
    <div>
      <div className="w-full">
        <div className="w-full px-[20px] pb-[20px] text-center text-offwhite">
          You Get
        </div>

        <div className="flex flex-col items-center px-5">
          <div className="flex w-[280px] ">
            <img
              src={'./assets/GreenTick.svg'}
              alt="correct"
              className="mr-6 "
            />
            <StarterText className=" py-[10px]" fontSize="14px">
              <span className="text-offwhite">Rishi Solanki</span> to guide you
              every step of the way
            </StarterText>
          </div>

          {/* <div className="flex w-[280px] ">
        <img
          src={'./assets/GreenTick.svg'}
          alt="correct"
          className="mr-6"
        />
        <StarterText
          className=" py-[10px]"
          fontSize="14px"
        >
          Your{' '}
          <span className="text-offwhite">
            weekly workout schedule
          </span>{' '}
          to meet your goals
        </StarterText>
      </div> */}

          <div className="flex w-[280px] ">
            <img
              src={'./assets/GreenTick.svg'}
              alt="correct"
              className="mr-6"
            />
            <StarterText className=" py-[10px]" fontSize="14px">
              <span className="text-offwhite">Elite workout programs</span>{' '}
              designed for maximum results
            </StarterText>
          </div>
          <div className="flex w-[280px] ">
            <img
              src={'./assets/GreenTick.svg'}
              alt="correct"
              className="mr-6"
            />
            <StarterText className=" py-[10px]" fontSize="14px">
              <span className="text-offwhite">
                A personalised lifestyle design that works
              </span>{' '}
            </StarterText>
          </div>

          <div className="flex w-[280px] ">
            <img
              src={'./assets/GreenTick.svg'}
              alt="correct"
              className="mr-6"
            />
            <StarterText className=" py-[10px]" fontSize="14px">
              <span className="text-offwhite">An accountability coach</span> to
              fool proof your success
            </StarterText>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntrodunctionScreen;
