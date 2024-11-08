import React from 'react';

const Sidebar = ({ displayName, onLogout }) => {
  return (
    <div style={{
      width: '250px', 
      padding: '1rem', 
      backgroundColor: '#2c7a7b', 
      color: 'white', 
      height: '100vh'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Welcome, {displayName}</h2>
        <button
          onClick={onLogout}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#e53e3e',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
