import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SpreadsheetProvider } from './context/SpreadsheetContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SpreadsheetProvider>
      <App />
    </SpreadsheetProvider>
  </React.StrictMode>
);
