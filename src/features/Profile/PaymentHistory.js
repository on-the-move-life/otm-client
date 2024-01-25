import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { HiX } from 'react-icons/hi';
import { useAuth } from '../../contexts/AuthContext';
import List from './List';

const PaymentHistory = () => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { getUserFromStorage, user } = useAuth();

  useEffect(() => {
    // Check if user is null
    if (!user) {
      console.error('User is null. Handle this case accordingly.');
      setIsLoading(false);
      return;
    }

    // Fetch payment history only when user is available
    getPaymentHistory();
  }, [user]); // Dependency on user to trigger when user changes

  useEffect(() => {
    getUserFromStorage();
  }, []);

  async function getPaymentHistory() {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/v1/profile/payment/history?code=CHAN&withFormat=${true}`,
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
    return <div>Loading...</div>;
  }

  return (
    <div className="payment-history h-[559px] w-[358px] rounded-3xl border border-white bg-opacity-30 p-4 backdrop-blur-[75px]">
      <div className="flex justify-end">
        <span className="rounded-full bg-[#202020] p-1">
          <HiX size={15} />
        </span>
      </div>
      <div>
        <div className="text-neutral-400 px-auto my-2 flex items-center justify-center text-3xl font-medium leading-10">
          Payment History
        </div>
        <div className="border-white-500 flex w-8 flex-row justify-between border px-4">
          <span className="border-red-500 w-[200px] border">Date</span>
          <span className="border-red-500 border">Amount</span>
          <span className="border-red-500 border">Membership Duration</span>
        </div>
        <List data={paymentHistory} />
      </div>
    </div>
  );
};

export default PaymentHistory;
