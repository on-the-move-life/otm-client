import React, { useEffect } from 'react';
import { BackButton } from '../../components';
import { MealTypeCTA } from '.';

const MealTypePage = () => {
  return (
    <>
      <nav>
        <BackButton />
      </nav>
      <header className="flex justify-between">
        <div>
          Eat to live, <br /> not live to eat
        </div>
        <div>Past Meals</div>
      </header>
      <main>
        <div className="flex justify-around">
          <div>
            <span>Macros</span>
          </div>
          <div>
            <span>Micros</span>
          </div>
        </div>
        <div>
          <section>
            <MealTypeCTA title="Breakfast" type="BRK" />
            <MealTypeCTA title="Lunch" type="LNH" />
            <MealTypeCTA title="Dinner" type="DNR" />
          </section>
        </div>
      </main>
    </>
  );
};

export default MealTypePage;
