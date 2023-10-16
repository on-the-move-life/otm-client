import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const SubmissionPage = () => {
  const navigate = useNavigate();

  const { logout } = useAuth();

  function handleLogout() {
    navigate('/login', { replace: true });
    logout();
  }

  return (
    <div>
      <h1>SUBMISSION PAGE</h1>
      <footer onClick={() => handleLogout()}>LOGOUT</footer>
    </div>
  );
};

export default SubmissionPage;
