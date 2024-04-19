import React, { useState, useEffect } from 'react'
import ProgressBar from './Components/ProgressBar'
import BackButton from '../../components/BackButton'
import { Button } from '../../components'
import Options from './Options'
import { axiosClient } from './apiClient'
import {
    getScreenCounts,
    capitalizeFirstLetter,
    increaseScreenAndRank,
    decreaseScreenAndRank,
    updateCurrentQuestion,
    isAnyEmptyResponse,
    validResponses,
    getEmail
} from './utils/utils'
import InputText from './InputText'
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Error } from '../../components';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Components/Loader'
import styled from 'styled-components'

function LandingPage() {
    const [questions, setQuestions] = useState(null);
    const [response, setResponse] = useState({});
    const [validation, setValidation] = useState({});
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [screen, setScreen] = useState(-1);
    const maxScreenCount = getScreenCounts(questions);
    const [sessionID, setSessionID] = useState(null);
    const [pageError, setPageError] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const navigate = useNavigate();

    const StarterText = styled.div`
    color: var(--New-White, rgba(255, 255, 255, 0.26));
    /* H1 */
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 26px;
    font-style: normal;
    font-weight: 500;
    line-height: 40px; /* 125% */
    background: var(--Gradient-silver, linear-gradient(95deg, #8c8c8c 0.94%, #ffffff 84.36%));
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    `

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
            email: getEmail(questions, response),
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
                    increaseScreenAndRank(screen, maxScreenCount, setScreen);
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
        questions && updateCurrentQuestion(questions, screen, setCurrentQuestion);
    }, [screen, questions])

    useEffect(() => {
        if (Object.keys(response)?.length > 0) {
            console.log("RESPONSE : ", response);
        }
        else {
            console.log("RESPONSE : ", response);
        }
    }, [response]);

    return (
        <div
            className={`min-h-screen flex flex-col justify-between ${(screen === 0 || screen === -1) ? '' : 'py-2 px-6'}`}
            style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
            }}
        >
            {pageError && !pageLoading && <Error>Some Error Occured</Error>}
            {pageLoading && <div className='w-full bg-black fixed top-0 left-0 z-50'><Loader className={'h-screen w-full'} /></div>}
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
                {
                    screen >= 1 &&
                    <div className='flex flex-col justify-start items-start gap-5'>
                        {screen >= 1 && <div className='w-[250px] mx-auto my-1'>
                            <ProgressBar currValue={screen} totalValue={questions && questions?.length} />
                        </div>}
                        {screen > 1 && <BackButton size={30} action={() => decreaseScreenAndRank(screen, setScreen)} className='cursor-pointer w-fit' />}
                    </div>
                }
            </div>
            <div className='flex-1 flex flex-col justify-between items-start'>
                <div className='w-full flex flex-col justify-center gap-5'>
                    {/* Section Name */}
                    {
                        screen === 1 &&
                        <h1 className='text-[24px] text-[#7e87ef] font-semibold my-2'>
                            General Information
                        </h1>
                    }
                    <div>
                        {
                            screen >= 1 && currentQuestion && currentQuestion?.map((ques, idx) => {
                                return (
                                    <>
                                        <div className='flex flex-col justify-center mb-8'>
                                            <div className='w-full my-3'>
                                                {/* Question */}
                                                <h1 className='text-[24px] text-[#7e87ef]'>
                                                    {`${capitalizeFirstLetter(ques?.content)}${ques?.isRequired ? ' *' : ''}`}
                                                </h1>
                                                {/* Description */}
                                                <p className='text-[12px] space-x-2 text-[#b1b1b1]'>
                                                    {capitalizeFirstLetter(ques?.description)}
                                                </p>
                                            </div>
                                            {ques?.inputType?.toUpperCase() === "SINGLECHOICE" || ques?.inputType?.toUpperCase() === "MULTICHOICE" ?
                                                <Options questionCode={ques?.code} options={ques?.options} isMCQ={ques?.inputType !== "singleChoice"} response={Object.keys(response)?.length > 0 && response} setResponse={setResponse} /> :
                                                <InputText questionCode={ques?.code} response={Object.keys(response)?.length > 0 && response} setResponse={setResponse} key={ques?.code} inputType={ques?.inputType} placeholder={ques?.placeholder} isRequired={ques?.isRequired} validation={validation} setValidation={setValidation} />}
                                        </div>
                                    </>
                                )
                            })
                        }
                        {
                            (screen === -1 || screen === 0) &&
                            <div
                                className='h-screen w-full'
                                style={{
                                    backgroundImage: `url(${"/assets/bg_report.png"})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            >
                                <div className="w-full h-full bg-black/70 backdrop-blur-[8.5px] px-6 py-4 flex flex-col justify-between items-start">
                                    <div className={`${screen === -1 ? 'mt-[8rem]' : 'mt-[2rem]'}`}>
                                        <img src={"/assets/otm_logo_lifestyle.svg"} alt="otm logo" />
                                    </div>
                                    <div className='flex flex-col justify-center items-center gap-9'>
                                        {screen === -1 ?
                                            <StarterText>
                                                You will be shown a series of questions that pertain to your current <span style={{
                                                    background: 'linear-gradient(95deg, #D6B6F0 2.94%, #848CE9 74.36%)',
                                                    backgroundClip: 'text',
                                                }}>lifestyle</span>. We will examine factors such as your
                                                fitness, nutrition, sleep, mental hygiene, mindset and much more.
                                            </StarterText> :
                                            <StarterText>
                                                When you are finished with the assessment, we will present you with a detailed Report of Findings, where you’ll discover:<br />
                                                - Your <span style={{
                                                    background: 'linear-gradient(95deg, #D6B6F0 2.94%, #848CE9 74.36%)',
                                                    backgroundClip: 'text',
                                                }}>Lifestyle Score</span>, a single number, personal to you, which objectively quantifies your overall quality of life<br />
                                                - A detailed <span style={{
                                                    background: 'linear-gradient(95deg, #D6B6F0 2.94%, #848CE9 74.36%)',
                                                    backgroundClip: 'text',
                                                }}>Lifestyle Analysis</span>
                                            </StarterText>
                                        }
                                        <Button text={screen === maxScreenCount ? "Submit" : "Next"} type="lifestyle" action={() => {
                                            // increase the screen value
                                            setScreen(prev => prev + 1);
                                        }} />
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                {screen >= 1 &&
                    <Button text={screen === maxScreenCount ? "Submit" : "Next"} type="lifestyle" action={() => {

                        // checking for empty response
                        if (currentQuestion && Object.keys(response)?.length > 0 && !isAnyEmptyResponse(currentQuestion, response) && validResponses(validation)) {
                            // API function call for submittin response on every next/submit button press
                            submitResponse();
                        }
                        else {
                            if (isAnyEmptyResponse(currentQuestion, response)) {
                                toast.warn("Please fill in the required fields!")
                            }
                            else if (!validResponses(validation)) {
                                toast.warn("Please fill in the valid answer!");
                            }
                        }
                    }} />}
            </div>
        </div>
    )
}

export default LandingPage
