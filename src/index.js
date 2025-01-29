import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';

import './index.css';
import App from './App';
import { ThemeProvider } from '@material-tailwind/react';
import { AuthProvider } from './contexts/AuthContext';
import { UserContextProvider } from './contexts/UserContext';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { subscribeUser } from './pushNotificationHelper';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <ToastContainer
      position="top-center"
      autoClose={2000}
      hideProgressBar={true}
      newestOnTop={false}
      closeButton={false}
      theme="dark"
    />
    <ThemeProvider>
      <AuthProvider>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </AuthProvider>
    </ThemeProvider>
  </Provider>,
);

serviceWorkerRegistration.register({
  onUpdate: (registration) => {
    const waitingServiceWorker = registration.waiting;

    if (waitingServiceWorker) {
      waitingServiceWorker.addEventListener('statechange', (event) => {
        if (event.target.state === 'activated') {
          window.location.reload();
        }
      });
      waitingServiceWorker.postMessage({ type: 'SKIP_WAITING' });
    }
  },
  onSuccess: (registration) => {
    console.log('Service Worker registered successfully.');
    subscribeUser()
      .then(() => console.log('User subscribed to push notifications'))
      .catch(error => console.error('Error subscribing to push notifications:', error));
  },
});