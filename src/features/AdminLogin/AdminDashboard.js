// AdminDashboard.js
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Admin Dashboard</h1>
      <p>Welcome</p>
      {/* Add more admin features here */}
    </div>
  );
};

export default AdminDashboard;