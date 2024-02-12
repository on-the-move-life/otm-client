import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login, PageNotFound } from './pages';
import { Home, LeaderBoard } from './features/Home';
import Questionnaire from './features/Questionnaire/Questionnaire';
import Timeline from './features/Timeline/Timeline';
import { SectionDetail, WorkoutSummary, Workout } from './features/Workout';
import { Leaderboard } from './features/Leaderboard';
import { Profile } from './features/Profile';

function App() {
  // const { user, getUserFromStorage } = useAuth();

  let user = localStorage.getItem('user');
  if (user && !user.includes('undefined')) {
    user = JSON.parse(user);
  }

  console.log(user, 'USER');

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            user && user.email ? (
              <Navigate to="/home" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/questionnaire" element={
            user && user.email ? (
              <Questionnaire />
            ) : (
              <Navigate to="/login" />
            )
          } />
        <Route path="/section-details" element={
            user && user.email ? (
              <SectionDetail />
            ) : (
              <Navigate to="/login" />
            )
          } />
        <Route path="/workout" element={
            user && user.email ? (
              <Workout />
            ) : (
              <Navigate to="/login" />
            )
          } />
        <Route path="/workout-summary" element={
            user && user.email ? (
              <WorkoutSummary />
            ) : (
              <Navigate to="/login" />
            )
          } />
        <Route path="/profile" element={
            user && user.email ? (
              <Profile />
            ) : (
              <Navigate to="/login" />
            )
          } />
        <Route path="/leaderboard" element={
            user && user.email ? (
              <LeaderBoard />
            ) : (
              <Navigate to="/login" />
            )
          } />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/timeline" element={
            user && user.email ? (
              <Timeline />
            ) : (
              <Navigate to="/login" />
            )
          } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
