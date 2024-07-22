import React, { useState } from 'react';
import PaymentHistory from './PaymentHistory';
import UserDetails from './UserDetail';

const Profile = () => {
  const [showPaymentHistory, setShowPaymentHistory] = useState(false);

  const togglePaymentHistory = () => {
    setShowPaymentHistory((prevShowPaymentHistory) => !prevShowPaymentHistory);
  };

  return (
    <div className="flex items-center justify-center w-screen grow">
      {!showPaymentHistory && (
        <UserDetails showHistory={togglePaymentHistory} />
      )}

      {showPaymentHistory && <PaymentHistory onClose={togglePaymentHistory} />}
    </div>
  );
};

export default Profile;
