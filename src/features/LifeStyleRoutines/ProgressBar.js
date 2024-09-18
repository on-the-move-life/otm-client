import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ progress }) => {
  let gradient;

  if (progress <= 50) {
    gradient = 'linear-gradient(90deg, #FA5757 0%, #F5C563 100%)';
  } else if (progress <= 80) {
    gradient = 'linear-gradient(90deg, #FA5757 0%, #F5C563 50%, #7E87EF 100%)';
  } else {
    gradient =
      'linear-gradient(90deg, #FA5757 0%, #F5C563 50%, #7E87EF 80%, #5ECC7B 100%)';
  }

  return (
    <div className="flex pt-4">
      <div
        className={`gradient-percentage t-b flex items-end font-anton text-[60px] font-medium leading-[53px]`}
      >
        {progress}
        <span className="h-11 font-anton text-[32px] font-bold">%</span>
      </div>

      <div className="ml-2 flex w-full flex-col justify-end">
        <div className="h-3 w-full overflow-hidden rounded-full bg-gray">
          <motion.div
            className="relative h-full rounded-full p-1"
            style={{ background: gradient, width: `${progress}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1 }}
          >
            <div className="absolute right-1 flex ">
              <span className="  -mt-[5px] mr-1 text-[10px] text-black-opacity-45 ">
                {progress}
              </span>
              <span className="  -mt-[2px] h-2 w-2  rounded-full bg-white"></span>
            </div>
          </motion.div>

          <span className="font-bold text-white">{progress}%</span>
          <div className="border-gray-400 ml-2 h-6 w-6 rounded-full border-2 bg-white"></div>
        </div>
        <div className="font-body-condensed-bold font-sfpro text-[14px] text-lightGray">
          perfect day complete
        </div>
      </div>
    </div>
  );
};
export default ProgressBar;
