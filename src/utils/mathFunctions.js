// Basic mathematical functions for our spreadsheet

/**
 * Calculate the sum of a range of cells
 * @param {Array} cells - Array of cell values
 * @returns {number} - Sum of the values
 */
export const sum = (cells) => {
    return cells
      .filter(cell => !isNaN(parseFloat(cell)))
      .reduce((acc, val) => acc + parseFloat(val), 0);
  };
  
  /**
   * Calculate the average of a range of cells
   * @param {Array} cells - Array of cell values
   * @returns {number} - Average of the values
   */
  export const average = (cells) => {
    const numericCells = cells.filter(cell => !isNaN(parseFloat(cell)));
    if (numericCells.length === 0) return 0;
    return sum(numericCells) / numericCells.length;
  };
  
  /**
   * Find the maximum value in a range of cells
   * @param {Array} cells - Array of cell values
   * @returns {number} - Maximum value
   */
  export const max = (cells) => {
    const numericCells = cells.filter(cell => !isNaN(parseFloat(cell)));
    if (numericCells.length === 0) return 0;
    return Math.max(...numericCells.map(cell => parseFloat(cell)));
  };
  
  /**
   * Find the minimum value in a range of cells
   * @param {Array} cells - Array of cell values
   * @returns {number} - Minimum value
   */
  export const min = (cells) => {
    const numericCells = cells.filter(cell => !isNaN(parseFloat(cell)));
    if (numericCells.length === 0) return 0;
    return Math.min(...numericCells.map(cell => parseFloat(cell)));
  };
  
  /**
   * Count the number of numeric cells in a range
   * @param {Array} cells - Array of cell values
   * @returns {number} - Count of numeric cells
   */
  export const count = (cells) => {
    return cells.filter(cell => !isNaN(parseFloat(cell))).length;
  };