import React from 'react';
import { motion } from 'framer-motion';
import { HiX } from 'react-icons/hi';

const WeightChoosingGuide = ({ closeWeightGuide }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-[#141414] overflow-y-auto"
    >
      <div className="min-h-screen flex flex-col bg-[#1C1C1E]">
        <div className="flex items-center justify-between p-4 border-b border-[#383838]">
          <h2 className="text-xl font-semibold text-white">Weight Choosing Guide</h2>
          <button onClick={closeWeightGuide} className="text-gray-400 hover:text-white">
            <HiX size={24} />
          </button>
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          {/* Add your weight choosing guide content here */}
          <p className="text-white">This is where you can add your weight choosing guide content.</p>
        </div>
        <div className="p-4 border-t border-[#383838]">
          <button
            onClick={closeWeightGuide}
            className="w-full py-2 px-4 bg-green text-black font-semibold rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default WeightChoosingGuide;