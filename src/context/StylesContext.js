// src/context/StylesContext.js
import React, { createContext, useState, useContext } from 'react';

// Create context
const StylesContext = createContext();

// Custom hook to use the styles context
export const useStyles = () => useContext(StylesContext);

// Provider component
export const StylesProvider = ({ children }) => {
  // Initialize state
  const [cellStyles, setCellStyles] = useState({});
  
  // Format: cellStyles = { 'A1': { bold: true, italic: false, color: '#FF0000' } }
  
  const getCellStyle = (row, col) => {
    const cellKey = `${String.fromCharCode(65 + col)}${row + 1}`;
    return cellStyles[cellKey] || {};
  };
  
  const setCellStyle = (row, col, style) => {
    const cellKey = `${String.fromCharCode(65 + col)}${row + 1}`;
    setCellStyles(prev => ({
      ...prev,
      [cellKey]: { ...prev[cellKey], ...style }
    }));
  };
  
  const setBold = (row, col, value) => {
    setCellStyle(row, col, { bold: value });
  };
  
  const setItalic = (row, col, value) => {
    setCellStyle(row, col, { italic: value });
  };
  
  const setTextColor = (row, col, color) => {
    setCellStyle(row, col, { color });
  };
  
  const setBackgroundColor = (row, col, backgroundColor) => {
    setCellStyle(row, col, { backgroundColor });
  };
  
  // Value object to be provided to consumers
  const value = {
    getCellStyle,
    setCellStyle,
    setBold,
    setItalic,
    setTextColor,
    setBackgroundColor
  };

  return (
    <StylesContext.Provider value={value}>
      {children}
    </StylesContext.Provider>
  );
};