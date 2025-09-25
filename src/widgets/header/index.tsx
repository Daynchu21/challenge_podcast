/*import React from 'react';
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
*/
// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useIsFetching } from '@tanstack/react-query';
import LoadingSpinner from '../../shared/UI/LoadingSpinner';

const Header: React.FC = () => {
  const isFetching = useIsFetching();

  const isLoading = isFetching > 0;

  return (
    <header className="header">
      <Link to="/" className="header__title">
        <p>Podcaster</p>
      </Link>
      {isLoading && <LoadingSpinner size={18} />}
    </header>
  );
};

export default Header;
