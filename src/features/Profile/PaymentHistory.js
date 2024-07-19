import React, { useEffect, useState } from 'react';
import { HiX } from 'react-icons/hi';
import { useAuth } from '../../contexts/AuthContext';
import { Loader } from '../../components';
import { formatPaymentData } from '../../utils';
import { axiosClient } from './apiProfileClient';
import AnimatedComponent from '../../components/AnimatedComponent';
import PaymentList from './PaymentList';

const PaymentHistory = ({ onClose }) => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { getUserFromStorage } = useAuth();

  useEffect(() => {
    const user = getUserFromStorage();
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
    <AnimatedComponent>
      <div className="bg-neutral-900 flex h-screen w-screen flex-col bg-[#141414] p-4">
        <div className="flex justify-end" onClick={() => onClose()}>
          <span className="rounded-full bg-[#1F1F1F] p-1">
            <HiX size={20} />
          </span>
        </div>
        <h1 className="flex items-center justify-center my-2 text-3xl font-medium leading-10 text-neutral-400 px-auto">
          Payment History
        </h1>
        <div className="items-center justify-center grow">
          {paymentHistory && paymentHistory.length !== 0 ? (
            <PaymentList data={paymentHistory} />
          ) : (
            <h2 className="text-2xl text-green">No History Yet </h2>
          )}
        </div>
      </div>
    </AnimatedComponent>
  );
};

export default PaymentHistory;
