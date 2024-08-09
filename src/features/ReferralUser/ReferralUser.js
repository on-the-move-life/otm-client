import axios from 'axios';
import { useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import GiftCard from './GiftCard';

const ReferralUser = () => {
  useEffect(() => {
    // setShowStepCount(true);
    // setLoader(true);
    async function getUserData() {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/v1/referral`,
          {
            params: {
              memberCode: JSON.parse(localStorage.getItem('user'))['code'],
            },
          },
        );
        if (res.data) {
          console.log('ress', res.data);
          // setStepCount(res.data.data.stepCount);
        }
        if (res.data.success === true) {
          // setShowStepCount(false);
        }
      } catch (err) {
        console.error(err.message);
      } finally {
        // setLoader(false);
      }
    }
    getUserData();
  }, []);

  return (
    <div className="relative flex flex-col items-center w-full px-5 pb-10 h-vh">
      <img
        src="./assets/referral-frame.svg"
        className="fixed top-0 w-full h-screen "
        alt=""
      />
      <div className="mt-[70px] w-full text-center font-sfpro text-[20px] font-medium text-[#F8F8F8]/[0.8]">
        Your Peak Mental And Physical Form Everyday
      </div>
      <GiftCard
        subscriptionText={'your first on the move subscription'}
        info={'Vrinda gifted you 20% off'}
      />
      <div className="relative z-[10] mr-2  mt-7 flex  flex-col items-center  gap-[2px] rounded-xl   px-1 pb-1">
        <div className="flex max-w-[350px]  justify-end">
          <div className="talkbubble ml-14 mt-3  flex w-full flex-col rounded-xl px-[11px] py-4 font-sfpro text-[14px]   leading-5 text-[#F8F8F8]/[0.8]">
            For a lack of a better word, OTM was life changing for me. It gave
            me the motivation I didn't believe I could achieve. I have literally
            changed my lifestyle upside down.
          </div>
        </div>
        <div className="flex justify-start w-full mt-5">
          <div className="referral-user flex w-min  flex-row items-center justify-start px-2 py-[6px]">
            <FaUserCircle size={33} color={'#91BDF6'} />

            <div className=" flex h-fit w-fit flex-row items-center justify-center rounded-[4px] px-[5px] py-[1px]">
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
        </div>
      </div>
      <div className="mt-8 w-full text-center font-sfpro text-[20px] font-medium text-[#F8F8F8]/[0.8]">
        If you’re interested, we’d like to ask you a few questions
      </div>
      <button
        onClick={() =>
          window.open(
            'https://calendly.com/rishisolanki1995/30mincallwithrishi',
            '_blank',
          )
        }
        className="relative z-20 mt-[30px] flex h-[46px] w-full items-center justify-center gap-1 rounded-lg bg-custompurple p-1 font-sfpro text-lg font-semibold leading-8 text-black"
      >
        Get Started
      </button>
    </div>
  );
};

export default ReferralUser;
