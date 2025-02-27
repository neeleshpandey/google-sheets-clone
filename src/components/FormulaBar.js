// src/components/FormulaBar.js
import React, { useState, useEffect } from 'react';
import { useSpreadsheet } from '../context/SpreadsheetContext';

const FormulaBar = ({ selectedCell, sheetData }) => {
  const { activeFormula, setActiveFormula } = useSpreadsheet();
  const [formula, setFormula] = useState('');

  // Update formula when selected cell changes
  useEffect(() => {
    if (sheetData && sheetData[selectedCell.row] && sheetData[selectedCell.row][selectedCell.col]) {
      const cellData = sheetData[selectedCell.row][selectedCell.col];
      
      if (typeof cellData === 'object' && cellData.formula) {
        setFormula(cellData.formula);
      } else {
        setFormula(cellData || '');
      }
    } else {
      setFormula('');
    }
  }, [selectedCell, sheetData]);

  // Update formula from context
  useEffect(() => {
    setFormula(activeFormula);
  }, [activeFormula]);

  const handleFormulaChange = (e) => {
    setFormula(e.target.value);
  };

  const handleFormulaSubmit = (e) => {
    if (e.key === 'Enter') {
      // Update the cell with the new formula
      const newData = [...sheetData];
      
      if (!newData[selectedCell.row]) {
        newData[selectedCell.row] = [];
      }
      
      newData[selectedCell.row][selectedCell.col] = formula;
      
      // This would trigger the formula processing in Spreadsheet component
      // through the afterChange callback
    }
  };

  return (
    <div className="formula-bar">
      <div className="selected-cell-display">
        {String.fromCharCode(65 + selectedCell.col)}{selectedCell.row + 1}
      </div>
      <div className="formula-equals">=</div>
      <input 
        type="text" 
        className="formula-input" 
        value={formula} 
        onChange={handleFormulaChange}
        onKeyDown={handleFormulaSubmit}
      />
    </div>
  );
};

export default FormulaBar;