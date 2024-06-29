import React from 'react'

function Overview({ weightInfoData }) {
    const { imgUrl, caption } = weightInfoData;
    return (
        <div className="w-[100%] max-w-[326px] h-[457px] rounded-[22.291px]"
            style={{
                backgroundImage: `url(${imgUrl})`,
                backgroundSize: 'cover', // Add this to ensure the image covers the entire div
                backgroundPosition: 'center', // Add this to center the image
            }}
        >
            <div className='w-full h-full px-4 pb-3 rounded-[22.291px] flex flex-col justify-between items-start bg-black/10 backdrop-blur-[1px]'>
                <img src="/assets/overview_streak.png" alt="star" height={74} width={74} className="relative right-[10px]"/>
                <p className="bar-chart-text text-start text-white/90 z-[2]">{caption}</p>
                {/* Mask */}
                <div className='h-[100px] w-full absolute bottom-0 left-0 z-[1] rounded-b-[22.291px] backdrop-blur-3xl bg-transparent'>
                    <div className='w-full h-full rounded-b-[22.291px]' style={{background: 'linear-gradient(180deg, rgba(217, 217, 217, 0.00) 0%, #535353 100%)',}}></div>
                </div>
            </div>
        </div>
    )
}

export default Overview