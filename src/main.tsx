import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Provider from './Provider.tsx';
import App from './App.tsx';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import '@styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </Provider>
  </React.StrictMode>,
);
