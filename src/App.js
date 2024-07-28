//App.js
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login, PageNotFound } from './pages';
import Timeline from './features/Timeline/Timeline';
import { SectionDetail, WorkoutSummary, Workout } from './features/Workout';
import { Leaderboard } from './features/Leaderboard';
import { Profile } from './features/Profile';
import { MarketPlace } from './features/Marketplace';
import { LifeStyle } from './features/LifestyleQuiz';
import { Report } from './features/LifestyleQuiz';
import { Questionnaire } from './features/Questionnaire';
import { FitnessScoreScreen } from './features/Questionnaire';
import JourneyReflectionPage from './features/JourneyReflection/JourneyReflectionPage';
import { LifeStyleRoutine } from './features/LifeStyleRoutines';
import { MonthlyWrapped } from './features/MonthlyWrapped';
import { Provider } from 'react-redux';
import { store } from './features/LifeStyleRoutines';
import { mealPlannerStore } from './features/Nutrition/MealPlanner'
import MainLayout from './components/MainLayout';
import FitnessPage from './features/Fitness/FitnessPage';
import { Community } from './features/Community';
import Lifestyle from './features/Lifestyle/Lifestyle';

import { AdminLogin } from './features/AdminLogin/AdminLogin';
import { AdminDashboard } from './features/AdminLogin/AdminDashboard';
import { useAuth } from './contexts/AuthContext';

import MealUpload from './features/LifeStyleRoutines/MealUpload';
import NutritionPage from './features/Nutrition/NutritionPage';
import { MealPlanner } from './features/Nutrition/MealPlanner';

function App() {
  // const { user, getUserFromStorage } = useAuth();
  const { checkAdminAuth, getUserFromStorage } = useAuth();

  function RouteMiddleware({ children }) {
    console.log('RouteMiddleware called');
    const user = getUserFromStorage();

    if (user && user.email) {
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
          path="/section-details"
          element={
            <RouteMiddleware>
              <SectionDetail />
            </RouteMiddleware>
          }
        />
        <Route
          path="/workout"
          element={
            <RouteMiddleware>
              <Workout />
            </RouteMiddleware>
          }
        />
        <Route
          path="/workout-summary"
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
          path="/leaderboard/:value"
          element={
            <RouteMiddleware>
              <Leaderboard />
            </RouteMiddleware>
          }
        />{' '}
        <Route element={<MainLayout />}>
          <Route
            path="/nutrition"
            element={
              <RouteMiddleware>
                <NutritionPage />
              </RouteMiddleware>
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

          <Route
            path="/lifestyle"
            element={
              <RouteMiddleware>
                <Lifestyle />
              </RouteMiddleware>
            }
          />
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
          path="/MealPlanner"
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
