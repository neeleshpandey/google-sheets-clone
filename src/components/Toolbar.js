// src/components/Toolbar.js
import React, { useState } from 'react';
import { useSpreadsheet } from '../context/SpreadsheetContext';
import { useStyles } from '../context/StylesContext';

const Toolbar = () => {
  const { selectedCell, sheetData, setSheetData } = useSpreadsheet();
  const { setBold, setItalic, setTextColor, setBackgroundColor } = useStyles();
  const [fontFamily, setFontFamily] = useState('Arial');
  const [fontSize, setFontSize] = useState('12');
  
  const handleBoldClick = () => {
    setBold(selectedCell.row, selectedCell.col, true);
  };
  
  const handleItalicClick = () => {
    setItalic(selectedCell.row, selectedCell.col, true);
  };
  
  const handleFontChange = (e) => {
    setFontFamily(e.target.value);
  };
  
  const handleFontSizeChange = (e) => {
    setFontSize(e.target.value);
  };
  
  return (
    <div className="toolbar">
      <div className="toolbar-section">
        <button className="toolbar-button">File</button>
        <button className="toolbar-button">Edit</button>
        <button className="toolbar-button">View</button>
        <button className="toolbar-button">Insert</button>
        <button className="toolbar-button">Format</button>
        <button className="toolbar-button">Data</button>
        <button className="toolbar-button">Tools</button>
        <button className="toolbar-button">Help</button>
      </div>
      <div className="toolbar-section">
        <button className="toolbar-button">
          <i className="material-icons">undo</i>
        </button>
        <button className="toolbar-button">
          <i className="material-icons">redo</i>
        </button>
        <button className="toolbar-button">
          <i className="material-icons">print</i>
        </button>
        <button className="toolbar-button">
          <i className="material-icons">format_paint</i>
        </button>
      </div>
      <div className="toolbar-section">
        <select 
          className="font-selector" 
          value={fontFamily}
          onChange={handleFontChange}
        >
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
        </select>
        <select 
          className="font-size-selector"
          value={fontSize}
          onChange={handleFontSizeChange}
        >
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="14">14</option>
          <option value="16">16</option>
          <option value="18">18</option>
          <option value="20">20</option>
          <option value="24">24</option>
        </select>
      </div>
      <div className="toolbar-section">
        <button 
          className="toolbar-button"
          onClick={handleBoldClick}
        >
          <i className="material-icons">format_bold</i>
        </button>
        <button 
          className="toolbar-button"
          onClick={handleItalicClick}
        >
          <i className="material-icons">format_italic</i>
        </button>
        <button className="toolbar-button">
          <i className="material-icons">format_underlined</i>
        </button>
        <button className="toolbar-button">
          <i className="material-icons">format_color_text</i>
        </button>
        <button className="toolbar-button">
          <i className="material-icons">format_color_fill</i>
        </button>
      </div>
    </div>
  );
};

export default Toolbar;