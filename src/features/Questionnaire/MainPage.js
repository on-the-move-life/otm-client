import React, { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
import styled from 'styled-components';
import { Button, Loader } from '../../components';
import BackButton from '../../components/BackButton';
import {
  axiosClient,
  decreaseScreenAndRank,
  getScreenCounts,
  updateCurrentQuestion,
} from '../LifestyleQuiz';
import { getHighestScreenNumber } from '../LifestyleQuiz/utils/utils';
import BMIScreen from './BMIScreen';
import FitnessInput from './Components/inputs/FitnessInput';
import InputText from './Components/inputs/InputText';
import Options from './Components/inputs/Options';
import FitnessScorePage from './FitnessScoreScreen';
import IngredientScreen from './IngredientScreen';
import IntrodunctionScreen from './IntrodunctionScreen';
import LoadingScreen from './LoadingScreen';
import MealScreen from './MealScreen';
import PlansScreen from './PlansScreen';
import QuestionniareProgress from './QuestionniareProgress';
import {
  dums,
  handleBackFunc,
  handleNextFunc,
  mealResponse,
  questionnaireData,
} from './utils';

const GradientText = styled.div`
  background: linear-gradient(to right, #d6b6f0, #848ce9);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

function LandingPage() {
  const [questions, setQuestions] = useState(null);
  const [response, setResponse] = useState({});
  const [value, setValue] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [section, setSection] = useState(null);
  const [screen, setScreen] = useState(0);
  const maxScreenCount = getScreenCounts(questions);

  const [pageError, setPageError] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [showAssessmentScreen, setShowAssessmentScreen] = useState(false);
  const [showBMIScreen, setShowBMIScreen] = useState(false);
  const [showPlansScreen, setShowPlansScreen] = useState(false);
  const [selectedQuestionniareSection, setSelectedQuestionniareSection] =
    useState(null);
  const [fitnessScoreData, setFitnessScoreData] = useState(null);
  const [highestScrenNumber, setHighestScrenNumber] = useState(null);
  const [showMealScreen, setShowMealScreen] = useState(false);
  const [showIngredientScreen, setShowIngredientScreen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ingredient, setIngredient] = useState(false);
  const [errorScreen, setErrorScreen] = useState(false);
  const [showFitnessInsightScreen, setShowFitnessInsightScreen] =
    useState(false);
  const [fitnessScorePageLoading, setFitnessScorePageLoading] = useState(true);
  const code = JSON.parse(localStorage.getItem('user'))['code'];
  const [mealId, setMealId] = useState(null);
  const [buttonDisable, setButtonDisable] = useState(false);
  const [introButtonDisable, setIntroButtonDisable] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (section) {
      const selectedSection = questionnaireData.find((item) =>
        item.section.includes(section),
      );
      setSelectedQuestionniareSection(selectedSection);
    }
  }, [section]);

  useEffect(() => {
    if ((questions, section)) {
      getHighestScreenNumber(questions, setHighestScrenNumber, section);
    }
  }, [questions, section]);

  // sending response to the backend

  const handleNextClick = () => {
    const data = currentQuestion
      .filter((item) => item.section === section)
      .map((item) => item.code);

    const filteredResponse = response.filter((item) =>
      data.includes(item.code),
    );
    if (section === 'fitness' && screen === 5) {
      setShowFitnessInsightScreen(true);
    }

    const apiPayload = {
      ...(((screen === 2 && section === 'lifestyle') ||
        (screen === 4 && section === 'nutrition' && showMealScreen === true) ||
        (screen === 5 && section === 'fitness') ||
        (screen === 1 && section === 'generalInformation')) && {
        section: section,
      }),

      memberCode: code,
      response: filteredResponse,
      ...(screen === 2 && section === 'lifestyle' && { completed: true }), // Add `completed: true` if section is 'lifestyle'
    };
    setButtonDisable(true);
    if (screen === 4 && section === 'nutrition' && showMealScreen === false) {
      setShowMealScreen(true);
      setButtonDisable(false);
    } else {
      axiosClient
        .put('/', apiPayload)
        .then((res) => {
          if (section === 'fitness' && screen === 5) {
            setFitnessScoreData(res.data.data);
            setFitnessScorePageLoading(false);
          }

          handleNextFunc({
            screen,
            section,
            setScreen,
            setSection,
            setShowBMIScreen,
            setShowMealScreen,
            showMealScreen,
            setLoading,
          });
        })
        .catch((err) => {
          console.log(err);
          toast.error('Submission Failed! Please Try Again.');
        })
        .finally(() => {
          setButtonDisable(false);
        });
    }
  };

  const handleBackClick = () => {
    handleBackFunc({
      screen,
      section,
      setScreen,
      setSection,
      setShowMealScreen,
      showMealScreen,
      response,
      setResponse,
    });
  };

  // function submitResponse() {
  //   // set the state to loading
  //   setPageLoading(true);

  //   if (showBMIScreen) {
  //     setTimeout(() => {
  //       setPageLoading(false);
  //       setShowBMIScreen(false);
  //     }, 700);
  //   }
  //   if (showAssessmentScreen) {
  //     setTimeout(() => {
  //       setPageLoading(false);
  //       setShowAssessmentScreen(false);
  //     }, 700);
  //   }

  //   // preparing a response for the current screen questions
  //   const responseBody = [];
  //   currentQuestion &&
  //     response &&
  //     currentQuestion.map((ques, idx) => {
  //       responseBody.push({
  //         code: ques?.code,
  //         answer: response[ques?.code],
  //       });
  //     });
  //   !showAssessmentScreen &&
  //     !showBMIScreen &&
  //     axiosClient
  //       .get()
  //       .then((res) => {
  //         console.log('POST Response : ', res);

  //         // open the BMI screen, Assessment screen, or the Fitness Score screen based on the next button clicked on relevant screen
  //         if (section === 'generalInformation' && screen === 1) {
  //           setShowBMIScreen(true);
  //         } else if (screen === maxScreenCount - 1) {
  //           setShowAssessmentScreen(true);
  //         } else if (screen === maxScreenCount) {
  //           // redirect to the fitness score page
  //           navigate('/questionnaire/fitness-score');
  //         }

  //         // after successful submission, let the user proceed to the next question
  //         // possible error - network breakdown
  //         increaseScreenAndRank(screen, maxScreenCount, setScreen);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         toast.error('Submission Failed! Please Try Again.');
  //       })
  //       .finally(() => {
  //         setPageLoading(false);
  //       });
  // }

  useEffect(() => {
    const fetchData = async () => {
      setPageLoading(true);
      setIntroButtonDisable(true);
      try {
        // First API call: Fetch the signup questionnaire data
        const questionnaireRes = await axiosClient.get();

        // Update the state based on the first API response

        setSection(dums[0].section);
        setQuestions(dums);
        const initialResponse = dums.map((item) => ({
          code: item.code,
          value: [''],
        }));
        setResponse(initialResponse);

        // Second API call: Fetch the onboarding response
        const responseRes = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/v1/onboarding/response?memberCode=${code}`,
        );

        if (responseRes.data.msg.response.length > 0) {
          // Map the response data and update the state

          const resultArray = initialResponse.map((item) => {
            const updatedValue = responseRes.data.msg.response.find(
              (updatedItem) => updatedItem.code === item.code,
            );
            return updatedValue ? { ...item, value: updatedValue.value } : item;
          });
          setResponse(resultArray);
        }
      } catch (err) {
        console.log(err);
        setErrorScreen(true);
        setPageError(true);
      } finally {
        // Delay to show the loading screen for UX improvement
        setTimeout(() => {
          setPageLoading(false);
        }, 1000);
      }
    };

    fetchData();
  }, [code]);

  useEffect(() => {
    // it will update the current question as soon as the screen changes
    questions &&
      updateCurrentQuestion(questions, screen, setCurrentQuestion, section);
  }, [screen, questions, section]);

  useEffect(() => {
    if (Object.keys(response)?.length > 0) {
      console.log('RESPONSE : ', response);
    } else {
      console.log('RESPONSE : ', response);
    }
  }, [response]);

  useEffect(() => {}, []);

  const handleIngredientScreen = (e) => {
    setMealId(e);
    setShowIngredientScreen(true);

    const targetObject = dums.find((item) => item.code === 'onb15');
    if (!targetObject) return null;

    const targetOption = targetObject.options.find(
      (option) => option.id === e.meal,
    );

    setIngredient(targetOption);
  };

  if (errorScreen) {
    return (
      <div
        className={`flex h-screen w-screen flex-col items-center justify-evenly `}
      >
        <div className="text-center text-xl">Some Error Occured</div>

        <div
          onClick={() => navigate('/questionnaire')}
          className="text-lg text-green underline"
        >
          Try again
        </div>
      </div>
    );
  }

  if (pageLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div
      className={`flex h-screen flex-col justify-between overflow-y-scroll bg-gray-opacity-44   ${
        screen === 0 || showPlansScreen ? '' : 'px-3 py-8'
      }  `}
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      {selectedQuestionniareSection && (
        <img
          src={selectedQuestionniareSection.img}
          className="absolute left-0 top-0 z-10 h-screen w-screen  brightness-75 saturate-100"
          alt="background"
        />
      )}

      {showFitnessInsightScreen && (
        <div className="fixed left-0 top-0 z-[100] w-full ">
          {' '}
          <FitnessScorePage
            fitnessScoreData={fitnessScoreData}
            setShowFitnessInsightScreen={setShowFitnessInsightScreen}
            fitnessScorePageLoading={fitnessScorePageLoading}
          />{' '}
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
            screen={screen}
            questions={questions}
            getScreenCounts={getScreenCounts}
            setScreen={setScreen}
            setSection={setSection}
            setShowBMIScreen={setShowBMIScreen}
            setShowPlansScreen={setShowPlansScreen}
          />
        )}
        {loading && <LoadingScreen />}
        {showPlansScreen && (
          <div>
            <PlansScreen setShowPlansScreen={setShowPlansScreen} />
          </div>
        )}

        {screen === 1 &&
          section === 'generalInformation' &&
          !showBMIScreen &&
          !loading &&
          !showPlansScreen &&
          !showMealScreen &&
          !showAssessmentScreen && (
            <div className="relative z-20 flex flex-col items-center justify-center gap-5">
              <div className="mx-auto my-4 flex w-full items-center justify-end">
                {screen >= 1 && (
                  <BackButton
                    size={30}
                    action={() => decreaseScreenAndRank(screen, setScreen)}
                    className="absolute left-[5%] w-fit cursor-pointer"
                  />
                )}

                <div className="mr-4 h-[6px] w-[80%] rounded-xl bg-blue" />
              </div>
            </div>
          )}
      </div>
      <div></div>
      <div
        className={`relative z-20 flex h-screen flex-col items-start justify-between  ${
          screen > 0 && 'flex-1'
        } ${showPlansScreen && 'hidden'} `}
      >
        <div className=" h-fit w-full">
          {/* Section Name */}
          {screen === 1 &&
            section === 'generalInformation' &&
            !loading &&
            !showBMIScreen &&
            !showPlansScreen && (
              <h1 className="mt-3 text-[20px] text-customWhite">
                General Information
              </h1>
            )}
          {highestScrenNumber &&
          section !== 'generalInformation' &&
          !showBMIScreen &&
          !showPlansScreen &&
          !showIngredientScreen &&
          section !== 'generalInformation' ? (
            <QuestionniareProgress
              currValue={screen}
              totalValue={highestScrenNumber}
              questionnaireData={selectedQuestionniareSection}
            />
          ) : (
            <></>
          )}

          {!showIngredientScreen && showMealScreen && (
            <MealScreen
              handleIngredientScreen={handleIngredientScreen}
              mealResponse={mealResponse}
              response={response}
            />
          )}
          {showIngredientScreen && (
            <IngredientScreen
              response={response}
              setResponse={setResponse}
              ingredient={ingredient}
              setShowIngredientScreen={setShowIngredientScreen}
            />
          )}

          {/* {screen === fitnessScreen && (
            <div>
              <h1 className="mt-3 text-[26px] text-[#7e87ef]">Fitness Test</h1>
              <p
                className="my-2 text-[18px] text-[#545454]"
                style={{ fontWeight: 400, lineHeight: '25px' }}
              >
                How many max reps of each movement can you perform in one minute
              </p>
            </div>
          )} */}
          <div
            className={`flex h-fit flex-col gap-2 ${
              screen > 0 && 'pb-[100px]'
            }`}
          >
            {screen >= 1 &&
              currentQuestion &&
              !loading &&
              !(section === 'fitness' && screen === 5) &&
              !showBMIScreen &&
              !showAssessmentScreen &&
              !showMealScreen &&
              !showPlansScreen &&
              !showIngredientScreen &&
              currentQuestion?.map((ques, idx) => {
                return (
                  <span key={ques.code}>
                    <div className="flex flex-col justify-center gap-2">
                      {ques?.inputType?.toUpperCase() === 'SINGLECHOICE' ||
                      ques?.inputType?.toUpperCase() === 'MULTICHOICE' ||
                      ques?.inputType?.toUpperCase() === 'NESTEDMULTICHOICE' ||
                      ques?.inputType?.toUpperCase() ===
                        'MULTICHOICEANDOTHER' ||
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
                          heading={ques?.content}
                          setResponse={setResponse}
                          questionnaireData={selectedQuestionniareSection}
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
                          heading={ques?.content}
                          isRequired={ques?.isRequired}
                          screen={screen}
                          section={section}
                        />
                      )}
                      {/* {ques?.inputType?.toUpperCase() ===
                        'NESTEDMULTICHOICE' && <NestesMultiChoiceInput />} */}
                    </div>
                  </span>
                );
              })}

            <div>
              {screen >= 1 &&
                currentQuestion &&
                section === 'fitness' &&
                screen === 5 &&
                !showBMIScreen &&
                !showAssessmentScreen &&
                !loading &&
                !showMealScreen &&
                !showPlansScreen && (
                  <div className="flex flex-col  rounded-xl bg-black-opacity-45 p-4">
                    <div className="mb-[25px] font-sfpro text-[14px] text-offwhite">
                      How many max reps of each movement can you perform in 1
                      minute?
                    </div>
                    <div className="flex flex-col gap-2">
                      {currentQuestion?.map((ques, idx) => {
                        return (
                          <span key={ques.code}>
                            <FitnessInput
                              response={response}
                              questionCode={ques?.code}
                              setResponse={setResponse}
                              heading={ques?.content}
                            />
                          </span>
                        );
                      })}{' '}
                    </div>
                  </div>
                )}
            </div>
          </div>
          {screen === 0 && (
            <div
              className="h-screen w-full  "
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

                  <img
                    src={'/assets/text_cut.svg'}
                    className="mt-[44px]"
                    alt="img"
                  />

                  <GradientText className="mt-2 flex w-min flex-wrap text-center text-4xl">
                    Sustainable Solution
                  </GradientText>
                </div>

                <div className=" mt-4 w-full gap-9 rounded-t-3xl bg-[rgba(0,0,0,0.7)] px-4 pb-[65px]  pt-[32px]">
                  {screen === 0 && <IntrodunctionScreen />}

                  <div className="mt-[36px] flex w-full flex-col justify-center gap-1">
                    <Button
                      style={{ fontWeight: 500, height: '50px' }}
                      disabled={pageLoading}
                      text="LET'S GO!"
                      type="lifestyle"
                      action={() => {
                        // increase the screen value
                        setScreen((prev) => prev + 1);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {screen >= 1 &&
          !showPlansScreen &&
          !showBMIScreen &&
          !loading &&
          !showIngredientScreen && (
            <div className="fixed bottom-6 left-0 flex w-full gap-[10px] px-4">
              {((screen > 1 && section === 'fitness') ||
                (screen > 1 && section === 'nutrition') ||
                (screen > 1 && section === 'lifestyle')) && (
                <button
                  onClick={() => handleBackClick()}
                  className="min-h-[54px] w-[114px]  grow  rounded-lg bg-graySecond text-center "
                >
                  Back
                </button>
              )}

              <button
                style={{ fontWeight: 500 }}
                disabled={buttonDisable}
                className="bg-customWhiteSecond flex min-h-[54px] w-full items-center justify-center gap-1 rounded-xl text-center text-black disabled:bg-gray disabled:text-offwhite"
                onClick={() => {
                  // checking for empty response

                  if (currentQuestion && Object.keys(response)?.length > 0) {
                    if (
                      section === 'nutrition' &&
                      screen === 4 &&
                      currentQuestion.length === 1
                    ) {
                      const answer = response.find(
                        (item) => item.code === 'onb15',
                      );

                      if (answer.value.length === 0 || answer.value[0] === '') {
                        toast.warn('Please fill in the required fields!');
                      } else {
                        handleNextClick();
                      }
                    } else {
                      handleNextClick();
                    }
                  }
                }}
              >
                {screen === maxScreenCount
                  ? 'Finish'
                  : currentQuestion[0]?.target === 'ASSESSMENT'
                  ? 'Take Assessment'
                  : 'Next'}{' '}
                <FaArrowRight />
              </button>
            </div>
          )}
      </div>
    </div>
  );
}

export default LandingPage;
