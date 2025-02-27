// Data quality functions for our spreadsheet

/**
 * Remove leading and trailing whitespace from a cell value
 * @param {string} value - Cell value
 * @returns {string} - Trimmed value
 */
export const trim = (value) => {
    if (typeof value !== 'string') return value;
    return value.trim();
  };
  
  /**
   * Convert cell value to uppercase
   * @param {string} value - Cell value
   * @returns {string} - Uppercase value
   */
  export const upper = (value) => {
    if (typeof value !== 'string') return value;
    return value.toUpperCase();
  };
  
  /**
   * Convert cell value to lowercase
   * @param {string} value - Cell value
   * @returns {string} - Lowercase value
   */
  export const lower = (value) => {
    if (typeof value !== 'string') return value;
    return value.toLowerCase();
  };
  
  /**
   * Remove duplicate rows from a range
   * @param {Array} range - 2D array of cell values
   * @returns {Array} - Range with duplicates removed
   */
  export const removeDuplicates = (range) => {
    // Convert each row to a string for comparison
    const seen = new Set();
    return range.filter(row => {
      const rowStr = JSON.stringify(row);
      if (seen.has(rowStr)) return false;
      seen.add(rowStr);
      return true;
    });
  };
  
  /**
   * Find and replace text in a range
   * @param {Array} range - 2D array of cell values
   * @param {string} findText - Text to find
   * @param {string} replaceText - Text to replace with
   * @returns {Array} - Updated range
   */
  export const findAndReplace = (range, findText, replaceText) => {
    return range.map(row => 
      row.map(cell => {
        if (typeof cell === 'string') {
          return cell.replace(new RegExp(findText, 'g'), replaceText);
        }
        return cell;
      })
    );
  };