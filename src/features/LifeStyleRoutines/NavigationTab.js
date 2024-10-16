import React from 'react';
import NavigationAnalytics from './components/icons/NavigationAnalytics';
import NavigationClock from './components/icons/NavigationClock';
function NavigationTab({ selectedIndex, setSelectedIndex }) {
  return (
    <div className="flex w-full flex-row items-center justify-around">
      <div
        className="flex flex-row items-center justify-center gap-2"
        onClick={() => {
          setSelectedIndex(0);
        }}
      >
        <NavigationClock isSelected={selectedIndex === 0 ? true : false} />
        <p
          className="text-[18px] capitalize"
          style={{ color: selectedIndex === 0 ? '#DDF988' : '#929292' }}
        >
          Routines
        </p>
      </div>
      <div
        className="flex flex-row items-center justify-center gap-2"
        onClick={() => {
          setSelectedIndex(1);
        }}
      >
        <NavigationAnalytics isSelected={selectedIndex === 1 ? true : false} />
        <p
          className="text-[18px] capitalize"
          style={{ color: selectedIndex === 1 ? '#DDF988' : '#929292' }}
        >
          Summary
        </p>
      </div>
    </div>
  );
}

export default NavigationTab;
