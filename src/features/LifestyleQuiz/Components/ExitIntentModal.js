import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { getPercentAttemptedQuestions } from "../utils/utils";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export default function BasicModal({ response, open, setOpen }) {
  const handleClose = () => setOpen(false);
  const [percent, setPercent] = React.useState(0);

  React.useEffect(() => {
    const percent = getPercentAttemptedQuestions(response);
    setPercent(percent);
    console.log("percent : ", percent)
  }, [percent, response])

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50`}
    >
      <div
        className={`bg-white p-4 rounded-lg shadow-lg transition-opacity`}
        style={{ transitionDuration: '0.3s' }} // Adjust the duration to match your CSS transition duration
      >
        <div className="flex justify-end">
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="text-black text-xl">
          {percent > 0 ? "keep it up" : "please fill the form"}
        </div>
      </div>
    </div>
  );
}
