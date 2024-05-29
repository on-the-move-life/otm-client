import React, { useState } from 'react';

const TaskCard = ({ tasks, index }) => {
    console.log(tasks);

    const [CurrentTask, setCurrentTask] = useState(tasks[0]);
    const [CurrentTaskDetails, setCurrentTaskDetails] = useState(CurrentTask.details);
    const [selectedFeeling, setSelectedFeeling] = useState(CurrentTask.mood);
    // console.log(SelectedCircle, tasks);
    console.log(CurrentTaskDetails[0].name);
    console.log(CurrentTaskDetails[0].duration);
    console.log(CurrentTaskDetails[0].description);

    return (



        <div className="">
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
        </div>


    );
};

export default TaskCard;
