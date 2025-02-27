// src/utils/formulaParser.js
import { sum, average, max, min, count } from './mathFunctions';
import { trim, upper, lower, removeDuplicates, findAndReplace } from './dataQualityFunctions';
import { parseCellReference, parseRangeReference, getRangeData } from './cellOperations';

/**
 * Evaluates a formula string and returns the result
 * @param {string} formula - The formula to evaluate (without the leading '=')
 * @param {Array} sheetData - The current sheet data
 * @returns {*} - The result of the formula evaluation
 */
export const evaluateFormula = (formula, sheetData) => {
  // Remove whitespace
  formula = formula.trim();
  
  // Check for function calls
  if (formula.includes('(') && formula.includes(')')) {
    return evaluateFunction(formula, sheetData);
  }
  
  // Check if it's a cell reference
  if (/^[A-Z]+[0-9]+$/.test(formula)) {
    return getCellValue(formula, sheetData);
  }
  
  // Evaluate as a basic arithmetic expression
  return evaluateArithmetic(formula, sheetData);
};

/**
 * Evaluates a function call in a formula
 * @param {string} formula - The formula containing a function
 * @param {Array} sheetData - The current sheet data
 * @returns {*} - The result of the function evaluation
 */
const evaluateFunction = (formula, sheetData) => {
  // Extract function name and arguments
  const functionMatch = formula.match(/^([A-Z_]+)\((.*)\)$/i);
  if (!functionMatch) {
    throw new Error('Invalid function format');
  }
  
  const [, functionName, argsString] = functionMatch;
  
  // Parse arguments
  const args = parseArguments(argsString, sheetData);
  
  // Execute appropriate function
  switch (functionName.toUpperCase()) {
    // Math functions
    case 'SUM':
      return sum(flattenArgs(args));
    case 'AVERAGE':
      return average(flattenArgs(args));
    case 'MAX':
      return max(flattenArgs(args));
    case 'MIN':
      return min(flattenArgs(args));
    case 'COUNT':
      return count(flattenArgs(args));
    
    // Data quality functions
    case 'TRIM':
      return trim(args[0]);
    case 'UPPER':
      return upper(args[0]);
    case 'LOWER':
      return lower(args[0]);
    case 'REMOVE_DUPLICATES':
      if (!Array.isArray(args[0]) || !Array.isArray(args[0][0])) {
        throw new Error('REMOVE_DUPLICATES requires a range');
      }
      return removeDuplicates(args[0]);
    case 'FIND_AND_REPLACE':
      if (args.length < 3 || !Array.isArray(args[0]) || !Array.isArray(args[0][0])) {
        throw new Error('FIND_AND_REPLACE requires a range and two strings');
      }
      return findAndReplace(args[0], args[1], args[2]);
    
    default:
      throw new Error(`Unknown function: ${functionName}`);
  }
};

/**
 * Parses function arguments
 * @param {string} argsString - The string containing function arguments
 * @param {Array} sheetData - The current sheet data
 * @returns {Array} - Parsed arguments
 */
const parseArguments = (argsString, sheetData) => {
  // Split arguments by comma, but respect nested functions
  const args = [];
  let currentArg = '';
  let nestedLevel = 0;
  
  for (let i = 0; i < argsString.length; i++) {
    const char = argsString[i];
    
    if (char === '(') {
      nestedLevel++;
      currentArg += char;
    } else if (char === ')') {
      nestedLevel--;
      currentArg += char;
    } else if (char === ',' && nestedLevel === 0) {
      args.push(currentArg.trim());
      currentArg = '';
    } else {
      currentArg += char;
    }
  }
  
  if (currentArg.trim()) {
    args.push(currentArg.trim());
  }
  
  // Evaluate each argument
  return args.map(arg => evaluateArgument(arg, sheetData));
};

/**
 * Evaluates a single argument which could be a value, cell reference, or range
 * @param {string} arg - The argument to evaluate
 * @param {Array} sheetData - The current sheet data
 * @returns {*} - The evaluated argument
 */
const evaluateArgument = (arg, sheetData) => {
  // Check if it's a range (e.g., A1:B3)
  if (arg.includes(':')) {
    const range = parseRangeReference(arg);
    if (range) {
      return getRangeData(sheetData, range);
    }
  }
  
  // Check if it's a cell reference (e.g., A1)
  if (/^[A-Z]+[0-9]+$/.test(arg)) {
    return getCellValue(arg, sheetData);
  }
  
  // Check if it's a nested formula
  if (arg.includes('(') && arg.includes(')')) {
    return evaluateFormula(arg, sheetData);
  }
  
  // Check if it's a string (surrounded by quotes)
  if ((arg.startsWith('"') && arg.endsWith('"')) || 
      (arg.startsWith("'") && arg.endsWith("'"))) {
    return arg.substring(1, arg.length - 1);
  }
  
  // Try to parse as number
  const num = parseFloat(arg);
  if (!isNaN(num)) {
    return num;
  }
  
  // Return as is if nothing else matches
  return arg;
};

/**
 * Gets the value of a cell by its reference
 * @param {string} cellRef - Cell reference (e.g., A1)
 * @param {Array} sheetData - The current sheet data
 * @returns {*} - The value of the cell
 */
const getCellValue = (cellRef, sheetData) => {
  const { row, col } = parseCellReference(cellRef);
  
  if (!sheetData[row] || sheetData[row][col] === undefined) {
    return 0; // Return 0 for empty cells
  }
  
  const cellData = sheetData[row][col];
  
  // If cell contains a formula result object
  if (typeof cellData === 'object' && cellData.hasOwnProperty('value')) {
    return cellData.value;
  }
  
  return cellData;
};

/**
 * Flattens nested arrays in arguments
 * @param {Array} args - Arguments that might contain arrays
 * @returns {Array} - Flattened array
 */
const flattenArgs = (args) => {
  return args.flat(2).filter(val => val !== undefined && val !== null);
};

/**
 * Evaluates a basic arithmetic expression
 * @param {string} formula - Arithmetic expression
 * @param {Array} sheetData - The current sheet data
 * @returns {number} - Result of the arithmetic evaluation
 */
const evaluateArithmetic = (formula, sheetData) => {
  // Replace cell references with their values
  const replaced = formula.replace(/[A-Z]+[0-9]+/g, (match) => {
    return getCellValue(match, sheetData);
  });
  
  try {
    // Use Function constructor to evaluate the expression
    // Note: This is unsafe for production, should be replaced with a proper parser
    return new Function(`return ${replaced}`)();
  } catch (error) {
    throw new Error('Invalid arithmetic expression');
  }
};