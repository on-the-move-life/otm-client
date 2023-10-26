import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login, Home, PageNotFound, OpeningPage, Workout } from './pages';
import { AuthProvider } from './contexts/AuthContext';
import Questionnaire from './features/Questionnaire/Questionnaire';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<OpeningPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/questionnaire" element={<Questionnaire />} />
          <Route path='/test' element={<Workout/>} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
