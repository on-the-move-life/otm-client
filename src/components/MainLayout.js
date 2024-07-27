// MainLayout.js
import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="flex flex-col h-screen ">
      <div className="relative grow">
        <Outlet />
      </div>
      <Navbar />
    </div>
  );
};

export default MainLayout;
