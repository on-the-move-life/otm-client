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
import { Error } from '../../components';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Components/Loader'

function LandingPage() {
    const [questions, setQuestions] = useState(null);
    const [response, setResponse] = useState({});
    const [counter, setCounter] = useState(1);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [screen, setScreen] = useState(1);
    const maxScreenCount = getScreenCounts(questions);
    const [sessionID, setSessionID] = useState(null);
    const [pageError, setPageError] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const navigate = useNavigate();

    // function to increment the screen and rank when the next button is clicked
    function increaseScreenAndRank() {
        setCounter(prev => {
            if (questions && prev < questions?.length) {
                return prev + 1;
            }
            return prev;
        })
        if (screen < maxScreenCount) {
            setScreen(prev => prev + 1);
        }
        console.log("screen", screen)
    }

    // function to decrement the screen and rank when the back button is clicked
    function decreaseScreenAndRank() {
        setCounter(prev => {
            if (prev > 1) {
                return prev - 1;
            }
            return prev;
        })
        if (screen > 1) {
            setScreen(prev => prev - 1);
        }
        console.log("screen", screen)
    }

    // function to update currentQuestion based on current screen and rank values
    function updateCurrentQuestion() {
        const filteredQuestions = questions.filter(ques => ques?.screen === screen) // array of all the questions belonging to the same screen
        // sorting the questions based on their ranks
        setCurrentQuestion(filteredQuestions?.sort((a, b) => {
            return a?.rank - b?.rank;
        }));
    }

    // function to check for empty response in the current screen
    function isAnyEmptyResponse() {
        let isEmpty = false;
        if (currentQuestion) {
            isEmpty = currentQuestion.some((ques, idx) => {
                return ques?.isRequired === true && response[ques?.code][0] === ""
            });
        }
        return isEmpty;
    }

    // function to retrieve email from the response
    function getEmail() {
        const emailQuestion = questions && questions.find((ques, idx) => {
            return ques?.content === "email"
        })
        return emailQuestion && response && response[emailQuestion?.code][0];
    }

    // sending response to the backend
    function submitResponse() {
        // set the state to loading
        setPageLoading(true);
        // preparing a response for the current screen questions
        const responseBody = [];
        currentQuestion && response && currentQuestion.map((ques, idx) => {
            responseBody.push({
                code: ques?.code,
                answer: response[ques?.code]
            })
        })
        axiosClient.post('/', {
            email: getEmail(),
            sessionId: sessionID,
            questionnaireName: "lifestyle",
            response: responseBody
        })
            .then(res => {
                console.log(res);

                // if the user is on the last screen, submit the question and redirect to the report page
                if (screen === maxScreenCount) {
                    sessionID && navigate(`/questionnaire/lifestyle/result/${sessionID}`);
                }

                // after successful submission, let the user proceed to the next question
                // possible error - network breakdown
                // delay in increaseSreenAndRank to simulate the network delay and toast
                setTimeout(() => {
                    increaseScreenAndRank();
                }, 800)
            })
            .catch(err => {
                console.log(err);
                toast.error('Submission Failed! Please Try Again.');
            })
            .finally(() => {
                // a delay of 500ms is introduced bcz to old page was appearing for a moment after the loading was stopped
                setTimeout(() => {
                    setPageLoading(false);
                }, 500)
            })
    }

    useEffect(() => {
        setPageLoading(true);
        // fetch the lifestyle quiz data
        axiosClient.get('?name=lifestyle')
            .then(res => {
                // set the questions to the state
                setQuestions(res.data.questions)

                // Update the response state using a callback
                setResponse(prev => {
                    const newResponse = {};
                    res.data.questions.forEach(ques => {
                        newResponse[ques.code] = [""];
                    });
                    return newResponse;
                });

                // generate the session ID
                const UUID = uuidv4();
                console.log("session ID : ", UUID);
                setSessionID(`otm_${UUID.replace(/-/g, "")}`);
            })
            .catch(err => {
                console.log(err);
                setPageError(true);
            })
            .finally(() => {
                // delay is introduced to increase the time for loading screen (UX improvement)
                setTimeout(() => {
                    setPageLoading(false);
                }, 1000)
            })
    }, [])

    useEffect(() => {
        questions && updateCurrentQuestion();
        console.log("counter : ", counter)
    }, [screen, questions, counter])

    useEffect(() => {
        if (Object.keys(response)?.length > 0) {
            console.log("RESPONSE : ", response);
        }
        else {
            console.log("RESPONSE : ", response);
        }
    }, [response]);

    return (
        <div className='py-4 px-3 min-h-screen flex flex-col justify-between' style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
            {pageError && !pageLoading && <Error>Some Error Occured</Error>}
            {pageLoading && <div className='w-full bg-black fixed top-0 z-50'><Loader className={'h-screen w-full'} /></div>}
            <div className='fixed top-0'>
                <ToastContainer
                    position="top-center"
                    autoClose={1000}
                    hideProgressBar={true}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
            </div>
            <div className='flex flex-col justify-center gap-3 overflow-y-scroll hide-scrollbar'>
                <div className='flex flex-row justify-start items-center gap-2'>
                    {screen !== 1 && <BackButton size={30} action={decreaseScreenAndRank} className='cursor-pointer w-fit' />}
                    <div className='w-[250px] mx-auto my-1'>
                        <ProgressBar currValue={counter} totalValue={questions && questions?.length} />
                    </div>
                </div>
                {/* Section Name */}
                {
                    screen === 1 &&
                    <h1 className='text-[24px] text-[#7e87ef] uppercase font-semibold my-2'>
                        General Information
                    </h1>
                }
                <div className='w-full flex flex-col justify-center gap-[2.5rem]'>
                    {
                        currentQuestion && currentQuestion?.map((ques, idx) => {
                            return (
                                <>
                                    <div className='flex flex-col justify-center'>
                                        <div className='my-3'>
                                            {/* Question */}
                                            <h1 className='text-[24px] text-[#7e87ef] capitalize'>
                                                {ques?.content}
                                            </h1>
                                            {/* Description */}
                                            <p className='text-[12px] space-x-2 text-[#b1b1b1] capitalize'>
                                                {ques?.description}
                                            </p>
                                        </div>
                                        {ques?.inputType?.toUpperCase() === "SINGLECHOICE" || ques?.inputType?.toUpperCase() === "MULTICHOICE" ?
                                            <Options questionCode={ques?.code} options={ques?.options} isMCQ={ques?.inputType !== "singleChoice"} response={Object.keys(response)?.length > 0 && response} setResponse={setResponse} /> :
                                            <InputText questionCode={ques?.code} response={Object.keys(response)?.length > 0 && response} setResponse={setResponse} key={ques?.code} inputType={ques?.inputType} placeholder={ques?.placeholder} isRequired={ques?.isRequired} />}
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </div>


            <div>
                <Button text={screen === maxScreenCount ? "Submit" : "Next"} type="lifestyle" action={() => {

                    // checking for empty response
                    if (currentQuestion && Object.keys(response)?.length > 0 && !isAnyEmptyResponse()) {
                        // API function call for submittin response on every next/submit button press
                        submitResponse();
                    }
                    else {
                        toast.warn("Please fill in the answer")
                    }
                }} />
            </div>
        </div>
    )
}

export default LandingPage
