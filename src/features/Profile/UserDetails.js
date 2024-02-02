import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Loader } from '../../components';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils';
import { axiosClient } from './apiClient';
import { FaUser } from 'react-icons/fa';
import { HiArrowNarrowLeft } from 'react-icons/hi';


const UserDetails = ({ showHistory }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [memberData, setMemberData] = useState();

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

  return (
    <>
      {memberData && (
        <div className="h-screen w-screen overflow-x-auto pt-8 px-4 pb-32">
        <div className='mb-4'>
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
          <div className="flex flex-col items-center justify-center">
            <div className="mt-6 flex flex-col items-center justify-center">
              <FaUser size={30} />
              <div className="text-neutral-400 text-xl font-medium capitalize leading-loose">
                {memberData.name}
              </div>
              {/* <div className="flex w-auto flex-row items-center justify-between ">
                <div className="perfect-week mr-2 inline-flex h-5 items-center justify-center gap-0.5 rounded border px-2 py-0.5 text-xs text-black">
                  <img src="/assets/star.svg" alt=''/>
                </div>

              </div> */}
              <div className="inline-flex h-5 w-auto items-center justify-center rounded bg-indigo-400 px-2 py-0.5">
                <div className="text-xs font-bold capitalize text-black">
                  {memberData.intensity > 100 ? 'Elite' : 'Advanced'}
                </div>
              </div>
            </div>
            <div className="profile-program-box mx-auto mt-8 h-64 w-full rounded-xl  p-4">
              <div className=" flex h-full flex-col justify-around">
                <section>
                  <div className="workout-gradient-text text-3xl font-medium leading-10">
                    Shred
                  </div>
                  {/* <div className="text-[8px] uppercase tracking-[3px] text-lightGray">
                    lighter & agile
                  </div> */}
                  {/* <div className="bg-neutral-700 border-neutral-600 mt-2 inline-flex h-5 items-center justify-center gap-0.5 rounded border bg-opacity-5 px-2 py-0.5 backdrop-blur-[34px]">
            <div className="text-neutral-400 text-xs capitalize">
              ₹5,000 renewed monthly
            </div>
          </div> */}
                  <div className="pt-2 ">
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
            <div className="flex flex-col pt-52" onClick={handleLogout}>
              <div className="bg-neutral-700 border-zinc-400 mx-auto inline-flex h-12 w-[358px] items-center justify-center gap-2.5 rounded-lg border bg-opacity-5 p-2.5">
                <div className="relative h-5 w-5 origin-top-left">
                  <img src="./assets/logout.svg" alt="" />
                </div>
                <div className="text-lg font-medium text-lightGray">
                  Log Out
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserDetails;
