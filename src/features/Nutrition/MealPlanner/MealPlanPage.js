import React, { useState, useEffect } from 'react';
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import CalendarTile from './Components/CalendarTile';
import MealInfoTile from './Components/MealInfoTile';
import { useDispatch, useSelector } from 'react-redux';
import * as Selectors from "./Redux/selectors";
import * as Actions from "./Redux/actions";

function MealPlanPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectWeeklyPlans = Selectors.makeGetWeeklyPlan();
  const weeklyPlan = useSelector(selectWeeklyPlans);

  const [selectedDate, setSelectedDate] = useState(null);
  const [dateWiseWeeklyPlan, setDateWiseWeeklyPlan] = useState(null);

  useEffect(() => {
    if(weeklyPlan !== null && weeklyPlan.length > 0){
      setSelectedDate(weeklyPlan[0]['day']);
    }
    console.log("weekly plan : ", weeklyPlan)
  }, [weeklyPlan])

  useEffect(() => {
    const requiredWeeklyPlan = weeklyPlan.filter(item => item?.day === selectedDate);
    console.log("requiredWeeklyPlan : ", requiredWeeklyPlan[0]);
    setDateWiseWeeklyPlan(requiredWeeklyPlan[0]);
    console.log("date wise weekly plan :", dateWiseWeeklyPlan)
  }, [selectedDate])

  return (
    dateWiseWeeklyPlan &&
    <div className='w-full h-full my-4 flex flex-col justify-start items-start gap-7'>
      <div className='absoulte top-4 left-3' onClick={() => {
        dispatch(Actions.resetToDefault());
        navigate('/nutrition');
      }}>
        <MdOutlineKeyboardArrowLeft color="#929292" size={30}/>
      </div>
      <h3 className='text-[26px] text-[#f8f8f8]' style={{lineHeight: '41.6px'}}>Today's Meal Plan</h3>
      <div className='w-full h-fit py-2 rounded-[12px] bg-[#1c1c1e] flex flex-col justify-center items-center'>
          <h5 className="text-[14px] text-[#929292]" style={{lineHeight: '16.71px'}}>Target Calories</h5>
          <p style={{fontSize: '20.61px', lineHeight: '25.77px', color: '#F5C563'}}>{dateWiseWeeklyPlan['totalCalorie']}</p>
      </div>
      <div className='w-full flex flex-row justify-between items-center'>
        {
          weeklyPlan && weeklyPlan.map(item => {
            const slicedDay = item.day.substr(0, 3);
            return(
              <div onClick={() => setSelectedDate(item.day)}>
                <CalendarTile date={item.date} day={slicedDay} isSelected={item.day === dateWiseWeeklyPlan.day}/>
              </div>
            )
          })
        }
      </div>
      <div className='w-full flex flex-col justify-start items-center gap-3 my-5'>
        {
          dateWiseWeeklyPlan && dateWiseWeeklyPlan?.plan.map(item => {
            return(
              <MealInfoTile name={item?.name} meal={item?.meal} calories={item?.calories} macros={item?.macros} ingredients={item?.items}/>
            )
          })
        }
      </div>
    </div>
  )
}

export default MealPlanPage