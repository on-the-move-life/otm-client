import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login, Home, PageNotFound, OpeningPage, Workout } from './pages';
import { AuthProvider } from './contexts/AuthContext';
import Questionnaire from './features/Questionnaire/Questionnaire';
import SectionDetail from './features/workout/SectionDetail';
import WorkoutSummary from './features/workout/WorkoutSummary';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<OpeningPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/questionnaire" element={<Questionnaire />} />
          <Route path="/section-details" element={<SectionDetail />} />
          <Route path="/test" element={<Workout />} />
          <Route path="/test-2" element={<WorkoutSummary />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
