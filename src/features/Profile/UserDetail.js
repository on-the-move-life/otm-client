import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import { Loader } from '../../components';
import { Link, useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils';
import { axiosClient } from './apiProfileClient';
import { FaUserCircle } from 'react-icons/fa';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { BsImageFill } from 'react-icons/bs';
import { IoMdTrash } from 'react-icons/io';
import { IoCamera } from 'react-icons/io5';
import { Error } from '../../components';
import ProfilePicture from './ProfilePicture';
import axios from 'axios';
import AnimatedComponent from '../../components/AnimatedComponent';
import { motion } from 'framer-motion';
import MoveCoins from './MoveCoins';
import MonthlyWrapped from './MonthlyWrapped';
import { CoinsIndicator, Movecoins } from '../Marketplace';
import { Name } from '../LifestyleQuiz';

const ProfilePicHeading = styled.div`
  color: #d7d7d7;
  text-shadow: 0px 2.725px 2.725px rgba(0, 0, 0, 0.15);
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 20px;
  font-style: normal;
  line-height: 29.066px; /* 160% */
  text-transform: capitalize;
  letter-spacing: 1px;
`;
const IconLabel = styled.div`
  color: #d7d7d7;
  text-shadow: 0px 2.725px 2.725px rgba(0, 0, 0, 0.15);
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 15px;
  font-style: normal;
  line-height: 29.066px; /* 160% */
  text-transform: capitalize;
  letter-spacing: 1px;
`;

const UserDetails = ({ showHistory }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [memberData, setMemberData] = useState();
  const profilePicRef = useRef(null);
  const profilePicCameraRef = useRef(null);
  const [showProfilePicPopup, setShowProfilePicPopup] = useState(false);
  // state to store the chosen profile pic
  const [chosenPic, setChosenPic] = useState(null);
  // state to store the file object to send to the server
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [uniqueImageURLKey, setUniqueImageURLKey] = useState(null);
  const [profilePicError, setProfilePicError] = useState(false);
  const currentDate = new Date().getDate();

  const navigate = useNavigate();

  const { getUserFromStorage, logout } = useAuth();

  useEffect(() => {
    const user = getUserFromStorage();
    if (user) {
      getMemberData(user);
    }
  }, []);

  const showElite =
    memberData && parseInt(memberData.avgIntensity) > 10 ? true : false;

  async function getMemberData(user) {
    try {
      const res = await axiosClient.get(`/profile`, {
        params: { code: user.code },
      });

      if (res.data) {
        const data = res.data;
        // Trick to avoid the memory caching by the browser, so that the updated profile pic is displayed
        const uniqueKey = Date.now();
        setUniqueImageURLKey(`${data?.profilePicture}?key=${uniqueKey}`);
        setMemberData({ ...data, ...user });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleLogout() {
    navigate('/login', { replace: true });
    logout();
  }

  if (isLoading) {
    return <Loader />;
  }

  function handlePicChange(e) {
    const file = e.target.files[0];
    if (file) {
      setProfilePicFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setChosenPic(reader.result);
      };
      reader.readAsDataURL(file);
      e.target.value = null;
      setShowProfilePicPopup(false);
      const formData = new FormData();
      formData.append('profilePicture', file);
      formData.append('email', JSON.parse(localStorage.getItem('user')).email);
      axios
        .post(
          `${process.env.REACT_APP_INSIGHT_SERVICE_BASE_URL}/client/profile-picture`,
          formData,
        )
        .then((res) => {
          console.log('profile picture updated!');
        })
        .catch((err) => {
          console.log(err);
          setProfilePicError(true);
        });
    }
  }

  function handlePicDelete() {
    setChosenPic(null);
    setProfilePicFile(null); // reset the file object
    setShowProfilePicPopup(false); // close the popup after deleting the pic
    const email = JSON.parse(localStorage.getItem('user'))?.email;
    axiosClient
      .delete('/profile-picture', {
        data: {
          email: email,
        },
      })
      .then((res) => {
        console.log('profile picture deleted!');
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        setProfilePicError(true);
      });
  }

  const modalVariants = {
    hidden: {
      opacity: 0,
      y: '100%',
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'tween',
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <>
      {/* profile pic update popup */}
      {showProfilePicPopup && (
        <motion.div
          className="from-gray-500/30 to-gray-900/60 fixed bottom-0 left-0 z-50 h-[200px] w-full rounded-t-[30px] bg-gradient-to-r p-5 backdrop-blur-lg"
          initial="hidden"
          animate={showProfilePicPopup ? 'visible' : 'hidden'}
          variants={modalVariants}
        >
          <button
            className="absolute left-[47%] top-0 cursor-pointer"
            onClick={() => setShowProfilePicPopup(false)}
          >
            <MdOutlineKeyboardArrowDown size={30} color="#D7D7D7" />
          </button>
          <div className="flex flex-col items-start justify-around w-full h-full mt-3 ">
            <ProfilePicHeading>Profile photo</ProfilePicHeading>
            <div className="flex w-full flex-row items-center justify-start gap-[40px]">
              <div
                className="flex flex-col items-center justify-center gap-1 w-fit"
                onClick={() => profilePicCameraRef.current.click()}
              >
                <button className="border-gray-500 cursor-pointer rounded-full border-[0.5px] p-3">
                  <IoCamera size={30} color="#5ECC7B" />
                </button>
                <IconLabel>Camera</IconLabel>
              </div>
              <div
                className="flex flex-col items-center justify-center gap-1 w-fit"
                onClick={() => profilePicRef.current.click()}
              >
                <button className="border-gray-500 cursor-pointer rounded-full border-[0.5px] p-3">
                  <BsImageFill size={30} color="#5ECC7B" />
                </button>
                <IconLabel>Gallery</IconLabel>
              </div>
              <div
                className="flex flex-col items-center justify-center gap-1 w-fit"
                onClick={handlePicDelete}
              >
                <button className="border-gray-500 cursor-pointer rounded-full border-[0.5px] p-3">
                  <IoMdTrash size={30} color="gray" />
                </button>
                <IconLabel>Delete</IconLabel>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      <AnimatedComponent>
        {memberData && (
          <div>
            <img
              className="absolute left-0 right-0 -z-20"
              src="/assets/main-frame-large.svg"
              style={{
                width: '100%',

                maxWidth: '-webkit-fill-available',
              }}
            />
            <div className="w-screen grow overflow-scroll px-4 pb-[78px] pt-8">
              {profilePicError && (
                <div className="fixed top-0 z-50 w-full h-full bg-black">
                  <Error>Oops! Something went wrong...</Error>
                </div>
              )}
              {/* <div className="mb-4">
            <HiArrowNarrowLeft
              size={20}
              onClick={() => {
                navigate('/home');
              }}
            />
          </div> */}

              {/* User Profile Pic and Name */}
              <div className="mt-[60px] flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center gap-5 mt-6">
                  <div className="relative h-[136px] w-[136px] rounded-full">
                    {chosenPic ? (
                      <ProfilePicture
                        inputPic={chosenPic}
                        altText={'profile picture'}
                        height={'136px'}
                        width={'136px'}
                      />
                    ) : memberData && memberData?.profilePicture ? (
                      <ProfilePicture
                        inputPic={uniqueImageURLKey}
                        altText={'profile picture'}
                        height={'136px'}
                        width={'136px'}
                      />
                    ) : (
                      <FaUserCircle size={136} color={'#91BDF6'} />
                    )}
                    <button
                      className="absolute bottom-0 right-0 flex h-[30px] w-[30px] flex-row items-center justify-center rounded-full bg-green"
                      onClick={() => {
                        setShowProfilePicPopup(true);
                      }}
                    >
                      <IoCamera size={20} color="black" />
                    </button>
                    <input
                      ref={profilePicRef}
                      type="file"
                      accept="image/png, image/jpg, image/jpeg"
                      name="profile image"
                      hidden
                      onInput={handlePicChange}
                    ></input>
                    <input
                      ref={profilePicCameraRef}
                      type="file"
                      capture="user"
                      accept="image/png, image/jpg, image/jpeg"
                      name="profile image camera"
                      hidden
                      onInput={handlePicChange}
                    ></input>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="text-[32px] font-medium capitalize text-offwhite">
                      {memberData.name}
                    </div>
                    <div>
                      {memberData.avgIntensity > 10 && (
                        <span
                          className={`mx-2 rounded  ${
                            showElite ? 'bg-[#7E87EF]' : 'bg-[#7CDCF6]'
                          } px-2  py-0.5 text-[13px] font-extrabold text-black`}
                        >
                          {showElite ? 'Elite' : 'Advanced'}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* <div className="flex flex-row items-center justify-between w-auto ">
                <div className="perfect-week mr-2 inline-flex h-5 items-center justify-center gap-0.5 rounded border px-2 py-0.5 text-xs text-black">
                  <img src="/assets/star.svg" alt=''/>
                </div>

              </div> */}
                  {/* <div className="inline-flex h-5 w-auto items-center justify-center rounded bg-indigo-400 px-2 py-0.5">
                <div className="text-xs font-bold text-black capitalize">
                  {memberData.intensity > 100 ? 'Elite' : 'Advanced'}
                </div>
              </div> */}
                </div>

                <p className="text-center align-middle text-[14px]  text-darkTextGray">
                  Fitness is not a destination. It's a journey of self
                  improvement, one workout at a time.
                </p>

                <div
                  className="w-full px-4 py-3 mx-auto mt-8 max-h-max rounded-xl bg-mediumGray"
                  onClick={() => setShowProfilePicPopup(false)}
                >
                  <div className="flex flex-col h-full ">
                    <section>
                      {/* <div className="text-sm font-medium">Your Plan</div> */}
                      <div className="text-2xl font-medium leading-10 text-floYellow">
                        Membership
                      </div>
                      {/* <div className="text-[8px]  tracking-[5px] text-lightGray ">
                      LIGHTER & AGILE
                    </div> */}
                      <div
                        className="flex flex-col pt-2"
                        onClick={() => setShowProfilePicPopup(false)}
                      >
                        {/* <div className="bg-neutral-700 inline-flex h-5 max-w-max items-center justify-center gap-0.5 rounded border border-lightGray bg-opacity-5 px-2 py-0.5 backdrop-blur-[34px]">
                        <div className="text-xs capitalize text-offwhite">
                          ₹5,000 Renewed Monthly
                        </div>
                      </div> */}
                        {memberData.isPaymentDue ? (
                          <div className=" inline-flex h-5 max-w-max items-center justify-center gap-0.5 rounded bg-red bg-opacity-70 px-2 py-0.5">
                            <div className="relative w-3 h-3">
                              <img src="/assets/alert-triangle.svg" alt="" />
                            </div>
                            <div className="text-xs text-black capitalize">
                              Overdue
                            </div>
                          </div>
                        ) : (
                          <div className="bg-neutral-700  inline-flex h-5 max-w-max items-center justify-center gap-0.5 rounded border border-green bg-opacity-5 px-2 py-0.5 backdrop-blur-[34px]">
                            <ul className="pl-3 list-disc">
                              <li className="text-xs capitalize text-green">
                                Next payment due on{' '}
                                {formatDate(memberData?.paymentDueDate, false)}
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </section>
                    <section className="flex flex-col items-center ">
                      {/* <div className="inline-flex h-10 w-[334px] items-center justify-center gap-2.5 rounded-lg bg-white p-2.5">
                  <div className="text-lg font-medium text-black">Pay now</div>
                </div> */}

                      {/* <button className="mt-[10px] flex h-[46px] w-full items-center justify-center gap-1 rounded-lg bg-custompurple p-1 font-sfpro text-lg font-medium leading-8 text-black">
                      Make Payment
                    </button> */}
                      <div
                        className="border-zinc-400 mt-6 inline-flex h-[46px] w-full items-center justify-center gap-2.5 rounded-lg border p-2.5"
                        onClick={() => showHistory()}
                      >
                        <button className="mt-[2px] text-lg font-medium text-white">
                          Check payment history
                        </button>
                      </div>
                    </section>
                  </div>
                </div>

                <AnimatedComponent>
                  <Link
                    to="/marketplace"
                    className="my-2 flex min-h-[190px] w-full flex-col items-center justify-start rounded-[12px]  bg-mediumGray "
                  >
                    <div
                      className="flex h-[80px] w-full flex-col items-start justify-center bg-right-top bg-no-repeat px-3 py-2"
                      style={{
                        backgroundImage: `url(${'/assets/Marketplace_bgcoins.svg'})`,
                      }}
                    >
                      <div>Marketplace </div>
                      <Movecoins
                        fontSize={'26px'}
                        coins={memberData.moveCoins}
                      />
                    </div>
                    <div className="w-full mt-2">
                      <CoinsIndicator
                        coins={memberData.moveCoins}
                        offers={memberData.offers}
                      />
                    </div>
                  </Link>
                </AnimatedComponent>

                {/* <MoveCoins coins={0} /> */}

                {currentDate > 5 && (
                  <section className="flex flex-row items-center justify-center w-full gap-3 mt-1">
                    <MonthlyWrapped />
                  </section>
                )}
                <div
                  className=" mx-auto mt-1 min-h-[142px] w-full rounded-xl bg-mediumGray px-4 py-3"
                  onClick={() => setShowProfilePicPopup(false)}
                >
                  <div className="flex flex-col justify-between h-full ">
                    <section>
                      <div className="text-sm font-medium text-white font-sfpro ">
                        Book a Call
                      </div>
                      <div
                        className="pt-1 "
                        onClick={() => setShowProfilePicPopup(false)}
                      >
                        <div className="font-sfpro text-[14px] font-medium  text-white">
                          <p>
                            Easily schedule a one-on-one call with your coach
                            for personalised guidance and mentoring.
                          </p>
                        </div>
                      </div>
                    </section>
                    <section className="flex flex-col items-center ">
                      <div
                        className=" mt-4 inline-flex h-10 w-full items-center justify-center gap-2.5 rounded-lg  "
                        onClick={() =>
                          window.open(
                            'https://calendly.com/rishisolanki1995/1-on-1-call-with-your-coach',
                            '_blank',
                          )
                        }
                      >
                        <button className="flex h-[46px] w-full items-center justify-center gap-1 rounded-lg bg-custompurple p-1 font-sfpro text-lg font-medium leading-8 text-black">
                          Book Now
                        </button>
                      </div>
                    </section>
                  </div>
                </div>

                <div
                  className="flex flex-col w-full mt-8"
                  onClick={() => {
                    setShowProfilePicPopup(false);
                    handleLogout();
                  }}
                >
                  <div className="bg-neutral-700 border-zinc-400 mx-auto inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-lg border bg-opacity-5 p-2.5">
                    <div className="relative w-5 h-5 origin-top-left">
                      <img src="./assets/logout.svg" alt="" />
                    </div>
                    <div className="text-lg font-medium text-lightGray">
                      <button className="text-lg font-medium text-lightGray">
                        Log Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </AnimatedComponent>
    </>
  );
};

export default UserDetails;
