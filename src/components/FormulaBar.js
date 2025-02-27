import React, { useState, useEffect } from 'react';

const FormulaBar = ({ selectedCell, sheetData }) => {
  const [formula, setFormula] = useState('');

  // Update formula when selected cell changes
  useEffect(() => {
    if (sheetData && sheetData[selectedCell.row] && sheetData[selectedCell.row][selectedCell.col]) {
      const cellData = sheetData[selectedCell.row][selectedCell.col];
      setFormula(cellData.formula || cellData.value || '');
    } else {
      setFormula('');
    }
  }, [selectedCell, sheetData]);

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
        onChange={(e) => setFormula(e.target.value)}
      />
    </div>
  );
};

export default FormulaBar;