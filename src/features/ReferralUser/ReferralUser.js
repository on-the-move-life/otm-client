import { FaUserCircle } from 'react-icons/fa';
import GiftCard from './GiftCard';

const ReferralUser = () => {
  return (
    <div className="flex flex-col items-center px-5 h-vh ">
      <div className="mt-[91px] w-full text-center font-sfpro text-[20px] font-medium text-[#F8F8F8]/[0.8]">
        Your Peak Mental And Physical Form Everyday
      </div>
      <GiftCard
        subscriptionText={'your first on the move subscription'}
        info={'Vrinda gifted you 20% off'}
      />
      <div className="mt-4 flex w-full flex-col   gap-[2px] rounded-xl px-1 pb-1 backdrop-blur-xl">
        <h1 className=" flex  h-[32px]  items-center pl-5 text-sm text-[#F8F8F8]/[0.8]">
          How people feel after joining On The Move
        </h1>
        <div className="flex w-full flex-col rounded-xl  bg-mediumGray px-[11px] py-4">
          <div className="flex flex-row items-center w-full">
            <FaUserCircle size={33} color={'#91BDF6'} />

            <div className="flex h-fit w-fit flex-row items-center justify-center rounded-[4px] px-[5px] py-[1px]">
              <div className="ml-2">
                <h3 className="font-sfpro text-[14px] font-medium leading-4 text-[#F8F8F8]/[0.8]">
                  Shrishti
                </h3>
                <h3 className="font-sfpro text-[10px] font-medium leading-4 text-[#8C8C8C]">
                  Actress
                </h3>
              </div>
            </div>
          </div>
          <div className="mt-3 font-sfpro text-[14px]  leading-5 text-[#F8F8F8]/[0.8]">
            For a lack of a better word, OTM was life changing for me. It gave
            me the motivation I didn't believe I could achieve. I have literally
            changed my lifestyle upside down.
          </div>
        </div>
      </div>
      <div className="mt-8 w-full text-center font-sfpro text-[20px] font-medium text-[#F8F8F8]/[0.8]">
        If you’re interested, we’d like to ask you a few questions
      </div>
      <button className=" mt-[30px] flex h-[46px] w-full items-center justify-center gap-1 rounded-lg bg-custompurple p-1 font-sfpro text-lg font-medium leading-8 text-black">
        Get Started
      </button>
    </div>
  );
};

export default ReferralUser;
