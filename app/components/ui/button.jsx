import React from 'react';

export const Button = ({ 
  variant = "default", 
  size = "default", 
  className, 
  asChild = false,
  ...props 
}) => {
  const Comp = asChild ? React.cloneElement : "button";
  
  const variantClasses = {
    default: "bg-amber-500 text-white hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700",
    destructive: "bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600",
    ghost: "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800",
    link: "bg-transparent underline-offset-4 hover:underline text-amber-500 dark:text-amber-400",
  };
  
  const sizeClasses = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3 rounded-md",
    lg: "h-11 px-8 rounded-md",
    icon: "h-10 w-10",
  };

  return (
    <Comp
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ${
        variantClasses[variant] || variantClasses.default
      } ${sizeClasses[size] || sizeClasses.default} ${className || ''}`}
      {...props}
    />
  );
}; 