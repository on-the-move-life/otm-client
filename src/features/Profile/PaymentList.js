import React from 'react';
import { PaymentListItem } from '../Profile';

const PaymentList = ({ data }) => {
  return (
    <>
      <div className="mt-12  flex flex-row items-start justify-between text-[8px] uppercase tracking-[3px] ">
        <span className="w-2"></span>
        <span className="w-12 px-2">Date</span>
        <span className="w-12 px-2">Amount</span>
        <span className="w-12">Membership Duration</span>
        <span className="w-8"></span>
      </div>

      {data.map((d, index) => (
        <PaymentListItem key={index} item={d} />
      ))}
    </>
  );
};

export default PaymentList;
