import React, { useEffect, useState } from 'react';
import { HiX } from 'react-icons/hi';
import { useAuth } from '../../contexts/AuthContext';
import { PaymentList } from '../Profile';
import { Loader } from '../../components';
import { formatPaymentData } from '../../utils';
import { axiosClient } from './apiClient';

const PaymentHistory = ({ onClose }) => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { getUserFromStorage } = useAuth();

  useEffect(() => {
    const user = getUserFromStorage();
    console.log(user);
    if (user && user.code) {
      getPaymentHistory(user.code);
    }
  }, []);

  async function getPaymentHistory(code) {
    try {
      const res = await axiosClient.get(`/payment/history`, {
        params: { code: code },
      });

      if (res.data) {
        const data = res.data;
        const paymentHistory = await formatPaymentData(data);
        setPaymentHistory(paymentHistory);
      }
    } catch (error) {
      console.error('Error fetching payment history:', error);
    } finally {
      setIsLoading(false);
    }
  }

  // Show loading state if user is still being fetched
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-neutral-900 h-screen w-screen rounded-xl border border-red bg-[#141414] p-4">
      <div
        className="flex justify-end"
        onClick={() => onClose()}
      >
        <span className="rounded-full bg-[#1F1F1F] p-1">
          <HiX size={15} />
        </span>
      </div>
      <div className="h-full border border-yellow">
        <div className="text-neutral-400 px-auto my-2 flex items-center justify-center border border-red text-3xl font-medium leading-10">
          Payment History
        </div>

        {paymentHistory &&
        paymentHistory.length !== undefined &&
        paymentHistory.length !== 0 ? (
          <PaymentList data={paymentHistory} />
        ) : (
          <div className="flex h-full items-center justify-center border border-red">
            <h2>No History Yet ! </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
