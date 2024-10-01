import React from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const TaskCard = ({ task, index }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="rounded-xl bg-mediumGray p-4">
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
            {task?.supplements && (
              <p className="mt-2 flex flex-col font-sfpro text-[14px] capitalize text-lightGray">
                {task.supplements.map((item) => (
                  <li>{item}</li>
                ))}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskCard;
