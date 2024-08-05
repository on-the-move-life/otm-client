import React, { useState, useEffect } from 'react'
import CrossIcon from '../../../components/CrossIcon'
import { Button } from '../../../components'
import GetStarted from './GetStarted'
import Questions from './Questions'
import CustomiseIngredients from './CustomiseIngredients'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getScreenCounts, isAnyEmptyResponse, validResponses } from '../../LifestyleQuiz/utils/utils';
import { axiosClient } from '../apiClient'
import * as Actions from "./Redux/actions"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageIndicator from './Components/PageIndicator'
import { useNavigate } from 'react-router-dom'
import { Loader } from "../../LifestyleQuiz";
import { Error } from "../../../components";
import MealPlanPage from './MealPlanPage';
import * as Selectors from "./Redux/selectors";

function MainPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [validation, setValidation] = useState({});
    const [pageLoading, setPageLoading] = useState(false);
    const [pageError, setPageError] = useState(false);

    const selectQuestions = Selectors.makeGetQuestions();
    const selectResponses = Selectors.makeGetResponses();
    const selectSectionName = Selectors.makeGetSectionName();
    const selectQuestionSectionInfo = Selectors.makeGetQuestionSectionInfo();
    const selectSuggestedIngredients = Selectors.makeGetSuggestedIngredients();
    const selectSelectedIngredients = Selectors.makeGetSelectedIngredients();

    const questions = useSelector(selectQuestions, shallowEqual);
    const responses = useSelector(selectResponses, shallowEqual);
    const sectionName = useSelector(selectSectionName, shallowEqual);
    const questionSectionInfo = useSelector(selectQuestionSectionInfo, shallowEqual);
    const suggestedIngredients = useSelector(selectSuggestedIngredients, shallowEqual);
    const selectedIngredients = useSelector(selectSelectedIngredients, shallowEqual);

    const questionScreen = questionSectionInfo.screen;
    const totalQuestionScreen = questionSectionInfo.totalScreens;
    const currentQuestion = questionSectionInfo.currentScreenQuestions;

    function fetchQuestions() {
        setPageLoading(true);
        axiosClient.get('/questionnaire')
            .then(res => {
                console.log("response : ", res);
                dispatch(Actions.updateQuestions(res?.data?.questions));
            })
            .catch(err => {
                console.log(err);
                setPageError(true);
            })
            .finally(() => {
                setPageLoading(false);
            })
    }
    function submitQuestions(questionResponse) {
        setPageLoading(true);

        // filtering out empty responses
        const filteredQuestions = {};
        Object.keys(questionResponse).map(key => {
            if(questionResponse[key][0] !== ""){
                filteredQuestions[key] = questionResponse[key];
            }
        })
        console.log("filtered questions : ", filteredQuestions);
        axiosClient.post('/questionnaire-response', {
            data: filteredQuestions,
            memberCode: JSON.parse(localStorage.getItem('user'))['code']
        })
            .then(res => {
                console.log(res);
                dispatch(Actions.updateNutritionPlan(res?.data?.data?.nutPlan));
                dispatch(Actions.updateSuggestedIngredients(res?.data?.data?.ingredientsByGroup));
                // questionScreen 4-5 belongs to the sectionName = 'Ingredients'
                dispatch(Actions.updateQuestionSectionInfo({ screen: questionScreen + 1 }));
                dispatch(Actions.updateSectionName('Ingredients'));
            })
            .catch(err => {
                console.log(err);
                setPageError(true);
            })
            .finally(() => {
                setPageLoading(false);
            })
    }
    function submitSelectedIngredients() {
        setPageLoading(true);
        axiosClient.post('/meal-plan', {
            ingredients: selectedIngredients,
            memberCode: JSON.parse(localStorage.getItem('user'))['code']
        })
            .then(res => {
                console.log(res);
                dispatch(Actions.updateWeeklyPlan(res?.data?.plan));
                dispatch(Actions.updateSectionName('Weekly Plan'));
            })
            .catch(err => {
                console.log(err);
                setPageError(true);
            })
            .finally(() => {
                setPageLoading(false);
            })
    }

    function checkAndValidate() {
        // checking for empty response and validations
        if (
            currentQuestion &&
            Object.keys(responses)?.length > 0 &&
            !isAnyEmptyResponse(currentQuestion, responses) &&
            validResponses(validation)
        ) {
            // logic when the continue button is pressed
            if (questionScreen < totalQuestionScreen) {
                dispatch(Actions.updateQuestionSectionInfo({ screen: questionScreen + 1 }))
            }
            else if (questionScreen === totalQuestionScreen) {
                // logic to submit the questions
                submitQuestions(responses);
            }

        } else {
            if (isAnyEmptyResponse(currentQuestion, responses)) {
                toast.warn('Please fill in the required fields!');
            } else if (!validResponses(validation)) {
                toast.warn('Please fill in the valid answer!');
            }
        }
    }


    // update the section name
    useEffect(() => {
        setPageLoading(true);
        // if the meal is already planned then set the section name to 'Weekly Plan'
        const memberCode = JSON.parse(localStorage.getItem('user'))['code'];
        axiosClient.get(`/meal-plan?memberCode=${memberCode}`)
            .then(res => {
                console.log("response /meal-plan : ", res.data);
                if(res?.data?.success === true && res?.data?.data.length !== 0){
                    dispatch(Actions.updateWeeklyPlan(res?.data?.data));
                    dispatch(Actions.updateSectionName('Weekly Plan'));
                }
                else{
                    // else start with the 'Get Started'
                    dispatch(Actions.updateSectionName('Get Started'));
                }
            })
            .catch(err => {
                // else start with the 'Get Started'
                dispatch(Actions.updateSectionName('Get Started'));
                console.log(err);
            })
            .finally(() => setPageLoading(false))
    }, [])

    useEffect(() => {
        if(sectionName === "Get Started"){
            fetchQuestions();
        }
    }, [sectionName])

    useEffect(() => {
        // this useEffect changes the sectionName with change in the questionScreen
        if(sectionName !== 'Weekly Plan' && sectionName !== 'Get Started'){
            if (questionScreen > 1 && questionScreen <= 3) {
                dispatch(Actions.updateSectionName('Questions'));
            }
            else if (questionScreen >= 4 && questionScreen <= 5) {
                dispatch(Actions.updateSectionName('Ingredients'));
            }
            console.log("questions screen : ", questionScreen, totalQuestionScreen)
        }
    }, [questionScreen, totalQuestionScreen])

    useEffect(() => {
        const maxScreenCount = getScreenCounts(questions);
        console.log("maxScreenCount : ", maxScreenCount)
        dispatch(Actions.updateQuestionSectionInfo({ totalScreens: maxScreenCount }))
    }, [questions])

    useEffect(() => {
        // add the ingredient in the selectedIngredients state in redux
        if (Object.keys(suggestedIngredients).length > 0) {
            Object.keys(suggestedIngredients).forEach(category => {
                suggestedIngredients[category].forEach(ingredient => {
                    console.log("hello : ", ingredient._id)
                    dispatch(Actions.addSelectedIngredient(ingredient._id))
                })
            })
        }
    }, [suggestedIngredients])

    return (
        <>
            {pageLoading &&
                <div className="fixed top-0 left-0 z-50 w-full bg-black">
                    <Loader className="w-full h-screen" />
                </div>
            }
            {pageError &&
                <div className="fixed left-0 top-0 z-[200] h-screen w-full bg-black">
                    <Error>Some Error Occurred</Error>
                </div>
            }
            {!pageLoading && !pageError &&
                <div className='w-full min-h-screen overflow-y-scroll py-4 px-3 bg-black'>
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
                    {sectionName !== 'Weekly Plan' &&
                        <div className='absolute top-4 right-3' onClick={() => {
                            // reset the redux store before closing this feature
                            dispatch(Actions.resetToDefault());
                            navigate('/nutrition');
                        }}>
                            <CrossIcon />
                        </div>
                    }

                    {/* Dynamic Section Starts */}
                    <div className='w-full overflow-y-scroll'>
                        {
                            sectionName === 'Get Started' &&
                            <div className="w-full mt-[5rem]">
                                <GetStarted />
                            </div>
                        }
                        {
                            sectionName === 'Questions' &&
                            <div className="w-full mt-3 mb-[100px]">
                                <Questions validation={validation} setValidation={setValidation} />
                            </div>
                        }
                        {
                            sectionName === 'Ingredients' &&
                            <div className="w-full mt-3 mb-[100px]">
                                <CustomiseIngredients />
                            </div>
                        }
                        {
                            sectionName === 'Weekly Plan' &&
                            <div className='w-full mt-3'>
                                <MealPlanPage />
                            </div>
                        }
                    </div>
                    {/* Dynamic Section Ends */}

                    {sectionName !== 'Weekly Plan' &&
                        <div className='w-full h-[100px] flex items-center fixed bottom-0 left-0 bg-black/60 backdrop-blur-sm'>
                            <div className='w-full px-3'>
                                {
                                    sectionName === 'Get Started' && <Button type="mealplanner" text="Get Started" action={() => dispatch(Actions.updateSectionName('Questions'))} />
                                }
                                {
                                    sectionName === 'Questions' && questionScreen === 1 &&
                                    <div className='w-full flex flex-col justify-center items-center'>
                                        <PageIndicator currentPage={questionScreen} totalNumberOfPages={totalQuestionScreen + 2} />
                                        <Button type="mealplanner" text="Continue" action={() => dispatch(Actions.updateQuestionSectionInfo({ screen: questionScreen + 1 }))} />
                                    </div>
                                }
                                {
                                    totalQuestionScreen !== 0 && sectionName === 'Questions' && questionScreen !== 1 && questionScreen <= totalQuestionScreen &&
                                    <div className='w-full flex flex-col justify-center items-center'>
                                        <PageIndicator currentPage={questionScreen} totalNumberOfPages={totalQuestionScreen + 2} />
                                        <div className='w-full grid grid-cols-6 place-items-center gap-2'>
                                            <div className='w-full col-span-2'>
                                                <Button type="mealplannerback" text="Back" action={() => dispatch(Actions.updateQuestionSectionInfo({ screen: questionScreen - 1 }))} />
                                            </div>
                                            <div className="w-full col-span-4">
                                                <Button type="mealplanner" text="Continue" action={() => {
                                                    checkAndValidate();
                                                }} />
                                            </div>
                                        </div>
                                    </div>
                                }
                                {
                                    sectionName === 'Ingredients' &&
                                    <div className='w-full flex flex-col justify-center items-center'>
                                        <PageIndicator currentPage={questionScreen} totalNumberOfPages={totalQuestionScreen + 2} />
                                        <div className='w-full grid grid-cols-6 place-items-center gap-2'>
                                            <div className='w-full col-span-2'>
                                                <Button type="mealplannerback" text="Back" action={() => dispatch(Actions.updateQuestionSectionInfo({ screen: questionScreen - 1 }))} />
                                            </div>
                                            <div className="w-full col-span-4">
                                                <Button type="mealplanner" text="Continue" action={() => {
                                                    // checking for empty response
                                                    if (questionScreen === 4) {
                                                        dispatch(Actions.updateQuestionSectionInfo({ screen: questionScreen + 1 }));
                                                    } else {
                                                        // call the API to submit the chosen ingredients
                                                        submitSelectedIngredients();
                                                    }
                                                }} />
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    }
                </div>
            }
        </>
    )
}

export default MainPage