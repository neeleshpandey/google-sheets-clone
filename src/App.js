import React, { useState } from 'react';
import './App.css';
import Toolbar from './components/Toolbar';
import FormulaBar from './components/FormulaBar';
import Spreadsheet from './components/Spreadsheet';
import StatusBar from './components/StatusBar';

function App() {
  // State for the currently selected cell
  const [selectedCell, setSelectedCell] = useState({ row: 0, col: 0 });
  
  // State for the spreadsheet data
  const [sheetData, setSheetData] = useState([]);
  
  return (
    <div className="app">
      <div className="sheets-container">
        <Toolbar />
        <FormulaBar selectedCell={selectedCell} sheetData={sheetData} />
        <Spreadsheet 
          selectedCell={selectedCell} 
          setSelectedCell={setSelectedCell}
          sheetData={sheetData}
          setSheetData={setSheetData}
        />
        <StatusBar />
      </div>
    </div>
  );
}

export default App;