import React from 'react';

const StatusBar = () => {
  return (
    <div className="status-bar">
      <span>Sheet1</span>
      <span className="status-separator">|</span>
      <span>100%</span>
      <span className="status-separator">|</span>
      <span>Ready</span>
    </div>
  );
};

export default StatusBar;