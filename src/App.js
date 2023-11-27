import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
<<<<<<< Updated upstream
import { Login, Home, PageNotFound, OpeningPage } from './pages';

import { AuthProvider } from './contexts/AuthContext';
import Questionnaire from './features/Questionnaire/Questionnaire';
=======
import { Login, Home, PageNotFound } from './pages';
import { useAuth } from './contexts/AuthContext';
import Questionnaire from './features/Questionnaire/Questionnaire';
import { SectionDetail, WorkoutSummary, Workout } from './features/Workout';
import { useEffect } from 'react';
>>>>>>> Stashed changes

function App() {
  // const { user, getUserFromStorage } = useAuth();

  let user = localStorage.getItem('user');
  if (user && !user.includes('undefined')) {
    user = JSON.parse(user);
  }

  console.log(user, 'USER');

  return (
<<<<<<< Updated upstream
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
=======
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
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
>>>>>>> Stashed changes
  );
}

export default App;
