import React, { useEffect } from 'react';

const ProfileHome = () => {
  useEffect(() => {}, []);

  return (
    <div className="pb-20">
      <div class="ml-4 mt-4 text-2xl font-medium leading-10 text-lightGray">
        Profile
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="mt-6 flex flex-col items-center justify-center">
          <img
            src="./assets/profile-temp.png"
            className=" w-auto rounded-full bg-green"
          />
          <div class="text-neutral-400 text-xl font-medium capitalize leading-loose">
            Rishi Solanki
          </div>
          <div className="flex w-40 flex-row items-center justify-between">
            <div class="to-yellow-600 border-stone-500 inline-flex h-[18px] items-center justify-center gap-0.5 rounded border bg-gradient-to-r from-orange-200 via-orange-300 px-2 py-0.5 text-xs text-black">
              Perfect Week
            </div>
            <div class="inline-flex h-5 w-10 items-center justify-center rounded bg-indigo-400 px-2 py-0.5">
              <div class=" text-xs capitalize text-black text-opacity-60">
                Elite
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-8 h-64 w-[358px] rounded-xl border border-white bg-[#5F5F5F] bg-opacity-30 p-4 backdrop-blur-[75px]">
          <div className="text-neutral-400 text-[32px] font-medium leading-10">
            Shred
          </div>
          <div className="text-neutral-600  text-[8px] uppercase tracking-[3px]">
            lighter & agile
          </div>
          <div className="bg-neutral-700 border-neutral-600 inline-flex h-5 items-center justify-center gap-0.5 rounded border bg-opacity-5 px-2 py-0.5 backdrop-blur-[34px]">
            <div className="text-neutral-400 text-xs capitalize">
              ₹5,000 renewed monthly
            </div>
          </div>
          <div className="bg-neutral-700 border-green-400 inline-flex h-5 items-center justify-center gap-0.5 rounded border bg-opacity-5 px-2 py-0.5 backdrop-blur-[34px]">
            <div className="text-xs capitalize text-green">
              Next payment due on 31 Jan 2024
            </div>
          </div>
          <div className="mt-6 flex flex-col items-center">
            <div className="my-2 inline-flex h-10 w-[334px] items-center justify-center rounded-lg bg-white bg-opacity-40 mix-blend-screen">
              <div className="text-neutral-400 text-lg font-medium">
                Make Payment
              </div>
            </div>
            <div className="bg-neutral-700 border-zinc-400 inline-flex h-10 w-[334px] items-center justify-center gap-2.5 rounded-lg border bg-opacity-5 p-2.5 backdrop-blur-xl">
              <div className="text-neutral-400 text-lg font-medium">
                Check payment history{' '}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col pt-52">
          <div className="bg-neutral-700 border-zinc-400 mx-auto inline-flex h-[41px] w-[358px] items-center justify-center gap-2.5 rounded-lg border bg-opacity-5 p-2.5 backdrop-blur-xl">
            <div className="relative h-5 w-5 origin-top-left">
              <img src="./assets/logout.svg" />
            </div>
            <div className="text-lg font-medium text-lightGray">Log Out</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHome;
