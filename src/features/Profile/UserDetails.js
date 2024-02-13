import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import { Loader } from '../../components';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils';
import { axiosClient } from './apiClient';
import { FaUserCircle } from 'react-icons/fa';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { BsImageFill } from "react-icons/bs";
import { IoMdTrash } from "react-icons/io";
import { IoCamera } from "react-icons/io5";
import axios from 'axios';

const ProfilePicHeading = styled.div`
color: #D7D7D7;
text-shadow: 0px 2.725px 2.725px rgba(0, 0, 0, 0.15);
font-family: -apple-system, BlinkMacSystemFont, sans-serif;
font-size: 20px;
font-style: normal;
line-height: 29.066px; /* 160% */
text-transform: capitalize;
letter-spacing: 1px;
`
const IconLabel = styled.div`
color: #D7D7D7;
text-shadow: 0px 2.725px 2.725px rgba(0, 0, 0, 0.15);
font-family: -apple-system, BlinkMacSystemFont, sans-serif;
font-size: 15px;
font-style: normal;
line-height: 29.066px; /* 160% */
text-transform: capitalize;
letter-spacing: 1px;
`

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

  const navigate = useNavigate();

  const { getUserFromStorage, logout } = useAuth();

  useEffect(() => {
    const user = getUserFromStorage();
    if (user) {
      getMemberData(user);
    }
  }, []);

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
        .post(`${process.env.REACT_APP_INSIGHT_SERVICE_BASE_URL}/client/profile-picture`, formData)
        .then(res => {
          console.log(res)
        })
    }
  }

  function handlePicDelete() {
    setChosenPic(null);
    setProfilePicFile(null); // reset the file object
    setShowProfilePicPopup(false); // close the popup after deleting the pic
    const formData = new FormData();
    formData.append('email', JSON.parse(localStorage.getItem('user')).email);
    axios
      .delete(`${process.env.REACT_APP_INSIGHT_SERVICE_BASE_URL}/client/profile-picture`, formData)
      .then(res => {
        console.log(res)
        window.location.reload();
      })
  }

  return (
    <>
      {/* profile pic update popup */}
      {showProfilePicPopup && <div className='w-full h-[200px] rounded-t-[30px] bg-gradient-to-r from-gray-500/30 to-gray-900/60 backdrop-blur-lg fixed bottom-0 left-0 z-50 p-5'>
        <button className='absolute top-0 left-[47%] cursor-pointer' onClick={() => {
          setShowProfilePicPopup(false);
        }}>
          <MdOutlineKeyboardArrowDown size={30} color='#D7D7D7' />
        </button>
        <div className='w-full flex flex-col items-start justify-around h-full mt-3 '>
          <ProfilePicHeading>Profile photo</ProfilePicHeading>
          <div className='w-full flex flex-row justify-start gap-[40px] items-ceter'>
            <div className='w-fit flex flex-col justify-center items-center gap-1' onClick={() => {
              profilePicCameraRef.current.click();
            }}>
              <button className='border-gray-500 border-[0.5px] rounded-full p-3 cursor-pointer'>
                <IoCamera size={30} color='#5ECC7B' />
              </button>
              <IconLabel>Camera</IconLabel>
            </div>
            <div className='w-fit flex flex-col justify-center items-center gap-1' onClick={() => {
              profilePicRef.current.click();
            }}>
              <button className='border-gray-500 border-[0.5px] rounded-full p-3 cursor-pointer'>
                <BsImageFill size={30} color='#5ECC7B' />
              </button>
              <IconLabel>Gallery</IconLabel>
            </div>
            <div className='w-fit flex flex-col justify-center items-center gap-1' onClick={handlePicDelete}>
              <button className='border-gray-500 border-[0.5px] rounded-full p-3 cursor-pointer'>
                <IoMdTrash size={30} color='gray' />
              </button>
              <IconLabel>Delete</IconLabel>
            </div>
          </div>
        </div>
      </div>}
      {memberData && (
        <div className="h-screen w-screen overflow-x-auto px-4 pb-32 pt-8">
          <div className="mb-4">
            <HiArrowNarrowLeft
              size={20}
              onClick={() => {
                navigate('/home');
              }}
            />
          </div>
          <h1 className="inline-block bg-gradient-to-r from-[#9BF2C0] to-[#91BDF6] bg-clip-text text-3xl font-semibold text-transparent">
            My Profile
          </h1>

          {/* User Profile Pic and Name */}

          {/* User Profile Pic and Name */}
          <div className="flex flex-col items-center justify-center">
            <div className="mt-6 flex flex-col items-center justify-center gap-1">
              <div className='w-[100px] h-[100px] rounded-full relative'>
                {chosenPic ?
                  <img src={chosenPic} alt="user Profile pic" className='w-[100px] h-[100px] rounded-full object-cover' /> :
                  memberData && memberData?.profilePicture ?
                    <img src={uniqueImageURLKey} alt="user Profile pic" className='w-[100px] h-[100px] rounded-full object-cover' /> :
                    <FaUserCircle size={100} color={'#91BDF6'} />}
                <button className='w-[40px] h-[40px] flex flex-row justify-center items-center rounded-full bg-green absolute bottom-0 right-0' onClick={() => {
                  setShowProfilePicPopup(true);
                }}>
                  <IoCamera size={25} color="black" />
                </button>
                <input ref={profilePicRef} type='file' accept='image/png, image/jpg, image/jpeg' name="profile image" hidden onInput={handlePicChange}></input>
                <input ref={profilePicCameraRef} type='file' capture="user" accept='image/png, image/jpg, image/jpeg' name="profile image camera" hidden onInput={handlePicChange}></input>
              </div>
              <div className="text-neutral-400 text-xl font-medium capitalize leading-loose">
                {memberData.name}
              </div>
              {/* <div className="flex w-auto flex-row items-center justify-between ">
                <div className="perfect-week mr-2 inline-flex h-5 items-center justify-center gap-0.5 rounded border px-2 py-0.5 text-xs text-black">
                  <img src="/assets/star.svg" alt=''/>
                </div>

              </div> */}
              {/* <div className="inline-flex h-5 w-auto items-center justify-center rounded bg-indigo-400 px-2 py-0.5">
                <div className="text-xs font-bold capitalize text-black">
                  {memberData.intensity > 100 ? 'Elite' : 'Advanced'}
                </div>
              </div> */}
            </div>
            <div className="profile-program-box mx-auto mt-8 h-64 w-full rounded-xl  p-4" onClick={() => setShowProfilePicPopup(false)}>
              <div className=" flex h-full flex-col justify-around">
                <section>
                  <div className="workout-gradient-text text-3xl font-medium leading-10">
                    Membership
                  </div>
                  <div className="pt-2 " onClick={() => setShowProfilePicPopup(false)}>
                    {memberData.isPaymentDue ? (
                      <div className="inline-flex h-5 w-20 items-center justify-center gap-0.5 rounded bg-red bg-opacity-70 px-2 py-0.5">
                        <div className="relative h-3 w-3">
                          <img src="/assets/alert-triangle.svg" alt="" />
                        </div>
                        <div className="text-xs capitalize text-black">
                          Overdue
                        </div>
                      </div>
                    ) : (
                      <div className="bg-neutral-700 border-green-400 inline-flex h-5 items-center justify-center gap-0.5 rounded border bg-opacity-5 px-2 py-0.5 backdrop-blur-[34px]">
                        <ul className="list-disc pl-3">
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
                  <div className="border-zinc-400 mt-4 inline-flex h-10 w-[334px] items-center justify-center gap-2.5 rounded-lg border p-2.5">
                    <button
                      className="text-lg font-medium text-white"
                      onClick={() => showHistory()}
                    >
                      Check payment history
                    </button>
                  </div>
                </section>
              </div>
            </div>
            <div className="flex flex-col pt-52" onClick={() => setShowProfilePicPopup(false)}>
              <div className="bg-neutral-700 border-zinc-400 mx-auto inline-flex h-12 w-[358px] items-center justify-center gap-2.5 rounded-lg border bg-opacity-5 p-2.5">
                <div className="relative h-5 w-5 origin-top-left">
                  <img src="./assets/logout.svg" alt="" />
                </div>
                <button className="text-lg font-medium text-lightGray" onClick={handleLogout}>
                <button className="text-lg font-medium text-lightGray" onClick={handleLogout}>
                  Log Out
                </button>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserDetails;
