import React from 'react';
import { FaCheckCircle, FaCircle } from 'react-icons/fa';

function TaskItem({ task, index }) {
    console.log(index);
    return (
        <div className="flex items-center my-2 px-5 py-4 rounded-xl bg-mediumGray">
            {/* <div className="flex items-center justify-center w-12 h-12 bg-gray-700 rounded-full text-2xl">
                {task.icon}
            </div> */}
            <div className="ml-4 flex-1">
                <h3 className="text-custompurple font-sfpro text-base font-semibold ">{task.time}</h3>
                <p className='text-white font-sfpro font-medium capitalize text-lg'>{task.name}</p>
            </div>
            <div className="text-2xl">
                {task.completed ? (
                    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="17" cy="17" r="15.5" fill="#282828" stroke="#7E87EF" stroke-width="2" />
                        <circle cx="17" cy="17" r="10.5" fill="#5ECC7B" />
                    </svg>


                ) : (
                    // <img src={'./assets/task-left.svg'} alt="" />
                    <svg width="33" height="34" viewBox="0 0 33 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle id="Ellipse 1776" cx="16.5" cy="17" r="15.5" stroke="#3D3D3D" stroke-width="2" />
                    </svg>

                )}
            </div>
        </div>
    );
}

export default TaskItem;
