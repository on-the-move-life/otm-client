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
    // if (!user) {
    //   console.error('User is null. Handle this case accordingly.');
    //   setIsLoading(false);
    //   return;
    // }

    // Fetch payment history only when user is available
    getPaymentHistory();
  }, []); // Dependency on user to trigger when user changes

  useEffect(() => {
    getUserFromStorage();
  }, []);

  async function getPaymentHistory() {
    try {
      const res = await axios.get(
        `${
          process.env.REACT_APP_BACKEND_BASE_URL
        }/api/v1/profile/payment/history?code=CHAN&withFormat=${true}`,
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
        <span className="rounded-full bg-[#5E5E5E] p-1">
          <HiX size={15} />
        </span>
      </div>
      <div>
        <div className="text-neutral-400 px-auto my-2 flex items-center justify-center text-3xl font-medium leading-10">
          Payment History
        </div>
        <div className="text-lightGray flex flex-row justify-between px-4 uppercase tracking-[3px] text-lightGray text-opacity-20">
          <span className="w-8"></span>
          <span className=" w-20 text-[8px]">Date</span>
          <span className=" w-20 text-[8px]">Amount</span>
          <span className=" w-20 text-[8px]">
            Membership Duration
          </span>
        </div>
        {paymentHistory && paymentHistory.length !== 0 && (
          <List data={paymentHistory} />
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
