import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login, Home, PageNotFound, OpeningPage, Workout } from './pages';

import { AuthProvider } from './contexts/AuthContext';
import Questionnaire from './features/Questionnaire/Questionnaire';
import SectionDetail from './features/workout/SectionDetail';
import WorkoutSummary from './features/workout/WorkoutSummary';

function App() {
  let user = localStorage.getItem('user');
  if (user && !user.includes('undefined')) {
    user = JSON.parse(user);
  }
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              user && user.email ? <Navigate to="/home" /> : <OpeningPage />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/questionnaire" element={<Questionnaire />} />
          <Route path="/section-details" element={<SectionDetail />} />
          <Route path="/workout" element={<Workout />} />
          <Route path="/workout-summary" element={<WorkoutSummary />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
