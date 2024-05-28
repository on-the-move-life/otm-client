import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ progress }) => {
  let gradient;

  if (progress <= 50) {
    gradient = 'linear-gradient(90deg, #FA5757 0%, #F5C563 100%)';
  } else if (progress <= 80) {
    gradient = 'linear-gradient(90deg, #FA5757 0%, #F5C563 50%, #7E87EF 100%)';
  } else {
    gradient = 'linear-gradient(90deg, #FA5757 0%, #F5C563 50%, #7E87EF 80%, #5ECC7B 100%)';
  }


  return (
    <div className="w-full">

      <div className="text-blue font-sfpro text-[14px] font-body-condensed-bold">
        You completed {progress}% of your perfect day
      </div>
      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: gradient, width: `${progress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1 }}
        >

          {/* <motion.div
            className="absolute top-0 right-0 h-full w-6 bg-white rounded-full shadow"
            initial={{ x: '-100%' }}
            animate={{ x: `-${100 - progress}%` }}
            transition={{ duration: 0.5 }}
          >
            <span className="absolute inset-0 flex items-center justify-center text-gray-800 font-bold">{progress}</span>
          </motion.div> */}
        </motion.div>

      </div>
    </div>

  );
};
export default ProgressBar;