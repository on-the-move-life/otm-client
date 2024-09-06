import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import Loader from '../../components/Loader';
import Error from '../../components/Error';

export function AdminDashboard() {
  const { adminLogout, login } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.code.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, users]);

  const fetchUsers = async () => {
    try {
      const jwt = Cookies.get('adminJwt');
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/members/active`, {
        headers: {
          'Authorization': `Bearer ${jwt}`
        }
      });
      setUsers(response.data.data);
      setFilteredUsers(response.data.data);
      setLoading(false);
    } catch (err) {
      console.error('Error details:', err);
      setError(`Failed to fetch users: ${err.message}`);
      setLoading(false);
    }
  };
  const handleLogout = () => {
    adminLogout();
    navigate('/admin-login');
  };

  const handleUserLogin = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    navigate('/home');
  };

  if (loading) return <Loader className={'h-screen fixed left-0 top-0 z-[200] bg-black'} />;
  if (error) return (<div className="w-full h-screen fixed top-0 left-0 z-[200] bg-black">
    <Error>Some Error Occurred</Error>
  </div>);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Logout
          </button>
        </div>
        <div className="bg-gray-800 rounded-lg shadow-lg p-4 md:p-6">
          <h2 className="text-2xl font-semibold mb-4">Active Users</h2>
          <input
            type="text"
            placeholder="Search users..."
            className="w-full p-2 mb-4 bg-gray-700 rounded text-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ul className="space-y-4">
            {filteredUsers.map((user) => (
              <li key={user.code} className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-700 p-4 rounded-lg">
                <div className="mb-2 md:mb-0">
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-300">{user.email}</p>
                  <p className="text-xs text-gray-400">Code: {user.code}</p>
                </div>
                <button
                  onClick={() => handleUserLogin(user)}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2 md:mt-0"
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