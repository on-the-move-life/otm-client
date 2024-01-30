import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';

import './index.css';
import App from './App';
import { ThemeProvider } from '@material-tailwind/react';
import { AuthProvider } from './contexts/AuthContext';
import { UserContextProvider } from './contexts/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <ThemeProvider>
      <AuthProvider>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </AuthProvider>
    </ThemeProvider>
  </Provider>,
);
