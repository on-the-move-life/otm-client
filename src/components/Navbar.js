import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const path = location.pathname;

  const [activeIndex, setActiveIndex] = useState(0);

  const navArray = [1, 2, 3, 4, 5];

  // Hide nutrition temperory we need in future.

  const inActiveImagePath = [
    '/assets/movement_icon_inactive.svg',
    '/assets/nutrition_icon_inactive.svg',
    '/assets/lifestyle_icon-inactive.svg',
    '/assets/community_icon_inactive.svg',
    '/assets/profile_icon_inactive.svg',
  ];

  const activeImagePath = [
    '/assets/movement_icon_active.svg',
    '/assets/nutrition_icon_active.svg',
    '/assets/lifestyle_icon-active.svg',
    '/assets/community_icon_active.svg',
    '/assets/profile_icon_active.svg',
  ];

  const componentsPath = [
    '/home',
    '/nutrition',
    '/lifestyle-routine',
    '/community',
    '/profile',
  ];

  const handleActivePath = (index) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    if (path) {
      const pathMap = componentsPath.find((item, index) => {
        if (path === item) {
          setActiveIndex(index);
        }
      });
    }
  }, [path]);

  return (
    <footer className="fixed bottom-0 z-30 flex h-[78px] w-full justify-around bg-black pt-[16px]">
      {navArray.map((item, index) => (
        <div key={index} className="" onClick={() => handleActivePath(index)}>
          <Link to={`${componentsPath[index]}`} className="">
            <img
              src={
                index === activeIndex
                  ? activeImagePath[index]
                  : inActiveImagePath[index]
              }
            />
          </Link>
        </div>
      ))}
    </footer>
  );
};

export default Navbar;
