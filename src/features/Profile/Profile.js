import React, { useState } from 'react';
import PaymentHistory from './PaymentHistory';
import UserDetails from './UserDetail';

const Profile = () => {
  const [showPaymentHistory, setShowPaymentHistory] = useState(false);

  const togglePaymentHistory = () => {
    setShowPaymentHistory((prevShowPaymentHistory) => !prevShowPaymentHistory);
  };

  return (
    <span className="flex h-full w-screen items-center justify-center">
      {!showPaymentHistory && (
        <UserDetails showHistory={togglePaymentHistory} />
      )}

      {showPaymentHistory && <PaymentHistory onClose={togglePaymentHistory} />}
    </span>
  );
};

export default Profile;
