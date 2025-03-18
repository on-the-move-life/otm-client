//App.js
import { Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import { Community } from './features/Community';
import FitnessPage from './features/Fitness/FitnessPage';
import JourneyReflectionPage from './features/JourneyReflection/JourneyReflectionPage';
import { Leaderboard } from './features/Leaderboard';
import { LifeStyle, Report } from './features/LifestyleQuiz';
import { LifeStyleRoutine, store } from './features/LifeStyleRoutines';
import { MarketPlace } from './features/Marketplace';
import { MonthlyWrapped } from './features/MonthlyWrapped';
import { mealPlannerStore } from './features/Nutrition/MealPlanner';
import { Profile } from './features/Profile';
import { FitnessScoreScreen, Questionnaire } from './features/Questionnaire';
import Timeline from './features/Timeline/Timeline';
import { SectionDetail, Workout, WorkoutSummary } from './features/Workout';
import { Login, PageNotFound } from './pages';

import { useAuth } from './contexts/AuthContext';
import { AdminDashboard } from './features/AdminLogin/AdminDashboard';
import { AdminLogin } from './features/AdminLogin/AdminLogin';

import mixpanel from 'mixpanel-browser';
import Aerobic from './features/Aerobic/Aerobic';
import DynamicStretchScreen from './features/DynamicStretchScreen/DynamicStretchScreen';
import FitnessPageNew from './features/Fitness/FitnessPageNew';
import FtnesssQuestionare from './features/FitnessQuestionaire/FintessQuesrionire';
import MealUpload from './features/LifeStyleRoutines/MealUpload';
import { MealPlanner } from './features/Nutrition/MealPlanner';
import NutritionPage from './features/Nutrition/NutritionPage';
import ReferralUser from './features/ReferralUser/ReferralUser';
import WeeklyCheckIn from './features/WeeklyCheckIn/WeeklyCheckIn';

function App() {
  // Near entry of your product, init Mixpanel
  mixpanel.init('ad91bb98957acbdd5f4eff48a8cf6cec', {
    debug: true,
    track_pageview: true,
    persistence: 'localStorage',
  });

  //   if (isLocalhost()) {
  //     mixpanel.disable(['pageview']);
  // }
  // const { user, getUserFromStorage } = useAuth();
  const { checkAdminAuth, getUserFromStorage } = useAuth();

  function RouteMiddleware({ children }) {
    const user = getUserFromStorage();
    console.log(user);
    if (user && user.email && user.code) {
      mixpanel.identify(user.code);
      mixpanel.people.set({
        $name: user.name,
        $email: user.email,
        // Add anything else about the user here
      });
      return children;
    } else {
      return <Navigate to="/login" />;
    }
  }

  function AdminRouteMiddleware({ children }) {
    console.log('AdminRouteMiddleware Called');
    const adminLoggedIn = checkAdminAuth();
    return adminLoggedIn ? children : <Navigate to="/admin-login" />;
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/timeline/:value"
            element={
              <RouteMiddleware>
                <Timeline />
              </RouteMiddleware>
            }
          />
          <Route
            path="/questionnaire"
            element={
              <RouteMiddleware>
                <Questionnaire />
              </RouteMiddleware>
            }
          />
          <Route
            path="/questionnaire/fitness-score"
            element={
              <RouteMiddleware>
                <FitnessScoreScreen />
              </RouteMiddleware>
            }
          />
          <Route path="/questionnaire/lifestyle" element={<LifeStyle />} />
          <Route
            path="/questionnaire/lifestyle/result/:sessionID"
            element={<Report />}
          />
          <Route
            path="/section-details/:value"
            element={
              <RouteMiddleware>
                <SectionDetail />
              </RouteMiddleware>
            }
          />
          <Route
            path="/warm-up"
            element={
              <RouteMiddleware>
                <DynamicStretchScreen />
              </RouteMiddleware>
            }
          />
          <Route
            path="/aerobic"
            element={
              <RouteMiddleware>
                <Aerobic />
              </RouteMiddleware>
            }
          />
          <Route
            path="/workout/:value"
            element={
              <RouteMiddleware>
                <Workout />
              </RouteMiddleware>
            }
          />
          <Route
            path="/workout-summary/:value"
            element={
              <RouteMiddleware>
                <WorkoutSummary />
              </RouteMiddleware>
            }
          />
          <Route
            path="/marketplace"
            element={
              <RouteMiddleware>
                <MarketPlace />
              </RouteMiddleware>
            }
          />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/referral-user" element={<ReferralUser />} />
          <Route
            path="/monthly-wrapped"
            element={
              <RouteMiddleware>
                <MonthlyWrapped />
              </RouteMiddleware>
            }
          />
          <Route
            path="/journey-reflection/:reportId"
            element={<JourneyReflectionPage />}
          />
          <Route path="/fitness-plan" element={<FtnesssQuestionare />} />
          <Route
            path="/leaderboard/:value"
            element={
              <RouteMiddleware>
                <Leaderboard />
              </RouteMiddleware>
            }
          />{' '}
          <Route element={<MainLayout />}>
            <Route
              path="/lifestyle-routine"
              element={
                <Provider store={store}>
                  <RouteMiddleware>
                    <LifeStyleRoutine />
                  </RouteMiddleware>
                </Provider>
              }
            />
            <Route
              path="/nutrition"
              element={
                <Provider store={mealPlannerStore}>
                  <RouteMiddleware>
                    <NutritionPage />
                  </RouteMiddleware>
                </Provider>
              }
            />
            <Route
              path="/home"
              element={
                <RouteMiddleware>
                  <FitnessPage />
                </RouteMiddleware>
              }
            />
            <Route
              path="/movement"
              element={
                <RouteMiddleware>
                  <FitnessPageNew />
                </RouteMiddleware>
              }
            />
            <Route
              path="/profile"
              element={
                <RouteMiddleware>
                  <Profile />
                </RouteMiddleware>
              }
            />
            <Route
              path="/community"
              element={
                <RouteMiddleware>
                  <Community />
                </RouteMiddleware>
              }
            />

            {/* <Route
            path="/lifestyle"
            element={
              <RouteMiddleware>
                <Lifestyle />
              </RouteMiddleware>
            }
          /> */}
          </Route>
          <Route
            path="/MealUpload"
            element={
              <RouteMiddleware>
                <MealUpload />
              </RouteMiddleware>
            }
          />
          <Route
            path="/meal-planner"
            element={
              <Provider store={mealPlannerStore}>
                <RouteMiddleware>
                  <MealPlanner />
                </RouteMiddleware>
              </Provider>
            }
          />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route
            path="/admin-dashboard"
            element={
              <AdminRouteMiddleware>
                <AdminDashboard />
              </AdminRouteMiddleware>
            }
          />
          <Route
            path="/weekly-checkin"
            element={
              <RouteMiddleware>
                <WeeklyCheckIn />
              </RouteMiddleware>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
