import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { HiX } from 'react-icons/hi';
import { useAuth } from '../../contexts/AuthContext';
import List from './List';
import { Loader } from '../../components';

const PaymentHistory = ({ onClose }) => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { getUserFromStorage } = useAuth();

  useEffect(() => {
    const user= getUserFromStorage();
    console.log(user)
    getPaymentHistory(user)
  }, []);

  async function getPaymentHistory(user) {
    try {
      const res = await axios.get(
        `${
          process.env.REACT_APP_INSIGHT_SERVICE_BASE_URL_LOCAL
        }/client/payment/history?code=${user.code}&withFormat=${true}`,
      );

      if (res.data) {
        const data = res.data;
        setPaymentHistory(data);
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
    <div className="bg-neutral-900 h-screen w-screen rounded-xl bg-[#141414] p-4">
      <div className="flex justify-end" onClick={() => onClose()}>
        <span className="rounded-full bg-[#1F1F1F] p-1">
          <HiX size={15} />
        </span>
      </div>
      <div>
        <div className="text-neutral-400 px-auto my-2 flex items-center justify-center text-3xl font-medium leading-10">
          Payment History
        </div>

        {paymentHistory && paymentHistory.length !== 0 && (
          <List data={paymentHistory} />
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
