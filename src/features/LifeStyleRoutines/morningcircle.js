import React, { useEffect, useState } from 'react'
import CircleTask from './components/CircleTask';
import TaskDetail from './components/TaskDetail';


const Morningcircle = () => {


    // const [routinedata, setroutineData] = useState(null);


    const routinedata = {
        "success": true,
        "completionHistory": [
            {
                "date": "May 29 2024",
                "completionPercentage": 0
            },
            {
                "date": "May 28 2024",
                "completionPercentage": 0
            },
            {
                "date": "May 27 2024",
                "completionPercentage": 14
            },
            {
                "date": "May 26 2024",
                "completionPercentage": 0
            },
            {
                "date": "May 25 2024",
                "completionPercentage": 0
            },
            {
                "date": "May 24 2024",
                "completionPercentage": 0
            },
            {
                "date": "May 23 2024",
                "completionPercentage": 0
            }
        ],
        "lifeStyle": {
            "_id": "664f51fbf571adb6d5792ced",
            "circles": [
                {
                    "name": "Morning Circle",
                    "tasks": [
                        {
                            "taskId": "1-1",
                            "name": "wakeUp",
                            "time": "8 AM",
                            "details": [
                                {
                                    "name": "wakeUp",
                                    "duration": "",
                                    "description": "go in sunlight open eyes and do boxed breathing [5 sec] water on your face"
                                }
                            ],
                            "mood": 1,
                            "completed": true
                        },
                        {
                            "taskId": "1-2",
                            "name": "movement",
                            "time": "",
                            "details": [
                                {
                                    "name": "movement",
                                    "duration": "",
                                    "description": " 2 pager description "
                                }
                            ],
                            "mood": 1,
                            "completed": true
                        },
                        {
                            "taskId": "1-3",
                            "name": "mvmtRehabProtocol",
                            "time": "",
                            "details": [
                                {
                                    "name": "mvmtRehabProtocol",
                                    "duration": "",
                                    "description": ""
                                }
                            ]
                        },
                        {
                            "taskId": "1-4",
                            "name": "alkalizeGut",
                            "time": "",
                            "details": [
                                {
                                    "name": "alkalizeGut",
                                    "duration": "",
                                    "description": " Before shower : hot water with lemon and salt "
                                }
                            ]
                        },
                        {
                            "taskId": "1-5",
                            "name": "visualization",
                            "time": "",
                            "details": [
                                {
                                    "name": "visualization",
                                    "duration": "",
                                    "description": " After shower :Scheduling for the day/ Visualisation for the day, what I would like to feel. Write a para."
                                }
                            ]
                        },
                        {
                            "taskId": "1-6",
                            "name": "breakingFast",
                            "time": "",
                            "details": [
                                {
                                    "name": "breakingFast",
                                    "duration": "",
                                    "description": " Nuts and seeds with water; 1 banana ; multi-vitamins : b12 & D3 Smoothie bowl : coconut milk, 2 spoon chia seeds, 4-5  almonds, walnuts [next day] -> fruits with protein seed mix ]"
                                }
                            ]
                        }
                    ],
                    "completionPercentage": 33
                },
                {
                    "name": "Afternoon Circle",
                    "tasks": [
                        {
                            "taskId": "2-1",
                            "name": "lunch",
                            "time": "",
                            "details": [
                                {
                                    "name": "lunch",
                                    "duration": "",
                                    "description": "50-30-20 -> fiber : protein : fat 50 fiber = half would be raw veggies, half would be cooked veggies 1st quad : salad, veggies 2nd : subzi 3rd : protein 4th : curd "
                                }
                            ]
                        },
                        {
                            "taskId": "2-2",
                            "name": "postLunchWalk",
                            "time": "",
                            "details": [
                                {
                                    "name": "postLunchWalk",
                                    "duration": "",
                                    "description": "After lunch : 10 min walk"
                                }
                            ]
                        },
                        {
                            "taskId": "2-3",
                            "name": "afternoonSnack",
                            "time": "",
                            "details": [
                                {
                                    "name": "afternoonSnack",
                                    "duration": "",
                                    "description": "Small snack, get two bowls from morning"
                                }
                            ]
                        }
                    ],
                    "completionPercentage": 0
                },
                {
                    "name": "Evening Circle",
                    "tasks": [
                        {
                            "taskId": "3-1",
                            "name": "workout",
                            "time": "",
                            "details": [
                                {
                                    "name": "workout",
                                    "duration": "",
                                    "description": "Work out : hypertrophy Rep changes 25, Gym : full strength At Home : metcon"
                                }
                            ]
                        }
                    ],
                    "completionPercentage": 0
                },
                {
                    "name": "Night Circle",
                    "tasks": [
                        {
                            "taskId": "4-1",
                            "name": "dinner",
                            "time": "",
                            "details": [
                                {
                                    "name": "dinner",
                                    "duration": "",
                                    "description": "Dinner  : 50:30:20 20 % fat l roti instead of curd"
                                }
                            ]
                        }
                    ],
                    "completionPercentage": 0
                },
                {
                    "name": "Always Active Circle",
                    "tasks": [
                        {
                            "taskId": "5-1",
                            "name": "steps",
                            "time": "",
                            "details": [
                                {
                                    "name": "steps",
                                    "duration": "",
                                    "description": ""
                                }
                            ]
                        },
                        {
                            "taskId": "5-2",
                            "name": "water",
                            "time": "",
                            "details": [
                                {
                                    "name": "water",
                                    "duration": "",
                                    "description": ""
                                }
                            ]
                        },
                        {
                            "taskId": "5-3",
                            "name": "standingHours",
                            "time": "",
                            "details": [
                                {
                                    "name": "standingHours",
                                    "duration": "",
                                    "description": ""
                                }
                            ]
                        }
                    ],
                    "completionPercentage": 0
                }
            ],
            "memberCode": "PRAN",
            "completionPercentage": 14
        }
    }

    console.log(routinedata.success);
    console.log(routinedata.lifeStyle.circles[0].name);
    console.log(routinedata.lifeStyle.circles[0].tasks);
    // useEffect(() => {

    //     fetch('https://otm-main-production.up.railway.app/api/v1/lifestyle?user=PRAN&date=May%2023%202024')
    //         .then(response => response.json())
    //         .then(data => setroutineData(data.lifeStyle.circles.find(circle => circle.name === "Morning Circle")));
    // }, []);

    // if (!routinedata) {
    //     console.log("no data");
    // }

    // else if (routinedata) {
    //     // setCircle(routinedata.lifeStyle.circles.find(circle => circle.name === "Morning Circle"));
    //     // console.log(Circle);
    //     console.log(routinedata.tasks);
    // }




    return (
        <div className='h-screen w-screen  bg-black ' >
            {/* <h2>Success</h2> */}
            {/* <CircleTask SelectedCircle={routinedata.lifeStyle.circles[0].name} tasks={routinedata.lifeStyle.circles[0].tasks} /> */}

            <TaskDetail SelectedCircle={routinedata.lifeStyle.circles[0].name} tasks={routinedata.lifeStyle.circles[0].tasks} />
        </div>
    )
}

export default Morningcircle