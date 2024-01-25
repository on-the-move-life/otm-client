import React from 'react';

const ListItem = (paymentData) => {
  const { amount, paymentDate, membershipStartDate, membershipEndDate } =
    paymentData;
  return (
    <div className="my-2 flex flex-row justify-between">
      <div class="bg-neutral-600 h-4 w-4 rounded-full"></div>
      <div className="text-neutral-600">8 Mar 23</div>
      <div className="text-neutral-600">₹5,000</div>
      <div className="flex flex-col">
        <span className="text-green-400 ">
          21 Jan 24
          <br />
        </span>
        <span className="text-rose-500 ">21 Apr 24</span>
      </div>
      <img src='/assets/link-external.svg' />
    </div>
  );
};

export default ListItem;
