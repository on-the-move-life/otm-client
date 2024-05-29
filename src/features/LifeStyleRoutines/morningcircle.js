import React, { useEffect, useState } from 'react'
import CircleTask from './components/CircleTask';
import TaskDetail from './components/TaskDetail';


const Morningcircle = () => {


    const [routinedata, setroutineData] = useState(null);


    useEffect(() => {

        fetch('https://otm-main-production.up.railway.app/api/v1/lifestyle?user=PRAN&date=May%2023%202024')
            .then(response => response.json())
            .then(data => setroutineData(data.lifeStyle.circles.find(circle => circle.name === "Morning Circle")));
    }, []);

    if (!routinedata) {
        console.log("no data");
    }

    else if (routinedata) {
        // setCircle(routinedata.lifeStyle.circles.find(circle => circle.name === "Morning Circle"));
        // console.log(Circle);
        console.log(routinedata.tasks);
    }




    return (
        <div className='h-screen w-screen  bg-black p-2' >
            {/* <CircleTask SelectedCircle={routinedata.name} tasks={routinedata.tasks} /> */}
            <TaskDetail SelectedCircle={routinedata.name} tasks={routinedata.tasks} />
        </div>
    )
}

export default Morningcircle