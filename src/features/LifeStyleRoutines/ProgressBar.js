import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ value }) => {
  return (
    <div className="relative w-full h-8 bg-gray-300 rounded-full overflow-hidden">
      <motion.div
        className="h-full "
        style={{
          background: 'linear-gradient(100deg, #FA5757 0%, #F5C563 24%, #7E87EF 52%)',
        }}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.5 }}
      />
      <div
        className="absolute top-0 right-0 flex items-center justify-center h-full"
        style={{ left: `${value}%`, transform: 'translateX(-50%)' }}
      >
        <span className="text-lg font-semibold">{value}</span>
        <div className="w-6 h-6 ml-2 bg-gray-400 rounded-full" />
      </div>
    </div>
  );
};

export default ProgressBar;