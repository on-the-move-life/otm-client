// AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function AdminDashboard() {
  const { adminLogout, login } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const jwt = localStorage.getItem('adminJwt');
      if (!jwt) {
        throw new Error('No admin JWT found');
      }
      const response = await axios.get(`https://otm-main-zwdk.onrender.com/api/v1/members/active`, {
        headers: {
          'Authorization': `Bearer ${jwt}`
        }
      });
      console.log('Response:', response);
      setUsers(response.data.data);
      setLoading(false);
    } catch (err) {
      console.error('Error details:', err);
      setError(`Failed to fetch users: ${err.message}`);
      setLoading(false);
      if (err.message === 'No admin JWT found') {
        adminLogout();
        navigate('/admin-login');
      }
    }
  };

  const handleLogout = () => {
    adminLogout();
    navigate('/admin-login');
  };

  const handleUserLogin = (user) => {
    // Simulate user login
    const body = {
      email: user.email,
      password: 'dummyPassword', // You might need to adjust this based on your backend requirements
      platform: 'email',
    };
    login(body);
    localStorage.setItem('user', JSON.stringify(user));
    navigate('/home');
  };

  if (loading) return <div className="min-h-screen bg-gray-900 text-white p-8">Loading...</div>;
  if (error) return <div className="min-h-screen bg-gray-900 text-white p-8">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Logout
          </button>
        </div>
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Active Users</h2>
          <ul className="space-y-4">
            {users.map((user) => (
              <li key={user.code} className="flex justify-between items-center bg-gray-700 p-4 rounded-lg">
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-300">{user.email}</p>
                  <p className="text-xs text-gray-400">Code: {user.code}</p>
                </div>
                <button
                  onClick={() => handleUserLogin(user)}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Login as User
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}