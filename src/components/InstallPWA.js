import React, { useState, useEffect } from 'react';

const InstallPWA = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      console.log("Before install prompt event fired");
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const onClick = () => {
    if (!promptInstall) {
      console.log("Install prompt is not available");
      return;
    }
    promptInstall.prompt();
  };

  return (
    <button 
      onClick={onClick} 
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 15px',
        backgroundColor: supportsPWA ? '#007bff' : '#cccccc',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: supportsPWA ? 'pointer' : 'not-allowed',
      }}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      Install App {supportsPWA ? '' : '(Not Supported)'}
    </button>
  );
};

export default InstallPWA;