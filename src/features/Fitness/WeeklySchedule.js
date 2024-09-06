const WeeklySchedule = ({ homeStats }) => {
  return (
    <div className="h-fit w-full rounded-xl bg-black-opacity-45 py-2">
      <div className="mx-3  flex justify-between">
        <h4 className="text-sm text-offwhite">Your weekly schedule</h4>
        {/* <img src="./assets/maximize-schedule.svg" /> */}
      </div>
      <div className="mt-5">
        {homeStats &&
          homeStats.stats.map((item, index) => (
            <div
              className="flex h-[25px] justify-between  px-2"
              style={{
                borderBottom:
                  homeStats.stats.length - 1 !== index
                    ? '0.5px solid rgba(255, 255, 255, 0.13)'
                    : 'none',
              }}
            >
              <div className="flex items-center gap-1">
                <h5 className="text-sm text-blue">{item.total}</h5>{' '}
                <h5 className="text-[10px] text-offwhite">{item.name}</h5>
              </div>
              <div className="flex items-center">
                {item.total === item.completed && (
                  <div className="h-[15px] rounded-[3px] bg-green-opacity-12 px-1 text-[10px] text-green">
                    completed
                  </div>
                )}
                {item.completed > 0 && item.completed < item.total && (
                  <div className="flex gap-1">
                    <div className="h-[15px] rounded-[3px] bg-green-opacity-12 px-1 text-[10px] text-green">
                      {item.completed} done
                    </div>
                    <div className="h-[15px] rounded-[3px] bg-red-opacity-12 px-1 text-[10px] text-red">
                      {item.total - item.completed} left
                    </div>
                  </div>
                )}
                {item.completed === 0 && (
                  <div className="h-[15px] rounded-[3px] bg-red-opacity-12 px-1 text-[10px] text-red">
                    not started
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default WeeklySchedule;
