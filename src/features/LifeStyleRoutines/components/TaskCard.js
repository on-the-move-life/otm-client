import React, { useState } from 'react';

const TaskCard = ({ tasks, index }) => {
    console.log(tasks);

    const [CurrentTask, setCurrentTask] = useState(tasks[0]);
    const [CurrentTaskDetails, setCurrentTaskDetails] = useState(CurrentTask.details);

    console.log(CurrentTaskDetails[0].name);
    console.log(CurrentTaskDetails[0].duration);
    console.log(CurrentTaskDetails[0].description);

    return (
        <div>
            <div className='bg-mediumGray rounded-xl'>

                {CurrentTaskDetails.map((task, index) => (
                    <div key={index} className="p-4 rounded-md">
                        <div className='flex items-center space-x-2'>
                            <h3 className="text-xl text-custompurple font-sfpro">{task.name}</h3>
                            <p className="text-customGray text-sm font-sfpro">{task.duration}</p>
                        </div>
                        <p className="text-lightGray text-sm font-sfpro">{task.description}</p>
                        <p className="text-lightGray text-sm font-sfpro">Links to resource</p>
                    </div>

                ))}
            </div>

            {/* <div className="">
                <div className='bg-mediumGray rounded-xl'>

                    <div className="p-4 rounded-md ">
                        <div className='flex items-center space-x-2'>
                            <h3 className="text-xl text-custompurple font-sfpro">{CurrentTaskDetails[0].name}</h3>
                            <p className="text-customGray text-sm font-sfpro">{CurrentTaskDetails[0].duration}</p>
                        </div>
                        <p className="text-lightGray text-sm font-sfpro">{CurrentTaskDetails[0].description}</p>
                        <p className="text-lightGray text-sm font-sfpro">Links to resource</p>
                    </div>

                </div>
            </div> */}

        </div>


    );
};

export default TaskCard;
