import React from 'react';
import { FaCheckCircle, FaCircle } from 'react-icons/fa';

function TaskItem({ task }) {
    return (
        <div className="flex items-center my-2 px-5 py-4 rounded-xl bg-mediumGray">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-700 rounded-full text-2xl">
                {task.icon}
            </div>
            <div className="ml-4 flex-1">
                <h3 className="text-custompurple font-sfpro text-xs font-semibold ">{task.time}</h3>
                <p className='text-white font-sfpro font-medium capitalize text-lg'>{task.title}</p>
            </div>
            <div className="text-2xl">
                {task.completed ? (
                    <img src="/assets/task-done-marker.svg" alt="" />
                ) : (
                    <img src="/assets/task-left-marker.svg" alt="" />
                )}
            </div>
        </div>
    );
}

export default TaskItem;
