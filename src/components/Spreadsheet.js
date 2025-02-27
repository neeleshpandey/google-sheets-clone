import React, { useEffect, useRef } from 'react';
import { HotTable } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.css';

const Spreadsheet = ({ selectedCell, setSelectedCell, sheetData, setSheetData }) => {
  const hotTableRef = useRef(null);
  
  // Initialize data if empty
  useEffect(() => {
    if (!sheetData || sheetData.length === 0) {
      // Create a 50x26 empty spreadsheet (A-Z, 50 rows)
      const initialData = Array(50).fill().map(() => Array(26).fill(''));
      setSheetData(initialData);
    }
  }, [sheetData, setSheetData]);

  // Configuration for Handsontable
  const settings = {
    data: sheetData,
    rowHeaders: true,
    colHeaders: true,
    height: '100%',
    licenseKey: 'non-commercial-and-evaluation',
    contextMenu: true,
    colHeaders: generateColumnHeaders(26), // A to Z
    afterSelectionEnd: (row, col) => {
      setSelectedCell({ row, col });
    },
    afterChange: (changes) => {
      if (!changes) return;
      
      // Update the sheetData with the new values
      const newData = [...sheetData];
      changes.forEach(([row, col, oldValue, newValue]) => {
        newData[row][col] = newValue;
      });
      setSheetData(newData);
    }
  };

  // Generate column headers (A, B, C, ...)
  function generateColumnHeaders(count) {
    return Array(count).fill().map((_, i) => String.fromCharCode(65 + i));
  }

  return (
    <div className="spreadsheet-container">
      <HotTable ref={hotTableRef} settings={settings} />
    </div>
  );
};

export default Spreadsheet;