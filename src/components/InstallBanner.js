import React, { useState, useEffect } from 'react';

const InstallBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        }
        setShowBanner(false);
      });
    }
  };

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  if (!showBanner) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-purple-600 text-white p-4 flex justify-between items-center z-50">
      <div>
        <p className="font-bold">Your site</p>
        <p>Get our free app. It won't take up space on your phone.</p>
      </div>
      {isIOS ? (
        <a href="#" onClick={() => alert("To install, tap the share button and select 'Add to Home Screen'")}>
          <button className="bg-white text-purple-600 px-4 py-2 rounded">Install</button>
        </a>
      ) : (
        <button onClick={handleInstall} className="bg-white text-purple-600 px-4 py-2 rounded">
          Install
        </button>
      )}
    </div>
  );
};

export default InstallBanner;