import React from 'react'
import ScoreIndicator from './Components/ScoreIndicator'
import { Button } from '../../components';
import BackButton from '../../components/BackButton';
import { ProgressBar } from '../LifestyleQuiz';
function BMIScreen({ screen, questions, response, getScreenCounts, decreaseScreenAndRank, setScreen, submitResponse, setShowBMIScreen }) {
    return (
        <div className='absolute min-h-screen w-full flex flex-col justify-between items-center px-6 py-9 top-0 left-0 z-50 bg-black'>
            <div className="flex flex-col items-center justify-center gap-5">
                <div className="mx-auto my-4 flex w-full items-center justify-center">
                    <BackButton
                        size={30}
                        action={() => {
                            setShowBMIScreen(false);
                            decreaseScreenAndRank(screen, setScreen);
                        }}
                        className="absolute left-[5%] w-fit cursor-pointer"
                    />
                    <ProgressBar
                        className="w-[250px]"
                        currValue={screen}
                        totalValue={getScreenCounts(questions)}
                    />
                </div>
            </div>
            <div>
                <h1 className="text-[22px] text-[#7e87ef] text-center">
                    Discover your BMI
                </h1>
                <div className='w-full h-full overflow-x-hidden'>
                    <p className='text-center text-[18px] text-[#545454]'>Your personal health indicator</p>
                    <ScoreIndicator height={Number(response['su4'][0])} weight={Number(response['su3'][0])} />
                </div>
            </div>
            <div className="w-full mb-[44px]">
                <Button
                    text={"Next"}
                    type="lifestyle"
                    action={() => {
                        setShowBMIScreen(false);
                    }}
                />
            </div>
        </div>
    )
}

export default BMIScreen