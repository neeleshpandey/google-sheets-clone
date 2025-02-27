// src/components/Cell.js
import React, { useState, useEffect, useRef } from 'react';
import { useSpreadsheet } from '../context/SpreadsheetContext';

const Cell = ({ row, col, value, onChange }) => {
  const [editing, setEditing] = useState(false);
  const [cellValue, setCellValue] = useState(value || '');
  const inputRef = useRef(null);
  const { selectedCell } = useSpreadsheet();
  
  const isSelected = selectedCell.row === row && selectedCell.col === col;
  
  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);
  
  useEffect(() => {
    setCellValue(value || '');
  }, [value]);
  
  const handleDoubleClick = () => {
    setEditing(true);
  };
  
  const handleBlur = () => {
    setEditing(false);
    if (onChange && cellValue !== value) {
      onChange(cellValue);
    }
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleBlur();
    }
  };
  
  return (
    <div 
      className={`cell ${isSelected ? 'selected' : ''}`}
      onClick={() => {}}
      onDoubleClick={handleDoubleClick}
    >
      {editing ? (
        <input
          ref={inputRef}
          type="text"
          value={cellValue}
          onChange={(e) => setCellValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <div className="cell-content">{cellValue}</div>
      )}
    </div>
  );
};

export default Cell;