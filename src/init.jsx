import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';

import App from './components/App.jsx';
import phoneNumbersReducer, { addNumber } from './slices/phoneNumbersSlice.js';
import socketContext from './contexts/socketContext.js';

const emitSocket = (socket, event, data) => new Promise((resolve, reject) => {
  if (!socket.connected) {
    reject();
  }
    socket.emit(event, data, (res) => {
      console.log('hey');
      if (res.status !== 'ok') {
        reject();
      }
      resolve(res.data);
    })
});

const init = () => {
  const store = configureStore({
    reducer: {
      phoneNumbers: phoneNumbersReducer,
    },
  });

  const api = {
    addPhone(data) {
      return emitSocket(socket, 'addPhone', data);
    }
  };

  const socket = io();
  socket.on('addPhone', (response) => {
    store.dispatch(addNumber(response));
  });

  return (
    <Provider store={store}>
      <socketContext.Provider value={api}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
      </socketContext.Provider>
    </Provider>
  );
};

export default init;
