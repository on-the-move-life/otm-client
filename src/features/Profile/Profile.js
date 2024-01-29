import React, { useState } from 'react';
import PaymentHistory from './PaymentHistory';
import ProfileHome from './ProfileHome';

const Main = () => {
  const [showPaymentHistory, setShowPaymentHistory] = useState(false);

  const handleShowPaymentHistory = () => {
    setShowPaymentHistory(!showPaymentHistory);
  };

  return (
    <div className="flex min-h-screen w-screen items-center justify-center">
      {!showPaymentHistory && (
        <ProfileHome  showHistory={handleShowPaymentHistory} />
      )}

      {showPaymentHistory && (
        <PaymentHistory onClose={handleShowPaymentHistory} />
      )}
    </div>
  );
};

export default Main;
