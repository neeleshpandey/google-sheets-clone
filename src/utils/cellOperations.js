// Utility functions for cell operations

/**
 * Parse a cell reference (e.g., "A1") to row and column indices
 * @param {string} cellRef - Cell reference (e.g., "A1")
 * @returns {Object} - { row, col } indices
 */
export const parseCellReference = (cellRef) => {
    // Extract column letter(s) and row number
    const match = cellRef.match(/([A-Z]+)([0-9]+)/);
    if (!match) return null;
    
    const [, colStr, rowStr] = match;
    
    // Convert column letter(s) to index (0-based)
    let colIndex = 0;
    for (let i = 0; i < colStr.length; i++) {
      colIndex = colIndex * 26 + (colStr.charCodeAt(i) - 64);
    }
    colIndex--; // Convert to 0-based index
    
    // Convert row to 0-based index
    const rowIndex = parseInt(rowStr) - 1;
    
    return { row: rowIndex, col: colIndex };
  };
  
  /**
   * Get cell reference (e.g., "A1") from row and column indices
   * @param {number} row - Row index (0-based)
   * @param {number} col - Column index (0-based)
   * @returns {string} - Cell reference
   */
  export const getCellReference = (row, col) => {
    // Convert column index to letter(s)
    let colStr = '';
    let n = col + 1;
    while (n > 0) {
      const remainder = (n - 1) % 26;
      colStr = String.fromCharCode(65 + remainder) + colStr;
      n = Math.floor((n - 1) / 26);
    }
    
    // Convert row to 1-based index
    const rowStr = row + 1;
    
    return `${colStr}${rowStr}`;
  };
  
  /**
   * Parse a cell range (e.g., "A1:B3") to start and end row/column indices
   * @param {string} rangeRef - Range reference (e.g., "A1:B3")
   * @returns {Object} - { startRow, startCol, endRow, endCol }
   */
  export const parseRangeReference = (rangeRef) => {
    const [startRef, endRef] = rangeRef.split(':');
    const start = parseCellReference(startRef);
    const end = parseCellReference(endRef);
    
    if (!start || !end) return null;
    
    return {
      startRow: start.row,
      startCol: start.col,
      endRow: end.row,
      endCol: end.col
    };
  };
  
  /**
   * Extract data from a range of cells
   * @param {Array} data - 2D array of spreadsheet data
   * @param {Object} range - { startRow, startCol, endRow, endCol }
   * @returns {Array} - 2D array of cell values in the range
   */
  export const getRangeData = (data, range) => {
    const { startRow, startCol, endRow, endCol } = range;
    const result = [];
    
    for (let i = startRow; i <= endRow; i++) {
      const row = [];
      for (let j = startCol; j <= endCol; j++) {
        if (data[i] && data[i][j] !== undefined) {
          row.push(data[i][j]);
        } else {
          row.push('');
        }
      }
      result.push(row);
    }
    
    return result;
  };