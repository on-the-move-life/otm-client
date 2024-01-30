import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login, PageNotFound } from './pages';
import { Home } from './features/Home';
import Questionnaire from './features/Questionnaire/Questionnaire';
import { SectionDetail, WorkoutSummary, Workout } from './features/Workout';
import { Leaderboard } from './features/Leaderboard';

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
        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/section-details" element={<SectionDetail />} />
        <Route path="/workout" element={<Workout />} />
        <Route path="/workout-summary" element={<WorkoutSummary />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="*" element={<PageNotFound />} />

        {/* <Route path="/test" element={<SkillProgression />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
