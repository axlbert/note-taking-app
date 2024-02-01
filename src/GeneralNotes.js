// GeneralNotes.js
import React, { useState } from 'react';

const generalNotesStyle = {
  width: '100%',
  padding: '10px',
  boxSizing: 'border-box',
};

const notesInputStyle = {
  width: '100%',
  height: '100px', // Adjust as needed
  boxSizing: 'border-box',
};

const collapseButtonStyle = {
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  padding: '5px 10px',
  borderRadius: '5px',
  cursor: 'pointer',
};

const GeneralNotes = ({ onNotesChange, notes }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={generalNotesStyle}>
      <button onClick={() => setCollapsed(!collapsed)} style={collapseButtonStyle}>
        {collapsed ? 'Show General Notes' : 'Hide General Notes'}
      </button>
      {!collapsed && (
        <textarea
          style={notesInputStyle}
          value={notes}
          onChange={onNotesChange}
          placeholder="Enter general notes here"
        />
      )}
    </div>
  );
};

export default GeneralNotes;
