import { motion } from 'framer-motion';
import React from 'react';

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
      <div className=" flex w-full flex-col justify-end">
        <div className="h-3 w-full overflow-hidden rounded-full bg-gray">
          <motion.div
            className="relative h-full rounded-full p-1"
            style={{ background: gradient, width: `${progress}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1 }}
          >
            <div className="absolute right-1 flex ">
              <span className="  -mt-[2px] h-2 w-2  rounded-full bg-white"></span>
            </div>
          </motion.div>

          <span className="font-bold text-white">{progress}%</span>
          <div className="border-gray-400 ml-2 h-6 w-6 rounded-full border-2 bg-white"></div>
        </div>
      </div>
    </div>
  );
};
export default ProgressBar;
