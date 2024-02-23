import React from 'react';

const sectionWithLoadArray = ['ISO', 'MR', 'STR', 'HYP'];

const Movement = ({
  movement,
  sectionCode,
  movementLength,
  openMovementDetail,
}) => {
  return (
    <div
      className={`card ${movementLength > 1 ? 'w-[100%]' : 'w-full'}`}
      onClick={() => openMovementDetail(movement)}
    >
      <div
        className={`mb-8 flex h-[400px]
           w-full
          flex-col justify-between rounded-xl border border-[#383838] bg-[linear-gradient(180deg,_#171717_0%,_#0F0F0F_100%)] p-4 text-lg`}
      >
        <div>
          <div className="text-md mb-1 flex justify-start text-lightGray">
            <span>{movement.fullName}</span>
          </div>
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
              {/* <span className="my-1 bg-floYellow p-1">Personal Record 24KG</span>
            <span className="my-1 bg-blue p-1">Last Workout 12KG</span> */}
            </div>
          )}
        </div>
        <div
          className="flex h-fit w-full items-center justify-center p-2"
          style={{ maxHeight: '240px' }}
          onClick={() => openMovementDetail(movement)}
        >
          <img
            className="h-auto w-auto rounded-lg"
            style={{ maxHeight: '240px', maxWidth: '250px' }}
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
};

export default Movement;
