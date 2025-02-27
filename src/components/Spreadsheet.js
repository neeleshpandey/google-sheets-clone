// src/components/Spreadsheet.js
import React, { useEffect, useRef, useState } from 'react';
import { HotTable } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.css';
import { useSpreadsheet } from '../context/SpreadsheetContext';
import { evaluateFormula } from '../utils/formulaParser';

const Spreadsheet = ({ selectedCell, setSelectedCell, sheetData, setSheetData }) => {
  const hotTableRef = useRef(null);
  const { activeFormula, setActiveFormula } = useSpreadsheet();
  
  // Initialize data if empty
  useEffect(() => {
    if (!sheetData || sheetData.length === 0) {
      // Create a 50x26 empty spreadsheet (A-Z, 50 rows)
      const initialData = Array(50).fill().map(() => Array(26).fill(''));
      setSheetData(initialData);
    }
  }, [sheetData, setSheetData]);

  // Handle formula evaluation
  const processFormula = (row, col, value) => {
    if (value && value.toString().startsWith('=')) {
      try {
        const formula = value.substring(1);
        const result = evaluateFormula(formula, sheetData);
        
        // Update cell with both formula and result
        const updatedData = [...sheetData];
        updatedData[row][col] = {
          value: result,
          formula: value
        };
        
        setSheetData(updatedData);
        return result;
      } catch (error) {
        return `#ERROR: ${error.message}`;
      }
    }
    return value;
  };

  // Configuration for Handsontable
  const settings = {
    data: sheetData,
    rowHeaders: true,
    colHeaders: true,
    height: '100%',
    width: '100%',
    licenseKey: 'non-commercial-and-evaluation',
    contextMenu: {
      items: {
        'row_above': {},
        'row_below': {},
        'col_left': {},
        'col_right': {},
        'remove_row': {},
        'remove_col': {},
        'separator': '---------',
        'alignment': {},
        'separator2': '---------',
        'format_text': {
          name: 'Format Text',
          submenu: {
            items: [
              {
                key: 'format_text:bold',
                name: 'Bold',
                callback: function(key, selection) {
                  // Add bold formatting
                }
              },
              {
                key: 'format_text:italic',
                name: 'Italic',
                callback: function(key, selection) {
                  // Add italic formatting
                }
              }
            ]
          }
        },
        'data_operations': {
          name: 'Data Operations',
          submenu: {
            items: [
              {
                key: 'data_operations:find_replace',
                name: 'Find and Replace',
                callback: function() {
                  // Show find and replace dialog
                }
              },
              {
                key: 'data_operations:remove_duplicates',
                name: 'Remove Duplicates',
                callback: function(key, selection) {
                  // Remove duplicates from selection
                }
              }
            ]
          }
        }
      }
    },
    colHeaders: generateColumnHeaders(26), // A to Z
    afterSelectionEnd: (row, col) => {
      setSelectedCell({ row, col });
      
      // Update formula bar when selecting a cell
      if (sheetData[row] && sheetData[row][col]) {
        const cellData = sheetData[row][col];
        if (typeof cellData === 'object' && cellData.formula) {
          setActiveFormula(cellData.formula);
        } else {
          setActiveFormula(sheetData[row][col] || '');
        }
      } else {
        setActiveFormula('');
      }
    },
    afterChange: (changes) => {
      if (!changes) return;
      
      // Update the sheetData with the new values
      const updatedData = [...sheetData];
      changes.forEach(([row, col, oldValue, newValue]) => {
        // Process formulas
        const processedValue = processFormula(row, col, newValue);
        
        if (typeof processedValue === 'object') {
          updatedData[row][col] = processedValue;
        } else {
          updatedData[row][col] = newValue;
        }
      });
      
      setSheetData(updatedData);
      updateDependentCells(changes.map(change => ({ row: change[0], col: change[1] })));
    },
    cells: function(row, col) {
      return {
        renderer: function(instance, td, row, col, prop, value, cellProperties) {
          Handsontable.renderers.TextRenderer.apply(this, arguments);
          
          // Display the value if it's an object with formula and value
          if (value && typeof value === 'object' && value.hasOwnProperty('value')) {
            td.innerHTML = value.value;
          }
          
          return td;
        }
      };
    }
  };

  // Update cells that depend on changed cells
  const updateDependentCells = (changedCells) => {
    // Implementation would identify and update cells with formulas that reference changed cells
    // This is a complex feature that would need a formula parser and dependency graph
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