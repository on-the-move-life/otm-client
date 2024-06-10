import React from 'react';
import TaskItem from './TaskItem.js';

const tasks = [
    { time: '8 AM', title: 'Wake Up Routine', icon: '🛏️', completed: true },
    { time: '15 mins', title: 'Movement Rehab Protocol', icon: '🧘‍♂️', completed: true },
    { time: 'Before Shower', title: 'Analyse The Gut', icon: '👨‍⚕️', completed: false },
    { time: 'After Shower', title: 'Visualisation', icon: '🧑‍🎤', completed: false },
    { time: '9 AM', title: 'Breakfast', icon: '☕', completed: false },
];

function MorningCircle() {
    return (
        <div className="p-2 bg-black text-white rounded-lg">
            <div className="relative flex items-center p-4 bg-black text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="18" viewBox="0 0 10 18" fill="none">
                    <path d="M0 8.70206C0 9.03638 0.127827 9.32153 0.393314 9.57719L8.06293 17.0796C8.26942 17.296 8.54474 17.4041 8.85939 17.4041C9.49853 17.4041 10 16.9125 10 16.2635C10 15.9489 9.87217 15.6637 9.65585 15.4474L2.74336 8.70206L9.65585 1.95674C9.87217 1.73058 10 1.44543 10 1.13078C10 0.491642 9.49853 0 8.85939 0C8.54474 0 8.26942 0.108161 8.06293 0.324484L0.393314 7.82694C0.127827 8.0826 0.00983284 8.36775 0 8.70206Z" fill="#7E87EF" />
                </svg>

                <div className="w-full flex justify-center">
                    <span className="text-lightGray font-sfpro text-sm font-medium ">Today, May 15</span>
                </div>
            </div>
            <div className="flex ">
                <div><svg xmlns="http://www.w3.org/2000/svg" width="40" height="41" viewBox="0 0 40 41" fill="none">
                    <path d="M28.3385 20.5013C28.3385 25.1037 24.6076 28.8346 20.0052 28.8346C15.4028 28.8346 11.6719 25.1037 11.6719 20.5013C11.6719 15.8989 15.4028 12.168 20.0052 12.168C24.6076 12.168 28.3385 15.8989 28.3385 20.5013Z" fill="#F5C563" stroke="#F5C563" stroke-width="2.5" />
                    <path d="M20.0065 3.83398V6.33398M20.0065 34.6673V37.1673M31.7912 32.2861L30.0234 30.5184M9.98861 10.4827L8.22084 8.71498M36.6732 20.5007H34.1732M5.83984 20.5007H3.33984M31.792 8.71517L30.0242 10.4829M9.98942 30.5186L8.22165 32.2863" stroke="#F5C563" stroke-width="2.5" stroke-linecap="round" />
                </svg></div>
                <h1 className="text-2xl leading-normal text-white font-sfpro font-medium capitalize p-1">Morning Circle</h1>

            </div>

            {tasks.map((task, index) => (
                <TaskItem key={index} task={task} />
            ))}
        </div>
    );
}

export default MorningCircle;
