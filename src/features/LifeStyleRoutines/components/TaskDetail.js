import React, { useState } from 'react'
import TaskCard from './TaskCard';
const TaskDetail = ({ SelectedCircle, tasks, index }) => {


    const [CurrentTask, setCurrentTask] = useState(tasks[0]);
    const [selectedFeeling, setSelectedFeeling] = useState(tasks[0].mood);

    return (
        <div className="h-screen w-screen  bg-black p-2">
            {/* <img src={'./assets/Feeling-sad.svg'} alt="" /> */}
            <div className="relative flex items-center p-4 bg-black text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="18" viewBox="0 0 10 18" fill="none">
                    <path d="M0 8.70206C0 9.03638 0.127827 9.32153 0.393314 9.57719L8.06293 17.0796C8.26942 17.296 8.54474 17.4041 8.85939 17.4041C9.49853 17.4041 10 16.9125 10 16.2635C10 15.9489 9.87217 15.6637 9.65585 15.4474L2.74336 8.70206L9.65585 1.95674C9.87217 1.73058 10 1.44543 10 1.13078C10 0.491642 9.49853 0 8.85939 0C8.54474 0 8.26942 0.108161 8.06293 0.324484L0.393314 7.82694C0.127827 8.0826 0.00983284 8.36775 0 8.70206Z" fill="#7E87EF" />
                </svg>

                <div className="w-full flex flex-col justify-center items-center text-center">
                    <span className="text-lightGray font-sfpro text-sm font-medium ">    <div className="text-dark-grey font-sfpro text-sm font-medium"> {SelectedCircle}</div> </span>
                    <span className="text-custompurple font-sfpro text-lg block mt-1">8 AM</span>

                </div>

            </div>

            <div className="flex justify-between ">

                <h1 className="text-2xl leading-normal text-white font-sfpro font-medium capitalize p-1 ml-6">{CurrentTask.name}</h1>
                <button className="flex items-center flex-col ">
                    <div className="" />
                    <div className='pr-3'>
                        {CurrentTask.completed ? (
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


                    <div className='pr-2 pb-2'>  <span className="text-customGray font-sfpro text-xs font-medium">Mark as done</span>
                    </div>
                </button>
            </div>

            <div className="w-auto p-6 ">

                <div className="mb-6">

                    <TaskCard tasks={tasks} />

                </div>



                <div className="mb-6">
                    <h3 className="text-xl text-white font-sfpro mb-2 leading-8">Reflect</h3>
                    <div className='bg-mediumGray rounded-xl p-2'>


                        <p className="text-lightGray mb-2 text-sm">
                            How did you feel performing this habit today?
                            <br />
                            Any insights you’d like to note?
                        </p>
                        <textarea
                            className="w-full p-2 bg-black rounded-xl text-white font-sfpro focus:outline-none"
                            placeholder="Type your answer here..."
                        />
                        <button className="w-full  leading-8 bg-custompurple text-black rounded-xl text-sm">Submit</button>

                    </div>

                </div>
                <div className="mb-6">
                    <h3 className="text-lg mb-2 pb-4 leading-8 font-sfpro">Feeling Check-In</h3>
                    <div className="flex space-x-4 items-center justify-center">
                        <button
                            onClick={() => setSelectedFeeling(1)}
                            className={`transition-transform duration-200 ${selectedFeeling === 1 ? 'transform scale-125 bg-white/75 rounded-md' : ''
                                }`}
                        >
                            <img src={'./assets/Feeling-sad.svg'} alt="Sad" className={`w-10 h-10 ${selectedFeeling === 1 ? 'text-red-500' : ''}`} />
                        </button>
                        <button
                            onClick={() => setSelectedFeeling(2)}
                            className={`transition-transform duration-200 ${selectedFeeling === 2 ? 'transform scale-125  bg-white/75 rounded-md' : ''
                                }`}
                        >
                            <img src={'./assets/Feeling-sad2.svg'} alt="Neutral" className={`w-10 h-10 ${selectedFeeling === 2 ? 'text-yellow-500' : ''}`} />
                        </button>
                        <button
                            onClick={() => setSelectedFeeling(3)}
                            className={`transition-transform duration-200 ${selectedFeeling === 3 ? 'transform scale-125  bg-white/75 rounded-md' : ''
                                }`}
                        >
                            <img src={'./assets/Feeling-neutral.svg'} alt="Happy" className={`w-10 h-10 ${selectedFeeling === 3 ? 'text-yellow-400' : ''}`} />
                        </button>
                        <button
                            onClick={() => setSelectedFeeling(4)}
                            className={`transition-transform duration-200 ${selectedFeeling === 4 ? 'transform scale-125  bg-white/75 rounded-md' : ''
                                }`}
                        >
                            <img src={'./assets/Feeling-happy.svg'} alt="Very Happy" className={`w-10 h-10 ${selectedFeeling === 4 ? 'text-green-500' : ''}`} />
                        </button>
                        <button
                            onClick={() => setSelectedFeeling(5)}
                            className={`transition-transform duration-200 ${selectedFeeling === 5 ? 'transform scale-125  bg-white/75 rounded-md' : ''
                                }`}
                        >
                            <img src={'./assets/Feeling-happy.svg'} alt="Ecstatic" className={`w-10 h-10 ${selectedFeeling === 5 ? 'text-green-400' : ''}`} />
                        </button>
                    </div>
                </div>
                <button className="w-full p-2 leading-8 bg-custompurple text-black rounded-xl">Mark as Done</button>
            </div>

        </div>
    )
}

export default TaskDetail