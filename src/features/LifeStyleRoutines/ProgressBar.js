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
    <div className="pt-4">
      <div
        className={`gradient-percentage font-anton t-b text-[60px] font-medium leading-[54px]`}
      >
        {progress}
        <span className="font-anton text-[32px] font-bold">%</span>
      </div>
      <div className="font-body-condensed-bold relative bottom-2 z-10 mx-1 mb-2 font-sfpro text-[14px] text-lightGray">
        perfect day complete
      </div>
      <div className="bg-gray h-4 w-full overflow-hidden rounded-full">
        <motion.div
          className="relative h-full rounded-full p-1"
          style={{ background: gradient, width: `${progress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1 }}
        >
          <div className="absolute right-1 flex ">
            {/* <span>23</span> */}
            <span className="  h-2 w-2 rounded-full bg-white"></span>
          </div>
        </motion.div>
        <span className="font-bold text-white">{progress}%</span>
        <div className="ml-2 h-6 w-6 rounded-full border-2 border-gray-400 bg-white"></div>
      </div>
    </div>
  );
};
export default ProgressBar;
