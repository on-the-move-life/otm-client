import React, { useState } from 'react';

const TaskCard = ({ task, index }) => {
    return (
        <div>
            <div className='bg-mediumGray rounded-xl p-4'>

                {task?.details.map((task, index) => (
                    <div key={index} className="pb-2 rounded-md">
                        <div className='flex items-center space-x-2'>
                            <h3 className="text-[20px] text-custompurple font-sfpro capitalize">{task.name}</h3>
                            <p className="text-customGray text-[14px] font-sfpro italic capitalize">{task?.duration}</p>
                        </div>
                        <p className="text-lightGray text-[14px] capitalize font-sfpro">{task.description}</p>
                        {/* <p className="text-lightGray text-sm font-sfpro">Links to resource</p> */}
                    </div>

                ))}
            </div>
        </div>


    );
};

export default TaskCard;
