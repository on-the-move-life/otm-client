import React from 'react';

const ListItem = ({ item }) => {
  const { amount, paymentDate, membershipStartDate, membershipEndDate } = item;
  return (
    <div className="my-2 flex flex-row justify-between text-sm p-3">
      <div className="bg-neutral-600 h-4 w-4 rounded-full pt-1">
        <img src="/assets/pay-history-dot.svg" />
      </div>
      <div className="text-neutral-600">{paymentDate}</div>
      <div className="text-neutral-600">₹{amount}</div>
      <div className="flex flex-col">
        <span className="text-green">
          {membershipStartDate}
          <br />
        </span>
        <span className="text-red">{membershipEndDate}</span>
      </div>

      <div className="bg-neutral-600 h-4 w-4 rounded-full pt-1">
        <img src="/assets/link-external.svg" />
      </div>
    </div>
  );
};

export default ListItem;
