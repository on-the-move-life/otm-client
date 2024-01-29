import React, { useEffect } from 'react';

const ProfileHome = ({ showHistory }) => {
  return (
    <div className="h-screen w-screen overflow-x-auto pb-20">
      <div className="profile-heading ml-4 mt-4 text-3xl font-medium leading-10">
        Profile
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="mt-6 flex flex-col items-center justify-center">
          <img
            src="/assets/profile-temp.png"
            className=" w-auto rounded-full bg-green"
          />
          <div className="text-neutral-400 text-xl font-medium capitalize leading-loose">
            Rishi Solanki
          </div>
          <div className="flex w-40 flex-row items-center justify-between">
            <div className="profile-program-pw inline-flex h-5 items-center justify-center gap-0.5 rounded border px-2 py-0.5 text-xs text-black">
              <img src="/assets/star.svg" />
              {/* Perfect Week */}
            </div>
            <div className="inline-flex h-5 w-10 items-center justify-center rounded bg-indigo-400 px-2 py-0.5">
              <div className=" text-xs capitalize text-black ">Elite</div>
            </div>
          </div>
        </div>
        <div className="profile-program-box mx-auto mt-8 h-64 w-[358px] rounded-xl border border-white p-4">
          <div className="profile-program-heading text-3xl font-medium leading-10">
            Shred
          </div>
          <div className="text-[8px] uppercase tracking-[3px] text-lightGray">
            lighter & agile
          </div>
          <div className="bg-neutral-700 border-neutral-600 mt-2 inline-flex h-5 items-center justify-center gap-0.5 rounded border bg-opacity-5 px-2 py-0.5 backdrop-blur-[34px]">
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
            <div className="inline-flex h-10 w-[334px] items-center justify-center gap-2.5 rounded-lg bg-white p-2.5">
              <div className="text-lg font-medium text-black">Pay now</div>
            </div>
            <div
              className="border-zinc-400 mt-4 inline-flex h-10 w-[334px] items-center justify-center gap-2.5 rounded-lg border p-2.5 "
              onClick={() => showHistory()}
            >
              <div className="text-lg font-medium text-white">
                Check payment history{' '}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col pt-52">
          <div className="bg-neutral-700 border-zinc-400 mx-auto inline-flex h-12 w-[358px] items-center justify-center gap-2.5 rounded-lg border bg-opacity-5 p-2.5 ">
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
