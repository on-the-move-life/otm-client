export function getScreenCounts(questionsArray) {
    try {
        if (questionsArray) {
            let maxScreenCount = 0;
            questionsArray.forEach(element => {
                if (element?.screen > maxScreenCount) {
                    maxScreenCount = element?.screen;
                }
            });
            return maxScreenCount;
        }
        else return 1;
    }
    catch (err) {
        console.log("error in getScreenCounts function : ", err);
    }
}

// function to get the screen number of "target === general"
export function getGeneralScreen(questionsArray){
    try{
        let generalScreen = -1;
        if(questionsArray){
            questionsArray.forEach(ques => {
                if(generalScreen === -1 && ques?.target === "general"){
                    generalScreen = ques?.screen;
                }
            });
        }
        return generalScreen;
    }
    catch(err){
        console.log("error in getGeneralScreen function : ", err)
    }
}

// funtion to return capitalize string
export function capitalizeFirstLetter(str) {
    // Check if the string is empty
    if (str.length === 0) return str;

    // Capitalize the first letter and concatenate it with the rest of the string
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// function to increment the screen and rank when the next button is clicked
export function increaseScreenAndRank(screen, maxScreenCount, setScreen) {
    if (screen < maxScreenCount) {
        setScreen(prev => prev + 1);
    }
    console.log("screen", screen)
}

// function to decrement the screen and rank when the back button is clicked
export function decreaseScreenAndRank(screen, setScreen) {
    if (screen > 1) {
        setScreen(prev => prev - 1);
    }
    console.log("screen", screen)
}

// function to update currentQuestion based on current screen and rank values
export function updateCurrentQuestion(questions, screen, setCurrentQuestion) {
    const filteredQuestions = questions && questions.filter(ques => ques?.screen === screen) // array of all the questions belonging to the same screen
    // sorting the questions based on their ranks
    setCurrentQuestion(filteredQuestions?.sort((a, b) => {
        return a?.rank - b?.rank;
    }));
}

// function to check for empty response in the current screen
export function isAnyEmptyResponse(currentQuestion, response) {
    let isEmpty = false;
    if (currentQuestion) {
        isEmpty = currentQuestion.some((ques, idx) => {
            return ques?.isRequired === true && response[ques?.code][0] === ""
        });
    }
    return isEmpty;
}

// function to check for the validation
export function validResponses(validation) {
    let isValid = true;
    validation && Object.values(validation).map((val, idx) => {
        if (val === false) {
            isValid = false;
        }
    })
    return isValid;
}

// function to retrieve email from the response
export function getEmail(questions, response) {
    const emailQuestion = questions && questions.find((ques, idx) => {
        return ques?.content === "email"
    })
    return emailQuestion && response && response[emailQuestion?.code][0];
}

// function to validate email
export function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email === "" ? true : emailRegex.test(email);
}

// function to validate phone number
export function validatePhoneNumber(phoneNumber) {
    // Regular expression for a simple phone number validation
    const phoneRegex = /^\d{10}$/;

    // Check if the phoneNumber matches the regex pattern
    return phoneNumber === "" ? true : phoneRegex.test(phoneNumber);
}

// function to validate positive integer age
export function validatePositiveInteger(inputValue) {
    // Regular expression for positive integers without decimal points
    const positiveIntegerRegex = /^[1-9]\d*$/;

    // Check if the inputValue matches the regex pattern
    return inputValue === "" ? true : positiveIntegerRegex.test(inputValue);
}