import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login, PageNotFound } from './pages';
import { Home } from './features/Home';
import Questionnaire from './features/Questionnaire/Questionnaire';
import Timeline from './features/Timeline/Timeline';
import { SectionDetail, WorkoutSummary, Workout } from './features/Workout';
import { Leaderboard } from './features/Leaderboard';
import { Profile } from './features/Profile';
import { MarketPlace } from './features/Marketplace';

function App() {
  // const { user, getUserFromStorage } = useAuth();
  let user = localStorage.getItem('user');
  if (user && !user.includes('undefined')) {
    user = JSON.parse(user);
  }
  
  function RouteMiddleware({ children }) {
    let user = localStorage.getItem('user');
    if (user && !user.includes('undefined')) {
      user = JSON.parse(user);
    }

    if(user && user.email) {
      return children;
    } else {    
      return <Navigate to="/login" />;
    }
  }

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
        <Route path="/home" element={<RouteMiddleware><Home/></RouteMiddleware>} />
        <Route path="/questionnaire" element={<RouteMiddleware><Questionnaire /></RouteMiddleware>} />
        <Route path="/section-details" element={<RouteMiddleware><SectionDetail /></RouteMiddleware>} />
        <Route path="/workout" element={<RouteMiddleware><Workout /></RouteMiddleware>} />
        <Route path="/workout-summary" element={<RouteMiddleware><WorkoutSummary /></RouteMiddleware>} />
        <Route path="/profile" element={<RouteMiddleware><Profile /></RouteMiddleware>} />
        <Route path="/leaderboard" element={<RouteMiddleware><Leaderboard /></RouteMiddleware>} />
        <Route path="/marketplace" element={<RouteMiddleware><MarketPlace /></RouteMiddleware>} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/timeline" element={<RouteMiddleware><Timeline /></RouteMiddleware>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
