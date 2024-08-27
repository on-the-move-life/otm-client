import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as Actions from '../Redux/actions';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import * as Selectors from '../Redux/selectors';

function IngredientOption({ optionValue, optionID, description }) {
  const dispatch = useDispatch();
  const selectSelectedIngredients = Selectors.makeGetSelectedIngredients();
  const selectedIngredients = useSelector(
    selectSelectedIngredients,
    shallowEqual,
  );

  return (
    <div
      className={`flex w-full flex-row items-center justify-between rounded-[12px] bg-[#3d3d3d]/30 px-3 py-4 ${
        selectedIngredients?.find((elem) => elem === optionID)
          ? 'border-1 border border-[#7e87ef]'
          : ''
      }`}
      onClick={() => {
        // if optionID is present in the selectedIngredients then remove it
        // else if not present, then add it
        if (!selectedIngredients?.includes(optionID)) {
          dispatch(Actions.addSelectedIngredient(optionID));
        } else {
          dispatch(Actions.deleteSelectedIngredient(optionID));
        }
      }}
    >
      <div className="flex flex-col items-start justify-center w-full">
        <p
          className={`text-[16px] ${
            selectedIngredients?.find((elem) => elem === optionID)
              ? 'text-[#7e87ef]'
              : 'text-[#b1b1b1]'
          }`}
        >
          {optionValue}
        </p>
        <p className="pr-2 text-[12px] text-[#929292]">{description}</p>
      </div>
      {selectedIngredients.find((elem) => elem === optionID) && (
        <IoIosCheckmarkCircle color="#7e87ef" className="text-2xl" />
      )}
    </div>
  );
}

export default IngredientOption;
