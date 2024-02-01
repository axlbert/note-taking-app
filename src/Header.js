import React from 'react';

const headerStyle = {
  backgroundColor: '#f0f0f0', // Change this as needed
  padding: '10px 20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: '1px solid #ddd',
};

const logoStyle = {
  height: '50px', // Adjust as needed
};

const titleStyle = {
  fontSize: '24px', // Adjust as needed
  color: '#333', // Adjust as needed
  margin: '0 0 0 10px',
};

const Header = () => {
  return (
    <header style={headerStyle}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Logo" style={logoStyle} />
        <h1 style={titleStyle}>Line Configurator Notes</h1>
      </div>
      {/* You can add more header content here if needed */}
    </header>
  );
};

export default Header;
