import React from 'react';
import MealTypeCTA from './MealTypeCTA';

const Nutrition = () => {
  return (
    <>
      <header className="flex justify-between">
        <div>
          <span>Meal Plan</span>
          <div className="flex flex-col">
            <span>HEY</span>
            <span>RISHI</span>
            <span>Log in your morning breakfast</span>
          </div>
        </div>

        <div>
          <span>settings</span>
          <div className="flex flex-col">
            <span>your weight</span>
            <span>58Kg</span>
          </div>
        </div>
      </header>
      <main>
        <h2>Meal Sections</h2>
        <div>
          <MealTypeCTA title="Breakfast" />
          <MealTypeCTA title="Lunch" />
          <MealTypeCTA title="Dinner" />
        </div>
      </main>
    </>
  );
};

export default Nutrition;
