// src/hooks/useSpreadsheetData.js
import { useEffect } from 'react';
import { useSpreadsheet } from '../context/SpreadsheetContext';

export const useSpreadsheetData = () => {
  const { sheetData, setSheetData } = useSpreadsheet();
  
  // Validate data when it changes
  useEffect(() => {
    if (!sheetData || sheetData.length === 0) return;
    
    // Perform validation on numeric cells
    const validatedData = sheetData.map(row => 
      row.map(cell => {
        // If the cell has a formula, validate its result
        if (cell && typeof cell === 'object' && cell.formula) {
          if (typeof cell.value === 'number' && isNaN(cell.value)) {
            return { ...cell, value: 0, error: true };
          }
          return cell;
        }
        
        // For non-formula cells, validate if they're numeric
        if (cell && typeof cell === 'string' && !isNaN(parseFloat(cell)) && !isNaN(cell)) {
          return parseFloat(cell);
        }
        
        return cell;
      })
    );
    
    // Update data if validation changed anything
    if (JSON.stringify(validatedData) !== JSON.stringify(sheetData)) {
      setSheetData(validatedData);
    }
  }, [sheetData, setSheetData]);
  
  return { sheetData, setSheetData };
};