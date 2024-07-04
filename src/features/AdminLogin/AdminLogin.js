// AdminLogin.js
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiEye, HiEyeOff } from 'react-icons/hi';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAdminLogin = useCallback(async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Mock login logic
    setTimeout(() => {
      if (password === 'adminwho?') {
        localStorage.setItem('adminToken', 'mock-admin-token');
        navigate('/admin-dashboard');
      } else {
        setError('Invalid password. Please try again.');
      }
      setIsLoading(false);
    }, 1000); // Simulate API delay

  }, [password, navigate]);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-900">
      <form onSubmit={handleAdminLogin} className="w-96 rounded-lg bg-gray-800 p-8 shadow-xl">
        <h2 className="mb-6 text-2xl font-bold text-center text-green-400">Admin Login</h2>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="mb-4 w-full rounded border border-gray-700 bg-gray-700 p-2 text-white focus:border-green-500 focus:outline-none"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-2 text-gray-400 hover:text-white focus:outline-none"
          >
            {showPassword ? <HiEyeOff size={24} /> : <HiEye size={24} />}
          </button>
        </div>
        {error && <p className="mb-4 text-red-400 text-sm">{error}</p>}
        <button
          type="submit"
          className={`w-full rounded bg-green-500 p-2 text-white transition duration-300 ease-in-out ${
            isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'
          }`}
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;