import React from 'react';

const LoadingSpinner: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <div className="loading-spinner" style={{ width: size, height: size }} aria-label="Loading..." />
);

export default LoadingSpinner;
