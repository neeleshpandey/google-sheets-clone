import React from 'react';

const Toolbar = () => {
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
        <select className="font-selector">
          <option>Arial</option>
          <option>Times New Roman</option>
          <option>Courier New</option>
        </select>
        <select className="font-size-selector">
          <option>10</option>
          <option>11</option>
          <option>12</option>
          <option>14</option>
          <option>16</option>
          <option>18</option>
          <option>20</option>
          <option>24</option>
        </select>
      </div>
      <div className="toolbar-section">
        <button className="toolbar-button">
          <i className="material-icons">format_bold</i>
        </button>
        <button className="toolbar-button">
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