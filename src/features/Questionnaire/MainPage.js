import React, { useState, useEffect } from 'react';
import { ProgressBar } from '../LifestyleQuiz';
import BackButton from '../../components/BackButton';
import { Button } from '../../components';
import Options from './Components/inputs/Options';
import { axiosClient } from '../LifestyleQuiz';
import {
  getScreenCounts,
  capitalizeFirstLetter,
  increaseScreenAndRank,
  decreaseScreenAndRank,
  updateCurrentQuestion,
  isAnyEmptyResponse,
  getGeneralScreen,
  getFitnessScreen,
} from '../LifestyleQuiz';
import InputText from './Components/inputs/InputText';
import { useNavigate } from 'react-router-dom';
import { Error } from '../../components';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from '../LifestyleQuiz';
import styled from 'styled-components';
import BMIScreen from './BMIScreen';
import AssessmentScreen from './AssessmentScreen';

function LandingPage() {
  const [questions, setQuestions] = useState(null);
  const [response, setResponse] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [screen, setScreen] = useState(0);
  const maxScreenCount = getScreenCounts(questions);
  const generalScreen = getGeneralScreen(questions);
  const fitnessScreen = getFitnessScreen(questions);
  const [pageError, setPageError] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [showAssessmentScreen, setShowAssessmentScreen] = useState(false);
  const [showBMIScreen, setShowBMIScreen] = useState(false);
  const navigate = useNavigate();

  const questionnaireIntroducntion = [
    ' <b className="bg-red"> </b> to guide you every step of the way',
    '  Your weekly workout schedule to meet your goals',
    'Custom made meal planning suited to your taste',
    ' A personalised lifestyle design that works',
    'An accounatability coach to fool to proof your success',
  ];

  const StarterText = styled.div`
    color: var(--New-White, rgba(222.37, 222.37, 222.37, 0.5));
    /* H1 */
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: ${(props) =>
      props.fontSize !== undefined ? props.fontSize : '14px'};
    font-style: normal;

    line-height: 16px; /* 125% */
  `;

  const GradientText = styled.div`
    background: linear-gradient(to right, #d6b6f0, #848ce9);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  `;

  // sending response to the backend
  function submitResponse() {
    // set the state to loading
    setPageLoading(true);

    // close the BMI screen, and the assessment screen if opened
    // redirect the user to the home page if the finish button is clicked on the FitnessScore screen
    if (showBMIScreen) {
      setTimeout(() => {
        setPageLoading(false);
        setShowBMIScreen(false);
      }, 700);
    }
    if (showAssessmentScreen) {
      setTimeout(() => {
        setPageLoading(false);
        setShowAssessmentScreen(false);
      }, 700);
    }

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
    !showAssessmentScreen &&
      !showBMIScreen &&
      axiosClient
        .post('/', {
          email: JSON.parse(localStorage.getItem('user'))['email'],
          questionnaireName: 'signup',
          response: responseBody,
        })
        .then((res) => {
          console.log('POST Response : ', res);

          // open the BMI screen, Assessment screen, or the Fitness Score screen based on the next button clicked on relevant screen
          if (screen === 1) {
            setShowBMIScreen(true);
          } else if (screen === maxScreenCount - 1) {
            setShowAssessmentScreen(true);
          } else if (screen === maxScreenCount) {
            // redirect to the fitness score page
            navigate('/questionnaire/fitness-score');
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
    // fetch the signup questionnaire data
    axiosClient
      .get('?name=signup')
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
    // it will update the current question as soon as the screen changes
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
      className={`flex min-h-screen flex-col justify-between ${
        screen === 0 ? '' : 'px-6 py-8'
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
        {showBMIScreen && (
          <BMIScreen
            response={response}
            submitResponse={submitResponse}
            screen={screen}
            questions={questions}
            getScreenCounts={getScreenCounts}
            setScreen={setScreen}
            decreaseScreenAndRank={decreaseScreenAndRank}
            setShowBMIScreen={setShowBMIScreen}
          />
        )}
        {showAssessmentScreen && (
          <AssessmentScreen
            submitResponse={submitResponse}
            screen={screen}
            questions={questions}
            getScreenCounts={getScreenCounts}
            setScreen={setScreen}
            decreaseScreenAndRank={decreaseScreenAndRank}
            setShowAssessmentScreen={setShowAssessmentScreen}
          />
        )}
        {screen >= 1 && !showBMIScreen && !showAssessmentScreen && (
          <div className="flex flex-col items-center justify-center gap-5">
            <div className="mx-auto my-4 flex w-full items-center justify-center">
              {screen >= 1 && (
                <BackButton
                  size={30}
                  action={() => decreaseScreenAndRank(screen, setScreen)}
                  className="absolute left-[5%] w-fit cursor-pointer"
                />
              )}

              <ProgressBar
                className="w-[250px]"
                currValue={screen}
                totalValue={getScreenCounts(questions)}
              />
            </div>
          </div>
        )}
      </div>
      <div
        className={`flex h-screen  flex-col items-start justify-between ${
          screen > 0 && 'flex-1'
        } `}
      >
        <div className=" h-full w-full">
          {/* Section Name */}
          {screen === generalScreen && (
            <h1 className="mt-3 text-[26px] text-[#7e87ef]">
              General Information
            </h1>
          )}
          {screen === fitnessScreen && (
            <div>
              <h1 className="mt-3 text-[26px] text-[#7e87ef]">Fitness Test</h1>
              <p
                className="my-2 text-[18px] text-[#545454]"
                style={{ fontWeight: 400, lineHeight: '25px' }}
              >
                How many max reps of each movement can you perform in one minute
              </p>
            </div>
          )}
          <div className="h-full">
            {screen >= 1 &&
              currentQuestion &&
              !showBMIScreen &&
              !showAssessmentScreen &&
              currentQuestion?.map((ques, idx) => {
                return (
                  <>
                    <div className="flex flex-col justify-center">
                      <div className="my-5 w-full">
                        {/* Question */}
                        {!['text', 'number'].includes(ques?.inputType) &&
                          ques?.content !== 'Gender' &&
                          !showBMIScreen &&
                          !showAssessmentScreen && (
                            <h1 className="mb-[10px] mt-[20px] text-[22px] text-[#7e87ef]">
                              {`${capitalizeFirstLetter(ques?.content)}${
                                ques?.isRequired ? ' *' : ''
                              }`}
                            </h1>
                          )}
                        {!['text', 'number'].includes(ques?.inputType) &&
                          ques?.content === 'Gender' &&
                          !showBMIScreen &&
                          !showAssessmentScreen && (
                            <h1 className="textbox-text mb-[10px] mt-[20px] text-[22px] uppercase">
                              {`${capitalizeFirstLetter(ques?.content)}${
                                ques?.isRequired ? ' *' : ''
                              }`}
                            </h1>
                          )}
                      </div>
                      {ques?.inputType?.toUpperCase() === 'SINGLECHOICE' ||
                      ques?.inputType?.toUpperCase() === 'MULTICHOICE' ||
                      ques?.inputType?.toUpperCase() ===
                        'SINGLECHOICEANDOTHER' ? (
                        <Options
                          questionCode={ques?.code}
                          options={ques?.options}
                          MCQType={ques?.inputType}
                          target={ques?.target}
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
                          placeholder={ques?.content}
                          isRequired={ques?.isRequired}
                        />
                      )}
                    </div>
                  </>
                );
              })}
            {screen === fitnessScreen && (
              <p
                className="text-[18px] text-[#545454]"
                style={{
                  fontWeight: 400,
                  lineHeight: '25px',
                  marginBlock: '20px',
                }}
              >
                We'll use your results to calculate your fitness score on a
                scale of 1-10.
              </p>
            )}
            {screen === 0 && (
              <div
                className="h-full w-full "
                style={{
                  backgroundImage: `url(${'/assets/bg_report.png'})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="flex h-full w-full flex-col items-start justify-between overflow-y-scroll bg-black/70  backdrop-blur-[8.5px]">
                  <div
                    className={`${
                      screen === 0 ? 'mt-[4rem]' : 'mt-[2rem]'
                    } flex w-full flex-col items-center justify-center`}
                  >
                    <img
                      src={'/assets/otm_white.svg'}
                      alt="otm logo"
                      className=""
                    />

                    <img src={'/assets/text_cut.svg'} className="mt-[44px]" />

                    <GradientText className="mt-2 flex w-min flex-wrap text-center text-4xl">
                      Sustainable Solution
                    </GradientText>
                  </div>

                  <div className=" mt-4 w-full gap-9 rounded-t-3xl bg-[rgba(0,0,0,0.7)] px-4 pb-[65px]  pt-[32px]">
                    {screen === 0 && (
                      <div>
                        <div className="w-full">
                          <div className="w-full px-[20px] text-center text-offwhite">
                            You Get
                          </div>

                          <div className="flex flex-col items-center px-5">
                            <div className="flex w-[280px] ">
                              <img
                                src={'./assets/GreenTick.svg'}
                                alt="correct"
                                className="mr-3 "
                              />
                              <StarterText
                                className=" py-[10px]"
                                fontSize="14px"
                              >
                                <span className="text-offwhite">
                                  Rishi Solanki
                                </span>{' '}
                                to guide you every step of the way
                              </StarterText>
                            </div>

                            <div className="flex w-[280px] ">
                              <img
                                src={'./assets/GreenTick.svg'}
                                alt="correct"
                                className="mr-3 mt-1.5"
                              />
                              <StarterText
                                className=" py-[10px]"
                                fontSize="14px"
                              >
                                Your{' '}
                                <span className="text-offwhite">
                                  weekly workout schedule
                                </span>{' '}
                                to meet your goals
                              </StarterText>
                            </div>

                            <div className="flex w-[280px] ">
                              <img
                                src={'./assets/GreenTick.svg'}
                                alt="correct"
                                className="mr-3 mt-1.5"
                              />
                              <StarterText
                                className=" py-[10px]"
                                fontSize="14px"
                              >
                                <span className="text-offwhite">
                                  Custom made meal planning
                                </span>{' '}
                                suited to your taste
                              </StarterText>
                            </div>
                            <div className="flex w-[280px] ">
                              <img
                                src={'./assets/GreenTick.svg'}
                                alt="correct"
                                className="mr-3 mt-1.5"
                              />
                              <StarterText
                                className=" py-[10px]"
                                fontSize="14px"
                              >
                                <span className="text-offwhite">
                                  A personalised lifestyle design that works
                                </span>{' '}
                              </StarterText>
                            </div>

                            <div className="flex w-[280px] ">
                              <img
                                src={'./assets/GreenTick.svg'}
                                alt="correct"
                                className="mr-3 mt-1.5"
                              />
                              <StarterText
                                className=" py-[10px]"
                                fontSize="14px"
                              >
                                <span className="text-offwhite">
                                  An accountability coach
                                </span>{' '}
                                to fool proof your success
                              </StarterText>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex w-full flex-col justify-center gap-1">
                      <Button
                        style={{ fontWeight: 500, height: '50px' }}
                        text="Let's Gooo!!!"
                        type="lifestyle"
                        action={() => {
                          // increase the screen value
                          setScreen((prev) => prev + 1);
                        }}
                      />
                      {/* <p className='text-[10px] text-center' style={{ color: 'rgba(255,255,255,0.30)', fontWeight: '400' }}>Usually takes ~3mins</p> */}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {screen >= 1 && (
          <Button
            style={{ fontWeight: 500 }}
            text={
              screen === maxScreenCount
                ? 'Finish'
                : currentQuestion[0]?.target === 'ASSESSMENT'
                ? 'Take Assessment'
                : 'Next'
            }
            type="lifestyle"
            action={() => {
              // checking for empty response
              if (
                currentQuestion &&
                Object.keys(response)?.length > 0 &&
                !isAnyEmptyResponse(currentQuestion, response)
              ) {
                // API function call for submittin response on every next/submit button press
                submitResponse();
              } else {
                if (isAnyEmptyResponse(currentQuestion, response)) {
                  toast.warn('Please fill in the required fields!');
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
