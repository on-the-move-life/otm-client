import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import NutrientsBubble from './Components/NutrientsBubble';

function CustomiseIngredients({ nutPlan = { calorie: '2200 KCAL', proteins: 43, fats: 17, carbs: 40 }, suggestedIngredients }) {
    const dispatch = useDispatch();
    const { screen } = useSelector((state) => {
        return {
            screen: state.questionSectionInfo.screen,
        }
    })
    const { calorie, proteins, fats, carbs } = nutPlan;
    return (
        <div className='w-full h-full my-11'>
            {
                screen === 4 &&
                <div className='w-full h-full flex flex-col justify-start gap-[4rem]'>
                    <section className='w-full flex flex-col justify-center items-start gap-2'>
                        <h5 className='text-[18px]' style={{ lineHeight: '23px' }}>Suggested calories in a day</h5>
                        <h2 className='text-[32px] text-[#F5C563]' style={{ lineHeight: '40px' }}>{calorie}</h2>
                    </section>

                    <section>
                        <h5 className='text-[16px] text-[#7E87EF]' style={{ lineHeight: '20px', fontWeight: 400 }}>Plate Distribution</h5>
                        <NutrientsBubble proteins={proteins} carbs={carbs} fats={fats} />
                    </section>
                    <section className='w-full flex flex-col justify-start gap-3'>
                        <h5 className='text-[16px] text-[#7E87EF]' style={{ lineHeight: '20px', fontWeight: 400 }}>Coach's notes</h5>
                        <p className='text-[16px] text-[#929292]' style={{ lineHeight: '20px', fontWeight: 400 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud</p>
                    </section>
                </div>
            }
        </div>
    )
}

export default CustomiseIngredients