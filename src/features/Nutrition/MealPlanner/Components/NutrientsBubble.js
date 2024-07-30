import React from 'react'

function NutrientsBubble({ carbs, fats, proteins, size= 'large' }) {
    /**
     * Note : Diameter-percentage relation of the circles (bigger) : 4.2px for 1%, 42px for 10%
     * Note : Diameter-percentage relation of the circles (smaller) : 2px for 1%, 20px for 10%
     */
    const carbsDiameter = size === 'small' ? 2*carbs : 4.2*carbs;
    const fatsDiameter = size === 'small' ? 2*fats : 4.2*fats;
    const proteinsDiameter = size === 'small' ? 2*proteins : 4.2*proteins;
    const degrees = size === 'small' ? 60 : 45;
    return (
        <div className={`w-full flex flex-col justify-center items-center gap-2 relative`} style={{right: '50px'}}>
            <div className='rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#FFD7D7] to-[#FA5757] relative flex justify-center items-center' style={{height: carbsDiameter, width: carbsDiameter, left: (carbsDiameter/2 + proteinsDiameter/2)*Math.sin(degrees * Math.PI/180), top: (carbsDiameter/2 + proteinsDiameter/2)*(1 - Math.cos(degrees * Math.PI/180))}}>
                <div className="flex flex-col justify-center items-center text-[20px] text-black/60" style={{lineHeight: '20.13px'}}>
                    <h3>{carbs}%</h3>
                    <p>carbs</p>
                </div>
            </div>
            <div className='rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#97EBAD] to-[#439258] flex justify-center items-center' style={{height: proteinsDiameter, width: proteinsDiameter}}>
            <div className="flex flex-col justify-center items-center text-[20px] text-black/60" style={{lineHeight: '20.13px'}}>
                    <h3>{proteins}%</h3>
                    <p>proteins</p>
                </div>
            </div>
            <div className='rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#FFD7D7] to-[#7E87EF] relative flex justify-center items-center' style={{height: fatsDiameter, width: fatsDiameter, left: (fatsDiameter/2 + proteinsDiameter/2)*Math.sin(degrees * Math.PI/180), bottom: (fatsDiameter/2 + proteinsDiameter/2)*(1 - Math.cos(degrees * Math.PI/180))}}>
            <div className="flex flex-col justify-center items-center text-[20px] text-black/60" style={{lineHeight: '20.13px'}}>
                    <h3>{fats}%</h3>
                    <p>fats</p>
                </div>
            </div>
        </div>
    )
}

export default NutrientsBubble