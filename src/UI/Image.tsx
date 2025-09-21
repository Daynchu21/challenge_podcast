import React from 'react';

interface ImageProps {
  src: string;
  alt: string;
  ariaLabel: string;
  size?: number;
  className?: string;
}

const Image: React.FC<ImageProps> = ({ src, alt, ariaLabel, size = 300, className }) => {
  return (
    <img
      src={src}
      alt={alt}
      aria-label={ariaLabel}
      width={size}
      height={size}
      className={className}
      style={{ objectFit: 'cover', borderRadius: '50%' }}
    />
  );
};

export default Image;
