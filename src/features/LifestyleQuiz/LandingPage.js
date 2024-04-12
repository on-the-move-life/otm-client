import React, { useState, useEffect } from 'react'
import ProgressBar from './Components/ProgressBar'
import BackButton from '../../components/BackButton'
import { Button } from '../../components'
import Options from './Options'
import { axiosClient } from './apiClient'
import { getScreenCounts } from './utils/getScreenStats'
import InputText from './InputText'

function LandingPage() {
    const [questions, setQuestions] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [screen, setScreen] = useState(1);
    const [rank, setRank] = useState(1);
    const [maxScreenCount, maxRankCount] = getScreenCounts(questions);

    // function to increment the screen and rank when the next button is clicked
    function increaseScreenAndRank() {
        if (questions.find(ques => ques?.screen === screen && ques?.rank === rank + 1)) {
            setRank(prev => prev + 1);
        }
        else {
            if (screen !== maxScreenCount) {
                setScreen(prev => prev + 1);
                setRank(1);
            }
        }
        console.log("screen rank", screen, rank)
    }

    // function to decrement the screen and rank when the back button is clicked
    function decreaseScreenAndRank() {
        if (questions.find(ques => ques?.screen === screen && ques?.rank === rank - 1)) {
            setRank(prev => prev - 1);
        }
        else {
            if (screen !== 1) {
                setScreen(prev => prev - 1);
                // set the highest rank of the updated screen
                const screenRankArray = questions.filter(elem => elem?.screen === screen - 1);
                console.log((screenRankArray.map(elem => elem?.rank)))
                setRank(Math.max(...screenRankArray.map(elem => elem?.rank)));
            }
        }
        console.log("screen rank", screen, rank)
    }

    // function to update currentQuestion based on current screen and rank values
    function updateCurrentQuestion() {
        setCurrentQuestion(questions.filter(ques => ques?.screen === screen && ques?.rank === rank)); // using [0] to store the question as an object, not as an array
    }

    useEffect(() => {
        axiosClient.get('?name=lifestyle')
            .then(res => setQuestions(res.data.questions))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        questions && updateCurrentQuestion();
    }, [rank, screen, questions])

    return (
        <div className='py-3 px-2 min-h-screen flex flex-col justify-between' style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
            <div className='flex flex-col justify-center gap-5'>
                <div className='flex flex-col justify-center gap-7'>
                    <div>
                        <div onClick={decreaseScreenAndRank}>
                            <BackButton size={30} />
                        </div>
                        <div className='w-7/12 mx-auto'>
                            <ProgressBar currValue={screen} totalValue={maxScreenCount} />
                        </div>
                    </div>
                    <div className='my-3'>
                        {/* Question */}
                        <h1 className='text-[24px] text-[#7e87ef]'>
                            {currentQuestion && currentQuestion[0]?.content?.toUpperCase()}
                        </h1>
                        {/* Description */}
                        <p className='text-[12px] space-x-2 uppercase text-[#b1b1b1]'>
                            {currentQuestion && currentQuestion[0]?.description?.toUpperCase()}
                        </p>
                    </div>
                </div>
                {currentQuestion && currentQuestion[0]?.inputType === "text" ? <InputText /> : <Options options={currentQuestion[0]?.options} isMCQ={currentQuestion[0]?.inputType !== "singleChoice"} />}
            </div>


            <div>
                <Button text={screen === maxScreenCount && rank === maxRankCount ? "Submit" : "Next"} type="lifestyle" action={increaseScreenAndRank} />
            </div>
        </div>
    )
}

export default LandingPage
