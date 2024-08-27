import React, { useState, useEffect } from 'react';

const InstallPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    const ua = window.navigator.userAgent;
    const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
    const webkit = !!ua.match(/WebKit/i);
    const iOSSafari = iOS && webkit && !ua.match(/CriOS/i);

    setIsIOS(iOS);
    setIsSafari(iOSSafari);

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPopup(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      }
      setDeferredPrompt(null);
    }
    setShowPopup(false);
  };

  if (!showPopup || (isIOS && !isSafari)) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 text-white p-6 rounded-lg max-w-md">
        <h2 className="text-xl font-bold mb-4">How it works</h2>
        <ul className="mb-6 space-y-2">
          <li>• Install our app for easy access</li>
          <li>• Enjoy a seamless experience on your device</li>
          <li>• Access features offline</li>
          <li>• Receive important notifications</li>
        </ul>
        {isIOS ? (
          <p className="mb-4">To install, tap the share button and select 'Add to Home Screen'</p>
        ) : (
          <button
            onClick={handleInstall}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Install Now
          </button>
        )}
        <button
          onClick={() => setShowPopup(false)}
          className="mt-4 text-sm text-gray-400 hover:text-gray-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default InstallPopup;