import React from 'react';

const PaymentListItem = ({ item }) => {
  const { amount, paymentDate, membershipStartDate, membershipEndDate } = item;
  return (
    <div className=" border border-white my-2 flex flex-row justify-between text-sm p-3
    ">
      <div className="bg-neutral-600 h-4 w-4 rounded-full pt-1">
        <img src="/assets/pay-history-dot.svg" />
      </div>
      <div className=" border border-white w-1/5 text-lightGray">{paymentDate}</div>
      <div className=" border border-white w-1/5 text-lightGray">₹{amount}</div>
      <div className=" border border-white w-1/5 flex flex-col">
        <span className="text-green">
          {membershipStartDate}
          <br />
        </span>
        <span className="text-red">{membershipEndDate}</span>
      </div>

      <div className=" border border-white  bg-neutral-600 h-4 w-4 rounded-full pt-1">
        <img src="/assets/link-external.svg" />
      </div>
    </div>
  );
};

export default PaymentListItem;
