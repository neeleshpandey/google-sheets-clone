// src/components/dialogs/FindReplaceDialog.js
import React, { useState } from 'react';
import { useSpreadsheet } from '../../context/SpreadsheetContext';
import { findAndReplace } from '../../utils/dataQualityFunctions';

const FindReplaceDialog = ({ onClose }) => {
  const { sheetData, setSheetData, selectedRange } = useSpreadsheet();
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  
  const handleFindReplace = () => {
    if (!findText) return;
    
    if (selectedRange) {
      const { startRow, startCol, endRow, endCol } = selectedRange;
      
      // Extract the range data
      const rangeData = [];
      for (let i = startRow; i <= endRow; i++) {
        const row = [];
        for (let j = startCol; j <= endCol; j++) {
          row.push(sheetData[i][j]);
        }
        rangeData.push(row);
      }
      
      // Apply find and replace
      const updatedRange = findAndReplace(rangeData, findText, replaceText);
      
      // Update the sheet data
      const newData = [...sheetData];
      for (let i = startRow; i <= endRow; i++) {
        for (let j = startCol; j <= endCol; j++) {
          newData[i][j] = updatedRange[i - startRow][j - startCol];
        }
      }
      
      setSheetData(newData);
    }
    
    onClose();
  };
  
  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <h2>Find and Replace</h2>
        <div className="dialog-content">
          <div className="dialog-field">
            <label>Find:</label>
            <input 
              type="text" 
              value={findText}
              onChange={(e) => setFindText(e.target.value)}
            />
          </div>
          <div className="dialog-field">
            <label>Replace with:</label>
            <input 
              type="text" 
              value={replaceText}
              onChange={(e) => setReplaceText(e.target.value)}
            />
          </div>
        </div>
        <div className="dialog-buttons">
          <button onClick={handleFindReplace}>Replace All</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default FindReplaceDialog;