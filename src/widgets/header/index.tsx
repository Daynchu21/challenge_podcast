import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header>
      <Link to="/">
        <p>Podcaster</p>
      </Link>
    </header>
  );
};

export default Header;
