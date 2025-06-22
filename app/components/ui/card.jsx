import React from 'react';

export const Card = ({ className, ...props }) => {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm ${className || ''}`}
      {...props}
    />
  );
};

export const CardHeader = ({ className, ...props }) => {
  return <div className={`p-6 ${className || ''}`} {...props} />;
};

export const CardTitle = ({ className, ...props }) => {
  return <h3 className={`text-2xl font-semibold ${className || ''}`} {...props} />;
};

export const CardDescription = ({ className, ...props }) => {
  return <p className={`text-gray-500 dark:text-gray-400 ${className || ''}`} {...props} />;
};

export const CardContent = ({ className, ...props }) => {
  return <div className={`p-6 pt-0 ${className || ''}`} {...props} />;
};

export const CardFooter = ({ className, ...props }) => {
  return <div className={`p-6 pt-0 flex items-center ${className || ''}`} {...props} />;
}; 