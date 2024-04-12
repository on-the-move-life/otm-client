import React, { useState, useEffect } from 'react'
import ProgressBar from './Components/ProgressBar'
import BackButton from '../../components/BackButton'
import { Button } from '../../components'
import Options from './Options'
import { axiosClient } from './apiClient'
import { getScreenCounts } from './utils/getScreenStats'
import InputText from './InputText'
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function LandingPage() {
    const [questions, setQuestions] = useState(null);
    const [response, setResponse] = useState([""]);
    const [counter, setCounter] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [screen, setScreen] = useState(1);
    const [rank, setRank] = useState(1);
    const [maxScreenCount, maxRankCount] = getScreenCounts(questions);
    const [sessionID, setSessionID] = useState(null);
    const navigate = useNavigate();

    // function to increment the screen and rank when the next button is clicked
    function increaseScreenAndRank() {
        setCounter(prev => {
            if(questions && prev < questions?.length){
                return prev + 1;
            }
            return prev;
        })
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
        setCounter(prev => {
            if(prev > 1){
                return prev - 1;
            }
            return prev;
        })
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

    // sending response to the backend
    function submitResponse(){
        axiosClient.post('/', {
            email: JSON.parse(localStorage.getItem('user'))?.email,
            questionnaireName: "lifestyle",
            response: [{
                code: currentQuestion && currentQuestion?.code,
                answer: response
            }]
        })
            .then(res => {
                console.log(res);
                setResponse([""]);
                if(screen === maxScreenCount && rank === maxRankCount){
                    sessionID && navigate(`/questionnaire/lifestyle/result/${sessionID}`);
                }
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        axiosClient.get('?name=lifestyle')
            .then(res => {
                // set the questions to the state
                setQuestions(res.data.questions)

                // generate the session ID
                const UUID = uuidv4();
                console.log("session ID : ", UUID);
                setSessionID(UUID);
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        questions && updateCurrentQuestion();
        console.log("counter : ", counter)
    }, [rank, screen, questions, counter])

    useEffect(() => {
        console.log("RESPONSE : ", response);
    }, [response]);

    return (
        <div className='py-3 px-2 min-h-screen flex flex-col justify-between' style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
            <div className='flex flex-col justify-center gap-5'>
                <div className='flex flex-col justify-center gap-7'>
                    <div>
                        <div onClick={decreaseScreenAndRank}>
                            <BackButton size={30} />
                        </div>
                        <div className='w-7/12 mx-auto'>
                            <ProgressBar currValue={counter} totalValue={questions && questions?.length} />
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
                {currentQuestion && currentQuestion[0]?.inputType === "text" ? <InputText response={response} setResponse={setResponse} key={currentQuestion && currentQuestion?.code}/> : <Options options={currentQuestion && currentQuestion[0]?.options} isMCQ={currentQuestion && currentQuestion[0]?.inputType !== "singleChoice"} response={response} setResponse={setResponse} />}
            </div>


            <div>
                <Button text={screen === maxScreenCount && rank === maxRankCount ? "Submit" : "Next"} type="lifestyle" action={() => {
                    
                    // checking for empty response
                    if(response[0] !== ""){
                        // API function call for submittin response on every next/submit button press
                        submitResponse();
                        increaseScreenAndRank();
                    }
                }} />
            </div>
        </div>
    )
}

export default LandingPage
