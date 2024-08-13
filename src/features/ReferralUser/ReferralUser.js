import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useParams, useSearchParams } from 'react-router-dom';
import GiftCard from './GiftCard';

const ReferralUser = () => {
  const [referreeName, setRefereeName] = useState('');
  const [referrerCode, setReferrerCode] = useState(null);
  const [referrerName, setReferrerName] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const numberOfImages = 5;

  const myParam = searchParams.get('memberCode');

  useEffect(() => {
    // setShowStepCount(true);
    // setLoader(true);
    async function getUserData() {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/v1/referral`,
          {
            params: {
              memberCode: myParam,
            },
          },
        );
        if (res.data) {
          setReferrerCode(res.data.data.referralCode);
          setReferrerName(res.data.data.referredBy);
        }
      } catch (err) {
        console.error(err.message);
      }
    }
    getUserData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (referreeName && referrerCode) {
      try {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/referral`, {
          referralCode: referrerCode,
          referee: referreeName,
        });
        console.log('Submission successful');
      } catch (error) {
        console.error('An error occurred:', error);
      }
    } else {
      console.warn('Please enter a step count before submitting');
    }
  };

  return (
    <div className="relative flex flex-col items-center w-full px-5 pb-10 h-vh">
      <img
        src="./assets/referral-frame.svg"
        className="fixed top-0 w-full h-screen "
        alt=""
      />
      <img src="./assets/otm-gray.svg" className="mt-[81px]" alt="" />
      <div className="mt-[18px] w-full text-center font-sfpro text-[20px] font-medium text-[#F8F8F8]/[0.8]">
        Unlock your peak Mental and Physical form everyday
      </div>
      {referrerName && (
        <GiftCard
          subscriptionText={'on your first OTM subscription'}
          info={`${referrerName} gifted you 20% off`}
        />
      )}

      <div className="relative z-[10] mr-2   flex  flex-col items-center  gap-[2px] rounded-xl   px-1 pb-1">
        <div className="flex max-w-[350px]  justify-end">
          <div
            style={{ letterSpacing: '0.5px' }}
            className="talkbubble ml-14  flex w-full flex-col rounded-xl px-[11px] py-4 font-sfpro text-[14px]   leading-4 text-[#F8F8F8]/[0.8]"
          >
            For the lack of a better word, OTM was life changing for me. It gave
            me the motivation I didn't believe I could achieve. I have literally
            changed my lifestyle upside down.
          </div>
        </div>
        <div className="flex justify-start w-full mt-5">
          <div className="referral-secondUser  flex   flex-row items-center justify-start px-2 py-[6px]">
            <img
              src="./assets/referral-user.svg"
              className="h-[33px] w-[33px]"
              alt=""
            />

            <div className=" flex h-fit w-fit flex-row items-center justify-center rounded-[4px] px-[5px] py-[1px]">
              <div className="ml-1">
                <h3 className="font-sfpro text-[14px] font-medium leading-4 text-[#F8F8F8]/[0.8]">
                  Srishti
                </h3>
                <h3 className="font-sfpro text-[10px] font-medium leading-4 text-[#8C8C8C]">
                  Actress
                </h3>
              </div>
            </div>

            <div className="flex h-[36px]">
              {Array.from({ length: numberOfImages }).map((_, index) => (
                <img
                  key={index}
                  src="./assets/referral-star.svg"
                  className="mt-1 h-[11px] w-[10px]"
                  alt=""
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 w-full  font-sfpro text-[18px] font-medium text-[#F8F8F8]/[0.8]">
        If you’re convinced, let's get you started on this journey
      </div>
      <div className="w-full">
        <form
          className="relative z-20 flex flex-col items-end w-full "
          onSubmit={handleSubmit}
        >
          <div className="w-full py-3 pt-0 mt-3 rounded-lg">
            <input
              style={{ borderColor: 'rgb(155, 161, 233)' }}
              className="textbox "
              type="text"
              placeholder="Tell us your name"
              required
              value={referreeName}
              onChange={(e) => setRefereeName(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={referreeName === ''}
            style={{
              backgroundColor:
                referreeName !== ''
                  ? ' rgb(126,135,239)'
                  : 'rgba(0, 0, 0, 0.4)',
              color: referreeName === '' ? 'rgba(61, 61, 61)' : 'black',
            }}
            onClick={() =>
              window.open(
                'https://calendly.com/rishisolanki1995/30mincallwithrishi',
                '_blank',
              )
            }
            className="relative z-30 mt-[30px] flex h-[46px] w-full items-center justify-center gap-1 rounded-lg bg-custompurple p-1 font-sfpro text-lg  leading-8 text-black"
          >
            Book an intro call
          </button>
          {/* <button
            type="submit"
            disabled={!stepCount}
            style={{
              backgroundColor: stepCount ? '#5ECC7B' : 'rgba(61, 61, 61, 0.3)',
              color: stepCount ? 'black' : '#b1b1b1',
            }}
            className="h-[30px] rounded px-2 font-medium"
          >
            Done
          </button> */}
        </form>
      </div>
    </div>
  );
};

export default ReferralUser;
