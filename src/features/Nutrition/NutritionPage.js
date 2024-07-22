import { AiOutlineRight } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { TimelineHeading } from '../Timeline/StyledComponents';

const NutritionPage = () => {
  return (
    <div className="flex w-screen grow flex-col gap-5 overflow-y-scroll px-4 pb-[78px] ">
      <div className="mt-[32px]">
        <TimelineHeading>Nutrition</TimelineHeading>
      </div>
      <Link to="/MealUpload" className="main-cta">
        <span className="inline-block bg-gradient-to-r from-[#9BF2C0] to-[#91BDF6] bg-clip-text text-transparent">
          Meal Upload
        </span>
        <span>
          <AiOutlineRight size={22} />
        </span>
      </Link>
    </div>
  );
};

export default NutritionPage;
