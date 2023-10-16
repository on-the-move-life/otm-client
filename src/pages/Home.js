import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { logout, isSignUp } = useAuth();

  const navigate = useNavigate();

  function handleLogout() {
    navigate('/login', { replace: true });
    logout();
  }

  const [user, setUser] = useState({});

  useEffect(() => {
    const theUser = localStorage.getItem('user');

    if (theUser && !theUser.includes('undefined')) {
      setUser(JSON.parse(theUser));
    }
  }, []);

  return (
    <div style={{ textAlign: 'center', margin: '3rem' }}>
      <h1>Dear {user?.email}</h1>

      <p>You are successfully logged in</p>

      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Home;
