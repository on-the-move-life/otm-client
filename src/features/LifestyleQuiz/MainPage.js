import React, { useState, useEffect } from 'react';
import ProgressBar from './Components/ProgressBar';
import BackButton from '../../components/BackButton';
import { Button } from '../../components';
import Options from './Options';
import { axiosClient } from './apiClient';
import {
  getScreenCounts,
  capitalizeFirstLetter,
  increaseScreenAndRank,
  decreaseScreenAndRank,
  updateCurrentQuestion,
  isAnyEmptyResponse,
  validResponses,
  getEmail,
  getGeneralScreen,
} from './utils/utils';
import InputText from './InputText';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Error } from '../../components';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Components/Loader';
import styled from 'styled-components';

function LandingPage() {
  const [questions, setQuestions] = useState(null);
  const [response, setResponse] = useState({});
  const [validation, setValidation] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [screen, setScreen] = useState(-1);
  const maxScreenCount = getScreenCounts(questions);
  // const generalScreen = getGeneralScreen(questions);
  const [sessionID, setSessionID] = useState(null);
  const [exitModalOpen, setExitModalOpen] = useState(false);
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
    background: var(
      --Gradient-silver,
      linear-gradient(95deg, #8c8c8c 0.94%, #ffffff 84.36%)
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  `;

  // sending response to the backend
  function submitResponse() {
    // set the state to loading
    setPageLoading(true);
    // preparing a response for the current screen questions
    const responseBody = [];
    currentQuestion &&
      response &&
      currentQuestion.map((ques, idx) => {
        responseBody.push({
          code: ques?.code,
          answer: response[ques?.code],
        });
      });
    axiosClient
      .post('/', {
        email: getEmail(questions, response),
        sessionId: sessionID,
        questionnaireName: 'lifestyle',
        response: responseBody,
      })
      .then((res) => {
        console.log(res);

        // if the user is on the last screen, submit the question and redirect to the report page
        if (screen === maxScreenCount) {
          sessionID && navigate(`/questionnaire/lifestyle/result/${sessionID}`);
        }

        // after successful submission, let the user proceed to the next question
        // possible error - network breakdown
        increaseScreenAndRank(screen, maxScreenCount, setScreen);
      })
      .catch((err) => {
        console.log(err);
        toast.error('Submission Failed! Please Try Again.');
      })
      .finally(() => {
          setPageLoading(false);
      });
  }

  useEffect(() => {
    setPageLoading(true);
    // fetch the lifestyle quiz data
    axiosClient
      .get('?name=lifestyle')
      .then((res) => {
        // set the questions to the state
        setQuestions(res.data.questions);

        // Update the response state using a callback
        setResponse((prev) => {
          const newResponse = {};
          res.data.questions.forEach((ques) => {
            newResponse[ques.code] = [''];
          });
          return newResponse;
        });

        // generate the session ID
        const UUID = uuidv4();
        console.log('session ID : ', UUID);
        setSessionID(`otm_${UUID.replace(/-/g, '')}`);
      })
      .catch((err) => {
        console.log(err);
        setPageError(true);
      })
      .finally(() => {
        // delay is introduced to increase the time for loading screen (UX improvement)
        setTimeout(() => {
          setPageLoading(false);
        }, 1000);
      });
  }, []);

  useEffect(() => {
    questions && updateCurrentQuestion(questions, screen, setCurrentQuestion);
  }, [screen, questions]);

  useEffect(() => {
    if (Object.keys(response)?.length > 0) {
      console.log('RESPONSE : ', response);
    } else {
      console.log('RESPONSE : ', response);
    }
  }, [response]);

  return (
    <div
      className={`flex min-h-screen flex-col justify-between ${screen === 0 || screen === -1 ? '' : 'px-6 py-8'
        }`}
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      {pageError && !pageLoading && <Error>Some Error Occured</Error>}
      {pageLoading && (
        <div className="fixed left-0 top-0 z-50 w-full bg-black">
          <Loader className={'h-screen w-full'} />
        </div>
      )}
      <div className="fixed top-0 ">
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={true}
          newestOnTop={false}
          closeButton={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
      <div className="hide-scrollbar flex flex-col justify-center gap-3 overflow-y-scroll">
        {screen >= 1 && (
          <div className="flex flex-col items-center justify-center gap-5">
            <div className="mx-auto my-4 flex w-full items-center justify-center">
              {screen > 1 && (
                <BackButton
                  size={30}
                  action={() => decreaseScreenAndRank(screen, setScreen)}
                  className="absolute left-[5%] w-fit cursor-pointer"
                />
              )}

              <ProgressBar
                className="w-[250px]"
                currValue={screen}
                totalValue={questions && questions?.length}
              />
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col items-start justify-between">
        <div className="flex w-full flex-col justify-center gap-5">
          {/* Section Name - Kept for future reference */}
          {/* {screen === generalScreen && (
            <h1 className="mt-12 text-[26px] text-[#7e87ef]">
              General Information
            </h1>
          )} */}
          <div>
            {screen >= 1 &&
              currentQuestion &&
              currentQuestion?.map((ques, idx) => {
                return (
                  <>
                    <div className="my-8 flex flex-col justify-center">
                      <div className="my-3 w-full">
                        {/* Question */}
                        <h1 className="text-[20px] text-[#7e87ef]">
                          {`${capitalizeFirstLetter(ques?.content)}${ques?.isRequired ? ' *' : ''
                            }`}
                        </h1>
                        {/* Description */}
                        <p className="my-2 space-x-2 text-[14px] text-[#b1b1b1]">
                          {capitalizeFirstLetter(ques?.description)}
                        </p>
                      </div>
                      {ques?.inputType?.toUpperCase() === 'SINGLECHOICE' ||
                        ques?.inputType?.toUpperCase() === 'MULTICHOICE' ? (
                        <Options
                          questionCode={ques?.code}
                          options={ques?.options}
                          isMCQ={ques?.inputType !== 'singleChoice'}
                          response={
                            Object.keys(response)?.length > 0 && response
                          }
                          setResponse={setResponse}
                        />
                      ) : (
                        <InputText
                          questionCode={ques?.code}
                          response={
                            Object.keys(response)?.length > 0 && response
                          }
                          setResponse={setResponse}
                          key={ques?.code}
                          inputType={ques?.inputType}
                          placeholder={ques?.placeholder}
                          isRequired={ques?.isRequired}
                          validation={validation}
                          setValidation={setValidation}
                        />
                      )}
                    </div>
                  </>
                );
              })}
            {(screen === -1 || screen === 0) && (
              <div
                className="h-screen w-full"
                style={{
                  backgroundImage: `url(${'/assets/bg_report.png'})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="flex h-full w-full flex-col items-start justify-between bg-black/70 px-6 py-4 backdrop-blur-[8.5px]">
                  <div
                    className={`${screen === -1 ? 'mt-[8rem]' : 'mt-[2rem]'}`}
                  >
                    <img
                      src={'/assets/otm_logo_lifestyle.svg'}
                      alt="otm logo"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center gap-9">
                    {screen === -1 ? (
                      <StarterText>
                        You will be shown a series of questions that pertain to
                        your current{' '}
                        <span
                          style={{
                            background:
                              'linear-gradient(95deg, #D6B6F0 2.94%, #848CE9 74.36%)',
                            backgroundClip: 'text',
                          }}
                        >
                          lifestyle
                        </span>
                        . We will examine factors such as your fitness,
                        nutrition, sleep, mental hygiene, mindset and much more.
                      </StarterText>
                    ) : (
                      <StarterText>
                        When you are finished with the assessment, we will
                        present you with a detailed report of findings, where
                        you’ll discover:
                        <br />
                        <div className="mt-8 py-4 text-[18px]">
                          - Your{' '}
                          <span
                            style={{
                              background:
                                'linear-gradient(95deg, #D6B6F0 2.94%, #848CE9 74.36%)',
                              backgroundClip: 'text',
                            }}
                          >
                            Lifestyle Score
                          </span>
                          , a number personal to you, which objectively
                          quantifies your overall quality of life
                          <br />- A detailed{' '}
                          <span
                            style={{
                              background:
                                'linear-gradient(95deg, #D6B6F0 2.94%, #848CE9 74.36%)',
                              backgroundClip: 'text',
                            }}
                          >
                            Lifestyle Analysis
                          </span>{' '}
                          that will help you understand your habits, diet and
                          fitness
                        </div>
                      </StarterText>
                    )}
                    <Button
                      text={screen === maxScreenCount ? 'Submit' : 'Next'}
                      type="lifestyle"
                      action={() => {
                        // increase the screen value
                        setScreen((prev) => prev + 1);
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {screen >= 1 && (
          <Button
            text={screen === maxScreenCount ? 'Submit' : 'Next'}
            type="lifestyle"
            action={() => {
              // checking for empty response
              if (
                currentQuestion &&
                Object.keys(response)?.length > 0 &&
                !isAnyEmptyResponse(currentQuestion, response) &&
                validResponses(validation)
              ) {
                // API function call for submittin response on every next/submit button press
                submitResponse();
              } else {
                if (isAnyEmptyResponse(currentQuestion, response)) {
                  toast.warn('Please fill in the required fields!');
                } else if (!validResponses(validation)) {
                  toast.warn('Please fill in the valid answer!');
                }
              }
            }}
          />
        )}
      </div>
    </div>
  );
}

export default LandingPage;
