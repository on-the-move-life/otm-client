import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from "../Redux/actions";
import { IoIosCheckmarkCircle } from "react-icons/io";

function IngredientOption({ optionValue, optionID, description }) {
  const dispatch = useDispatch();
  const { selectedIngredients } = useSelector((state) => {
    return {
      selectedIngredients: state.selectedIngredients,
    }
  })

  return (
    <div
      className={`w-full flex flex-row justify-between items-center rounded-[12px] bg-[#3d3d3d]/30 px-3 py-4 ${selectedIngredients?.find((elem) => elem === optionID)
          ? 'border-1 border border-[#7e87ef]'
          : ''
        }`}
      onClick={() => {
        // if optionID is present in the selectedIngredients then remove it
        // else if not present, then add it
        if (!selectedIngredients?.includes(optionID)) {
          dispatch(Actions.addSelectedIngredient(optionID))
        }
        else {
          dispatch(Actions.deleteSelectedIngredient(optionID))
        }
      }}
    >
      <div className='w-full flex flex-col justify-center items-start'>
        <p
          className={`text-[16px] ${selectedIngredients?.find((elem) => elem === optionID)
              ? 'text-[#7e87ef]'
              : 'text-[#b1b1b1]'
            }`}
        >
          {optionValue}
        </p>
        <p className='text-[12px] text-[#929292]'>{description}</p>
      </div>
      {selectedIngredients.find(elem => elem === optionID) && <IoIosCheckmarkCircle color='green' />}
    </div>
  )
}

export default IngredientOption