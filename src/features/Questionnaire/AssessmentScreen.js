import React from 'react'
import { Button } from '../../components';
import BackButton from '../../components/BackButton';
import { ProgressBar } from '../LifestyleQuiz';
import { useNavigate } from 'react-router-dom';

function AssessmentScreen({ screen, questions, getScreenCounts, decreaseScreenAndRank, setScreen, setShowAssessmentScreen, submitResponse }) {
    const navigate = useNavigate();
    return (
        <div className='absolute min-h-screen w-full flex flex-col justify-between items-center px-6 py-9 top-0 left-0 z-50 bg-black'>
            <div className="flex flex-col items-center justify-center gap-5">
                <div className="mx-auto my-4 flex w-full items-center justify-center">
                    <BackButton
                        size={30}
                        action={() => {
                            setShowAssessmentScreen(false);
                            decreaseScreenAndRank(screen, setScreen);
                        }}
                        className="absolute left-[5%] w-fit cursor-pointer"
                    />
                    <ProgressBar
                        className="w-[250px]"
                        currValue={screen}
                        totalValue={getScreenCounts(questions)}
                    />
                    <p
                        className='text-[14px] text-[#848ce9] absolute right-[5%] w-fit cursor-pointer'
                        onClick={() => navigate('/')}
                    >
                        Skip
                    </p>
                </div>
            </div>
            <div className='w-full h-full flex flex-col items-start justify-center gap-3'>
                <h1 className="text-[32px] text-[#7e87ef] text-center">
                    One Last Thing
                </h1>
                <p className='text-[24px] text-[#b1b1b1]' style={{ lineHeight: '38px' }}>Take a mini-assessment that will help us tailor a program suited to your current level.</p>
            </div>
            <div className='w-full mb-[44px]'>
                <Button
                    text={"Take Assessment"}
                    type="lifestyle"
                    action={() => {
                        setShowAssessmentScreen(false);
                    }}
                />
            </div>
        </div>
    )
}

export default AssessmentScreen