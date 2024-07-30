import React from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const TaskCard = ({ task, index }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="p-4 rounded-xl bg-mediumGray">
        {task?.details.map((task, index) => (
          <div key={index} className="rounded-md ">
            <div className="flex items-center space-x-2">
              <h3 className="font-sfpro text-[20px] capitalize text-custompurple">
                {task.name}
              </h3>
              <p className="font-sfpro text-[14px] capitalize italic text-customGray">
                {task?.duration}
              </p>
            </div>
            <p className="font-sfpro text-[14px] capitalize text-lightGray">
              {task.description}
            </p>
            <button
              className="flex items-center justify-center w-full gap-1 p-1 mt-2 text-sm leading-8 text-black rounded-xl bg-custompurple"
              onClick={() => navigate('/home')}
            >
              Tap to view yout routine <FaArrowRight />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskCard;
