import React, { useMemo } from 'react';

function Movement({
    movement,
    sectionCode,
    movementLength,
    openMovementDetail,
}) {
    const sectionWithLoadArray = useMemo(() => ['ISO', 'MR', 'STR', 'HYP'], []);
    return (
        <div className='card-container bg-[linear-gradient(180deg,_#171717_0%,_#0F0F0F_100%)]' onClick={() => openMovementDetail(movement)}>
            <div className='card-content'>
                <div className="text-md mb-1 flex flex-col gap-1 justify-start text-lightGray">
                    <span>{movement.fullName}</span>
                    {sectionWithLoadArray.includes(sectionCode) && (
                        <div className=" flex space-x-2 text-xs font-semibold  text-black">
                            {movement.personalRecord !== null &&
                                movement.personalRecord > 0 && (
                                    <span className="w-fit rounded bg-[#F5C563] px-2 py-0.5  -tracking-[0.36px]">
                                        PR {movement.personalRecord} KG
                                    </span>
                                )}
                            {movement.lastUsedLoad !== null && movement.lastUsedLoad > 0 && (
                                <span className="w-fit rounded bg-[#7CDCF6]  px-2 py-0.5 -tracking-[0.36px]">
                                    Last Workout {movement.lastUsedLoad} KG
                                </span>
                            )}
                        </div>
                    )}
                </div>
                <div className='image-container'>
                    <img
                        className="w-full h-full rounded-[13.2px] object-cover"
                        src={movement.link[0]}
                        alt="Movement"
                    />
                </div>
                <div
                    className="flex justify-center"
                    onClick={() => openMovementDetail(movement)}
                >
                    <div className="flex items-center justify-center rounded-[7px] border border-white p-[3px]">
                        <span className="w-fit rounded border bg-white px-2 py-0.5  text-center text-xs font-bold -tracking-[0.36px] text-black">
                            Tap For Details
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Movement;
