// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SpreadsheetProvider } from './context/SpreadsheetContext';
import { StylesProvider } from './context/StylesContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StylesProvider>
      <SpreadsheetProvider>
        <App />
      </SpreadsheetProvider>
    </StylesProvider>
  </React.StrictMode>
);