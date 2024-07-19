import React from 'react';
import PaymentListItem from './PaymentListItem';

const PaymentList = ({ data }) => {
  return (
    <>
      <div className="mt-12  flex flex-row items-start justify-center gap-2 text-[8px] uppercase tracking-[3px] ">
        <span className="basis-1/6"></span>
        <span className="pl-6 basis-2/6">Date</span>
        <span className="pl-4 basis-2/6">Amount</span>
        <span className="basis-1/6">Membership Duration</span>
        {/* <span className="w-8"></span> */}
      </div>

      {data.map((d, index) => (
        <PaymentListItem key={index} item={d} />
      ))}
    </>
  );
};

export default PaymentList;
