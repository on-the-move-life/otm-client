import React from 'react'
import { useState } from 'react';
// import { ReactComponent as Angry } from '../assets/Feeling-sad.svg';
// import { ReactComponent as Sad } from '../assets/Feeling-sad2.svg';
// import { ReactComponent as Neutral } from '../assets/Feeling-neutral.svg';
// import { ReactComponent as Happy } from 'public\assets\Feeling-happy.svg';
// import { ReactComponent as Love } from '../assets/feeling-happy2.svg';

const FeelingCheckin = () => {

    const [feeling, setFeeling] = useState(null);
    // const feelings = [
    //     { component: <Angry />, label: 'Angry' },
    //     { component: <Sad />, label: 'Sad' },
    //     { component: <Neutral />, label: 'Neutral' },
    //     { component: <Happy />, label: 'Happy' },
    //     { component: <Love />, label: 'Love' }
    // ];

    return (
        <div className="flex justify-between">
            {/* {feelings.map((feelingItem, index) => (
                <button
                    key={index}
                    onClick={() => setFeeling(index)}
                    className={`p-2 rounded-full ${feeling === index ? 'bg-green-600' : 'bg-gray-800'}`}
                    aria-label={feelingItem.label}
                >
                    {feelingItem.component}
                </button>
            ))} */}
        </div>
    )
}

export default FeelingCheckin