import React from 'react'
import styled from 'styled-components';
import { motion } from 'framer-motion';


// const ProgressBarContainer = styled.div`
//   width: 100%;
//   height: 30px;
//   overflow: hidden;
// `;

// const Progress = styled(motion.div)`
//   height: 100%;
//   background: linear-gradient(0deg, #FA5757 0%, #F5C563 13%, #7E87EF 31%, #5ECC7B 57.5%);
// `;

function ProgressBar() {
  return (
    <div className="w-full h-6 bg-gray-300 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-gradient-to-r from-[#FA5757] via-[#F5C563] via-[#7E87EF] to-[#5ECC7B]"
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
  )
}

export default ProgressBar