import React from 'react'

function Overview({ photoURL = 'https://images.unsplash.com/photo-1551606712-b0341396cc87?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', description = 'This month, you lifted a combined weight equivalent to a fully grown Bison or a treadmill!' }) {
    return (
        <div className="w-[100%] max-w-[326px] h-[457px] rounded-[22.291px]"
            style={{
                backgroundImage: `url(${photoURL})`,
                backgroundSize: 'cover', // Add this to ensure the image covers the entire div
                backgroundPosition: 'center', // Add this to center the image
            }}
        >
            <div className='w-full h-full px-4 pb-3 rounded-[22.291px] flex flex-col justify-between items-start bg-black/10 backdrop-blur-[1px]'>
                <img src="/assets/overview_streak.png" alt="star" height={74} width={74} className="relative right-[10px]"/>
                <p className="bar-chart-text text-start text-white/90">{description}</p>
            </div>
        </div>
    )
}

export default Overview