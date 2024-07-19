import React from 'react';

const PaymentListItem = ({ item }) => {
  const { amount, paymentDate, membershipStartDate, membershipEndDate } = item;
  return (
    <div className="flex flex-row justify-between p-3 my-2 text-xs text-center ">
      <div className="w-4 h-4 pt-1 rounded-full bg-neutral-600">
        <img src="/assets/pay-history-dot.svg" alt="" />
      </div>
      <div className="w-1/5 text-center text-lightGray">{paymentDate}</div>
      <div className="w-1/5 text-lightGray">₹{amount}</div>
      <div className="flex flex-col w-1/5 ">
        <span className="text-green">
          {membershipStartDate}
          <br />
        </span>
        <span className="text-red">{membershipEndDate}</span>
      </div>

      {/* <div className="w-4 h-4 pt-1 bg-neutral-600">
        <img src="/assets/link-external.svg" alt='' />
      </div> */}
    </div>
  );
};

export default PaymentListItem;
