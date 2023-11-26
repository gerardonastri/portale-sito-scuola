import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { persistor, store } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import { GoogleOAuthProvider } from '@react-oauth/google';



// 1087249134170-gnjvrh4am3fv61d3o329iostlvcj04b1.apps.googleusercontent.com
// 52946809134-dqfc0cvfd2ik9dvo74ik1pe4i2j870cn.apps.googleusercontent.com

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="52946809134-dqfc0cvfd2ik9dvo74ik1pe4i2j870cn.apps.googleusercontent.com">
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </GoogleOAuthProvider>
);


