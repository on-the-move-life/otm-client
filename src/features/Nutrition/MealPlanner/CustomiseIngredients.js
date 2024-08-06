import React from 'react'
import { shallowEqual, useSelector } from 'react-redux';
import NutrientsBubble from './Components/NutrientsBubble';
import IngredientOption from './Components/IngredientOption';
import * as Selectors from "./Redux/selectors";

function CustomiseIngredients() {
    const selectSuggestedIngredients = Selectors.makeGetSuggestedIngredients();
    const selectNutritionPlan = Selectors.makeGetNutritionPlan();
    const selectQuestionSectionInfo = Selectors.makeGetQuestionSectionInfo();

    const suggestedIngredients = useSelector(selectSuggestedIngredients, shallowEqual);
    const nutritionPlan = useSelector(selectNutritionPlan, shallowEqual);
    const questionSectionInfo = useSelector(selectQuestionSectionInfo, shallowEqual);
    const screen = questionSectionInfo.screen;
    
    const { calorie, proteins, fats, carbs } = nutritionPlan;
    return (
        <div className='w-full h-full my-11'>
            {
                screen === 4 &&
                <div className='w-full h-full flex flex-col justify-start gap-[6rem]'>
                    <section className='w-full flex flex-col justify-center items-start gap-2'>
                        <h5 className='text-[18px]' style={{ lineHeight: '23px' }}>Suggested calories in a day</h5>
                        <h2 className='text-[32px] text-[#F5C563]' style={{ lineHeight: '40px' }}>{calorie}</h2>
                    </section>

                    <section>
                        <h5 className='text-[16px] text-[#7E87EF]' style={{ lineHeight: '20px', fontWeight: 400 }}>Plate Distribution</h5>
                        <NutrientsBubble proteins={proteins} carbs={carbs} fats={fats} />
                    </section>
                    {/* <section className='w-full flex flex-col justify-start gap-3'>
                        <h5 className='text-[16px] text-[#7E87EF]' style={{ lineHeight: '20px', fontWeight: 400 }}>Coach's notes</h5>
                        <p className='text-[16px] text-[#929292]' style={{ lineHeight: '20px', fontWeight: 400 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud</p>
                    </section> */}
                </div>
            }
            {
                screen === 5 &&
                <div className='w-full h-full flex flex-col justify-start gap-7'>
                    <div className='w-full flex flex-col gap-1'>
                        <h2 className='text-[18px]' style={{ lineHeight: '23px' }}>Customize your ingredients</h2>
                        <p className='text-[16px] text-[#929292]' style={{ lineHeight: '20px', fontWeight: 400 }}>Uncheck ingredients you don’t want in your meal plan</p>
                    </div>
                    {
                        Object.keys(suggestedIngredients).length !== 0 &&
                        Object.keys(suggestedIngredients).map(category => {
                            return (
                                <div key={category} className='w-full flex flex-col justify-start items-start gap-3'>
                                    <h3 className='text-[16px] text-[#7E87EF] capitalize' style={{ lineHeight: '20px' }}>{category}</h3>
                                    <div className="w-full flex flex-col justify-start items-center gap-2">
                                        {
                                            suggestedIngredients[category].map((ingredient, index) => {
                                                return (
                                                    <IngredientOption optionValue={ingredient.ingredient} description={ingredient.nutritional_value} optionID={ingredient._id} key={ingredient._id} />
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}

export default CustomiseIngredients