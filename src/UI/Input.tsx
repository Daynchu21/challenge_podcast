import React from 'react';

export type InputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  name?: string;
  id?: string;
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
  autoFocus?: boolean;
};

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder = '',
  type = 'text',
  name,
  id,
  className,
  ariaLabel,
  disabled = false,
  autoFocus = false,
}) => {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      name={name}
      id={id}
      className={className}
      aria-label={ariaLabel}
      disabled={disabled}
      autoFocus={autoFocus}
      style={{
        padding: '0.5rem 1rem',
        borderRadius: '0.5rem',
        border: '1px solid #ccc',
        fontSize: '1rem',
        outline: 'none',
        width: '100%',
        boxSizing: 'border-box',
      }}
    />
  );
};

export default Input;
