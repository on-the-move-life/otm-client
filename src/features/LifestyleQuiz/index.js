export { default as LifeStyle } from "./MainPage"
export { default as Report } from "./Report"
export { default as ProgressBar } from "./Components/ProgressBar"
export { default as Loader } from "./Components/Loader"
export { BookCallHeading, BookCallInnerText, FeatureHeading, LifestyleHeading, Name, PlanText, BookCallContainer, PlanFeatureText, ActionText } from "./SytledComponents"
export { getScreenCounts,
    capitalizeFirstLetter,
    increaseScreenAndRank,
    decreaseScreenAndRank,
    updateCurrentQuestion,
    isAnyEmptyResponse,
    validResponses,
    getEmail,
    getGeneralScreen,
    getFitnessScreen
} from "./utils/utils"
export { axiosClient } from "./apiClient"