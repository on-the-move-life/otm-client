import React, { useState } from 'react';
import { PaymentHistory, UserDetails } from '../Profile';



const Profile = () => {
  const [showPaymentHistory, setShowPaymentHistory] = useState(false);

  const togglePaymentHistory = () => {
    setShowPaymentHistory((prevShowPaymentHistory) => !prevShowPaymentHistory);
  };

  return (
    <div className="flex min-h-screen w-screen items-center justify-center">
      {!showPaymentHistory && (
        <UserDetails  showHistory={togglePaymentHistory} />
      )}

      {showPaymentHistory && (
        <PaymentHistory onClose={togglePaymentHistory} />
      )}
    </div>
  );
};

export default Profile;
