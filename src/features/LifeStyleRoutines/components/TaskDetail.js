import React, { useState, useEffect } from 'react'
import TaskCard from './TaskCard';
import { axiosClient } from '../apiClient';
import { useDispatch, useSelector } from 'react-redux';
import { changeMoodIcon, toggleCompletion } from '../ReduxStore/actions';

const TaskDetail = ({ SelectedCircle, task, setShowTaskDetail, taskCompleted, setTaskCompleted }) => {
    const [CurrentTask, setCurrentTask] = useState(task);
    const [selectedFeeling, setSelectedFeeling] = useState(-1);
    const [feedback, setFeedback] = useState('');

    const today = new Date(); // Create a Date object for today's date
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = today.toLocaleString('en-US', options).replace(',', '');

    const dispatch = useDispatch();
    const moodValue = useSelector(state => {
        const circle = state?.lifeStyle?.circles.find(circle => circle?.name === SelectedCircle);
        if (circle) {
            const mytask = circle?.tasks.find(mappedTask => mappedTask?.taskId === task?.taskId);
            if (mytask) {
                return task?.mood;
            }
        }
        return null; // or any default value you prefer
    });
    const isCompleted = useSelector(state => {
        const circle = state?.lifestyle?.circles.find(circle => circle?.name === SelectedCircle);
        if (circle) {
            const mytask = circle?.tasks.find(mappedTask => mappedTask.taskId === task?.taskId);
            return mytask ? task?.completed : false;
        }
        return false;
    });

    // function to POST emoji reaction
    function handleEmojiReaction() {
        axiosClient.post('/', {
            user: JSON.parse(localStorage.getItem('user'))['code'],
            date: formattedDate,
            taskId: task?.taskId,
            events: [
                {
                    type: "moodCheckIn",
                    input: selectedFeeling
                }
            ]
        })
            .then(res => {
                dispatch(changeMoodIcon(SelectedCircle, task?.taskId, selectedFeeling));
                console.log(res);
            })
            .catch(err => console.error(err))
    }

    // function to handle feedback response
    function handleFeedbackResponse() {
        if (feedback !== '') {
            axiosClient.post('/', {
                user: JSON.parse(localStorage.getItem('user'))['code'],
                date: formattedDate,
                taskId: task?.taskId,
                events: [
                    {
                        type: "feedback",
                        input: feedback
                    }
                ]
            })
                .then(res => console.log(res))
                .catch(err => console.error(err))
        }
    }

    // function for Mark as Done
    function handleMarkDone() {
        axiosClient.post('/', {
            user: JSON.parse(localStorage.getItem('user'))['code'],
            date: formattedDate,
            taskId: task?.taskId,
            events: [
                {
                    type: "isDone",
                    input: task?.completed === undefined ? true : !task?.completed
                }
            ]
        })
            .then(res => {
                setTaskCompleted(true);
                dispatch(toggleCompletion(SelectedCircle, task?.taskId));
                console.log(res);
            })
            .catch(err => console.error(err))
    }

    useEffect(() => {
        console.log("tasks : ", task)
        if (selectedFeeling !== -1) {
            handleEmojiReaction();
        }
    }, [selectedFeeling])

    useEffect(() => {
        console.log("toggled ")
    }, [isCompleted])

    return (
        <div className="h-screen overflow-y-scroll w-full fixed top-0 left-0 z-[100]  bg-black p-2">
            <div className="relative flex items-center p-4 bg-black text-white">
                {/* BackButton */}
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="18" viewBox="0 0 10 18" fill="none" onClick={() => setShowTaskDetail(false)}>
                    <path d="M0 8.70206C0 9.03638 0.127827 9.32153 0.393314 9.57719L8.06293 17.0796C8.26942 17.296 8.54474 17.4041 8.85939 17.4041C9.49853 17.4041 10 16.9125 10 16.2635C10 15.9489 9.87217 15.6637 9.65585 15.4474L2.74336 8.70206L9.65585 1.95674C9.87217 1.73058 10 1.44543 10 1.13078C10 0.491642 9.49853 0 8.85939 0C8.54474 0 8.26942 0.108161 8.06293 0.324484L0.393314 7.82694C0.127827 8.0826 0.00983284 8.36775 0 8.70206Z" fill="#7E87EF" />
                </svg>

                <div className="w-full flex flex-col justify-center items-center text-center">
                    <span className="text-lightGray font-sfpro text-sm font-medium ">    <div className="text-dark-grey font-sfpro text-sm font-medium"> {SelectedCircle}</div> </span>
                    <span className="text-custompurple font-sfpro text-lg block mt-1">8 AM</span>
                </div>

            </div>

            <div className="flex justify-between ">

                <h1 className="text-3xl leading-normal text-white font-sfpro font-medium capitalize pl-1 pt-4 ml-6">{CurrentTask.name}</h1>
                <button className="flex items-center flex-col " onClick={handleMarkDone}>
                    <div className="" />
                    <div className='pr-3'>
                        {(task?.completed || isCompleted) ? (
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


                    {!(task?.completed || isCompleted) &&
                        <div className='pr-2 pb-2'>
                            <span className="text-customGray font-sfpro text-xs font-medium">Mark as done</span>
                        </div>
                    }
                </button>
            </div>

            <div className="w-auto p-3 ">

                <div className="mb-6 ">
                    <TaskCard task={task} />
                </div>



                <div className="mb-6 ">
                    <h3 className="text-xl text-white font-sfpro mb-2 leading-8">Reflect</h3>
                    <div className='bg-mediumGray rounded-xl p-2'>
                        <p className="text-lightGray mb-2 p-2 text-sm">
                            How did you feel performing this habit today?
                            <br />
                            Any insights you’d like to note?
                        </p>
                        <textarea
                            className="w-full p-2  bg-black rounded-xl text-white font-sfpro focus:outline-none"
                            placeholder="Type your answer here..."
                            onChange={(e) => setFeedback(e.target.value)}
                        />
                        <button className="w-full p-1 leading-8 bg-custompurple text-black rounded-xl text-sm" onClick={handleFeedbackResponse}>Submit</button>
                    </div>

                </div>
                <div className="mb-6">
                    <h3 className="text-lg mb-2 pb-4 leading-8 font-sfpro">Feeling Check-In</h3>
                    <div className="flex space-x-4 items-center justify-center w-full">
                        <button
                            onClick={() => setSelectedFeeling(1)}
                            className={`transition-transform duration-200 ${(selectedFeeling === 1 || moodValue === 1) ? 'transform scale-125 bg-white/10 rounded-md' : ''
                                }`}
                        >
                            <img src={'./assets/Feeling-sad.svg'} alt="Sad" className={`w-15 h-15 ${(selectedFeeling === 1 || moodValue === 1) ? 'text-red-500' : ''}`} />
                        </button>
                        <button
                            onClick={() => setSelectedFeeling(2)}
                            className={`transition-transform duration-200 ${(selectedFeeling === 2 || moodValue === 2) ? 'transform scale-125  bg-white/10 rounded-md' : ''
                                }`}
                        >
                            <img src={'./assets/Feeling-sad2.svg'} alt="Neutral" className={`w-15 h-15 ${(selectedFeeling === 2 || moodValue === 2) ? 'text-yellow-500' : ''}`} />
                        </button>
                        <button
                            onClick={() => setSelectedFeeling(3)}
                            className={`transition-transform duration-200 ${(selectedFeeling === 3 || moodValue === 3) ? 'transform scale-125  bg-white/10 rounded-md' : ''
                                }`}
                        >
                            <img src={'./assets/Feeling-neutral.svg'} alt="Happy" className={`w-15 h-15 ${(selectedFeeling === 3 || moodValue === 3) ? 'text-yellow-400' : ''}`} />
                        </button>
                        <button
                            onClick={() => setSelectedFeeling(4)}
                            className={`transition-transform duration-200 ${(selectedFeeling === 4 || moodValue === 4) ? 'transform scale-125  bg-white/10 rounded-md' : ''
                                }`}
                        >
                            <img src={'./assets/Feeling-happy.svg'} alt="Very Happy" className={`w-15 h-15 ${(selectedFeeling === 4 || moodValue === 4) ? 'text-green-500' : ''}`} />
                        </button>
                        <button
                            onClick={() => setSelectedFeeling(5)}
                            className={`transition-transform duration-200 ${(selectedFeeling === 5 || moodValue === 5) ? 'transform scale-125  bg-white/10 rounded-md' : ''
                                }`}
                        >
                            <img src={'./assets/Feeling-happy.svg'} alt="Ecstatic" className={`w-15 h-15 ${(selectedFeeling === 5 || moodValue === 5) ? 'text-green-400' : ''}`} />
                        </button>
                    </div>
                </div>
                {!(task?.completed || isCompleted) &&
                    <div className='w-full px-3 fixed bottom-4 left-0'>
                        <button className="w-full bg-custompurple text-black rounded-xl p-2" onClick={handleMarkDone}>Mark as Done</button>
                    </div>
                }
            </div>

        </div>
    )
}

export default TaskDetail