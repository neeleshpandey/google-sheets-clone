import React, { createContext, useState, useContext } from 'react';

// Create context
const SpreadsheetContext = createContext();

// Custom hook to use the spreadsheet context
export const useSpreadsheet = () => useContext(SpreadsheetContext);

// Provider component
export const SpreadsheetProvider = ({ children }) => {
  // Initialize state
  const [sheetData, setSheetData] = useState([]);
  const [selectedCell, setSelectedCell] = useState({ row: 0, col: 0 });
  const [selectedRange, setSelectedRange] = useState(null);
  const [activeFormula, setActiveFormula] = useState('');
  
  // Initialize with empty data if needed
  if (sheetData.length === 0) {
    // Create a 50x26 empty spreadsheet (A-Z, 50 rows)
    const initialData = Array(50).fill().map(() => Array(26).fill(''));
    setSheetData(initialData);
  }

  // Value object to be provided to consumers
  const value = {
    sheetData,
    setSheetData,
    selectedCell,
    setSelectedCell,
    selectedRange,
    setSelectedRange,
    activeFormula,
    setActiveFormula
  };

  return (
    <SpreadsheetContext.Provider value={value}>
      {children}
    </SpreadsheetContext.Provider>
  );
};