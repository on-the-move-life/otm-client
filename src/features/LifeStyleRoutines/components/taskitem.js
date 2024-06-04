import React, { useState } from 'react';
import TaskDetail from './TaskDetail';
import { axiosClient } from '../apiClient';
import { useDispatch, useSelector } from 'react-redux';
import { changeMoodIcon, toggleCompletion } from '../ReduxStore/actions';

function TaskItem({ task, index, onClick, SelectedCircle }) {
    const [showTaskDetail, setShowTaskDetail] = useState(false);
    const [taskCompleted, setTaskCompleted] = useState(false);
    const today = new Date(); // Create a Date object for today's date
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = today.toLocaleString('en-US', options).replace(',', '');
    const dispatch = useDispatch();
    const isCompleted = useSelector(state => {
        const circle = state?.lifestyle?.circles.find(circle => circle?.name === SelectedCircle);
        if (circle) {
            const mytask = circle?.tasks.find(mappedTask => mappedTask.taskId === task?.taskId);
            return mytask ? task?.completed : false;
        }
        return false;
    });

    // function for Mark as Done
    function handleMarkDone(event) {
        event.stopPropagation(); // Stop propagation to prevent opening next page
        axiosClient.post('/', {
            user: JSON.parse(localStorage.getItem('user'))['code'],
            date: formattedDate,
            taskId: task?.taskId,
            events: [
                {
                    type: "isDone",
                    input: true
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
    return (
        <>
            {!showTaskDetail &&
                <div className="flex items-center my-2 px-5 py-4 rounded-xl bg-mediumGray" onClick={() => {
                    setShowTaskDetail(true);
                }}>
                    {/* <div className="flex items-center justify-center w-12 h-12 bg-gray-700 rounded-full text-2xl">
                {task.icon}
            </div> */}
                    <div className="ml-4 flex-1">
                        <h3 className="text-custompurple font-sfpro text-base font-semibold ">{task.time}</h3>
                        <p className='text-white font-sfpro font-medium capitalize text-lg'>{task.name}</p>
                    </div>
                    <div className="text-2xl">
                        {(task?.completed || isCompleted) ? (
                            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="17" cy="17" r="15.5" fill="#282828" stroke="#7E87EF" stroke-width="2" />
                                <circle cx="17" cy="17" r="10.5" fill="#5ECC7B" />
                            </svg>


                        ) : (
                            // <img src={'./assets/task-left.svg'} alt="" />
                            <svg width="33" height="34" viewBox="0 0 33 34" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={(event) => {
                                handleMarkDone(event);
                            }}>
                                <circle id="Ellipse 1776" cx="16.5" cy="17" r="15.5" stroke="#3D3D3D" stroke-width="2" />
                            </svg>

                        )}
                    </div>
                </div>}
            {showTaskDetail && <TaskDetail SelectedCircle={SelectedCircle} task={task} setShowTaskDetail={setShowTaskDetail} taskCompleted={taskCompleted} setTaskCompleted={setTaskCompleted} />}
        </>
    );
}

export default TaskItem;
