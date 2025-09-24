import React from 'react';

interface ImageProps {
  src: string;
  alt: string;
  ariaLabel: string;
  size?: number;
  className?: string;
  rounded?: boolean;
}

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  ariaLabel,
  size = 300,
  className,
  rounded = false,
}) => {
  return (
    <img
      src={src}
      alt={alt}
      aria-label={ariaLabel}
      className={className}
      style={{
        width: size,
        height: size,
        objectFit: 'cover',
        borderRadius: rounded ? '50%' : '0.5rem',
      }}
    />
  );
};

export default Image;
