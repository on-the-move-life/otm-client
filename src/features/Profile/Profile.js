import React, { useState } from 'react';
import PaymentHistory from './PaymentHistory';
import UserDetails from './UserDetail';

const Profile = () => {
  const [showPaymentHistory, setShowPaymentHistory] = useState(false);

  const togglePaymentHistory = () => {
    setShowPaymentHistory((prevShowPaymentHistory) => !prevShowPaymentHistory);
  };

  return (
    <span className="flex items-center justify-center w-screen ">
      {!showPaymentHistory && (
        <UserDetails showHistory={togglePaymentHistory} />
      )}

      {showPaymentHistory && <PaymentHistory onClose={togglePaymentHistory} />}
    </span>
  );
};

export default Profile;
