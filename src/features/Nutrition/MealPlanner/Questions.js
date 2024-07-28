import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './Redux/actions';
import { updateCurrentQuestion, capitalizeFirstLetter } from '../../LifestyleQuiz/utils/utils';
import InputText from '../../LifestyleQuiz/InputText';
import Options from '../../LifestyleQuiz/Options';

function Questions({ validation, setValidation }) {
    const dispatch = useDispatch();
    const { questions, responses, screen } = useSelector((state) => ({
        questions: state.questions,
        responses: state.responses,
        screen: state.questionSectionInfo.screen
    }))
    const [response, setResponse] = useState({});
    const [currentQuestion, setCurrentQuestion] = useState(null);

    useEffect(() => {
        if(Object.keys(responses).length === 0){
            // Update the response state using a callback
            setResponse((prev) => {
                const newResponse = {};
                questions && questions.forEach((ques) => {
                  newResponse[ques.code] = [''];
                });
                return newResponse;
              });
        }
        else{
            setResponse(responses);
        }
    }, [])

    useEffect(() => {
        dispatch(Actions.updateResponse(response));
    }, [response])

    useEffect(() => {
        console.log("questions : ", questions)
        questions && updateCurrentQuestion(questions, screen, setCurrentQuestion);
    }, [screen, questions]);

    // update currentScreenQuestions in Redux
    useEffect(() => {
        dispatch(Actions.updateQuestionSectionInfo({currentScreenQuestions: currentQuestion}))
    }, [currentQuestion])

    return (
        <div className="w-full">
            {
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
                })
            }
        </div>
    )
}

export default Questions