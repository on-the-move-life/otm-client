import styled from 'styled-components';
import { RiRunFill } from 'react-icons/ri';
import { RxCross2 } from 'react-icons/rx';

const StepTracker = () => {
  return (
    <div>
      <div className=" to-blue-500  rounded-full bg-gradient-to-r from-[#f45c43] to-[#eb3349] px-4 py-2">
        <div className="flex  items-center justify-between ">
          <div className="flex grow items-center gap-2">
            <RiRunFill className="" />
            <div className="error__title">Log your daily step count</div>
          </div>
          <RxCross2 />
        </div>
      </div>
      <div>
        <input type="number" />
      </div>
    </div>
  );
};

export default StepTracker;
