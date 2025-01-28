// components/Button.js
import React from 'react';

const Button = ({ children,  className, variant = 'default', ...props }) => {
  const baseStyles = 'px-4 py-2 font-semibold rounded shadow';
  const variants = {
    default: 'bg-gray-200 text-gray-700 hover:bg-gray-300',
    primary: 'flex  justify-center items-center gap-2 p-3 bg-[#E46D1D] shadow-md text-[#F3F3F3]   text-sm font-medium rounded-md',
    secondary: 'bg-green-500 text-white hover:bg-green-600',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  };

  const classes = `${baseStyles} ${variants[variant]}`;

  return (
    <button className={` ${classes} ${className}  disabled:opacity-75`} {...props}>
      {children}
    </button>
  );
};

export default Button;
