import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import router from './router.jsx';
import { RouterProvider } from 'react-router';
import { ContextProvider } from './context/ContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;900&display=swap" rel="stylesheet" />
    <ContextProvider>
      <RouterProvider router={router} />  
    </ContextProvider>
  </React.StrictMode>
);
