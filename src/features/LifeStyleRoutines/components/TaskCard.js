import React from 'react';

const TaskCard = ({ tasks }) => {
    return (
        <div className="mb-6">
            <div className="">
                <div className='bg-mediumGray rounded-xl'>
                    {tasks.map((task, index) => (
                        <div key={index} className="p-4 pb-1 rounded-md flex items-center space-x-2">
                            <h3 className="text-xl text-custompurple font-sfpro">{task.title}</h3>
                            <p className="text-customGray text-sm font-sfpro">{task.duration}</p>
                            {task.details && <p className="text-lightGray text-sm font-sfpro">{task.details}</p>}
                            {task.links && <p className="text-lightGray text-sm font-sfpro">{task.links}</p>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
