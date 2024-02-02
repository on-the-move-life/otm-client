import React from 'react';

const PaymentListItem = ({ item }) => {
  const { amount, paymentDate, membershipStartDate, membershipEndDate } = item;
  return (
    <div className="text-center  my-2 flex flex-row justify-between text-xs p-3
    ">
      <div className="bg-neutral-600 h-4 w-4 rounded-full pt-1">
        <img src="/assets/pay-history-dot.svg" alt='' />
      </div>
      <div className="text-center w-1/5 text-lightGray">{paymentDate}</div>
      <div className=" w-1/5 text-lightGray">₹{amount}</div>
      <div className=" w-1/5 flex flex-col">
        <span className="text-green">
          {membershipStartDate}
          <br />
        </span>
        <span className="text-red">{membershipEndDate}</span>
      </div>

      {/* <div className=" bg-neutral-600 h-4 w-4 pt-1">
        <img src="/assets/link-external.svg" alt='' />
      </div> */}
    </div>
  );
};

export default PaymentListItem;
