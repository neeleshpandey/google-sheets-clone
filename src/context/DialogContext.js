// src/context/DialogContext.js
import React, { createContext, useState, useContext } from 'react';
import FindReplaceDialog from '../components/dialogs/FindReplaceDialog';

// Create context
const DialogContext = createContext();

// Custom hook to use the dialog context
export const useDialogs = () => useContext(DialogContext);

// Provider component
export const DialogProvider = ({ children }) => {
  // Initialize state
  const [dialogs, setDialogs] = useState({
    findReplace: false
  });
  
  const openFindReplaceDialog = () => {
    setDialogs(prev => ({ ...prev, findReplace: true }));
  };
  
  const closeFindReplaceDialog = () => {
    setDialogs(prev => ({ ...prev, findReplace: false }));
  };
  
  // Value object to be provided to consumers
  const value = {
    openFindReplaceDialog,
    closeFindReplaceDialog
  };

  return (
    <DialogContext.Provider value={value}>
      {children}
      
      {/* Render dialogs when they are open */}
      {dialogs.findReplace && (
        <FindReplaceDialog onClose={closeFindReplaceDialog} />
      )}
    </DialogContext.Provider>
  );
};