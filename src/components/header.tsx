import React from 'react';

const Header: React.FC = () => {
  return (
    <header
      style={{
        padding: '1rem',
        background: '#f5f5f5',
        borderBottom: '1px solid #ddd',
        width: '100%',
        textAlign: 'left',
      }}
    >
      <h1 style={{ margin: 0, fontSize: '2rem', color: 'blue' }}>Podcast</h1>
    </header>
  );
};

export default Header;
