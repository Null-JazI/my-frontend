import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  variant = 'default',
  hover = false,
  padding = 'default',
  shadow = 'default',
  ...props 
}) => {
  const baseClasses = 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all duration-300';
  
  const variants = {
    default: 'rounded-xl',
    minimal: 'rounded-lg',
    elevated: 'rounded-xl shadow-xl',
    glass: 'backdrop-blur-md bg-white/10 dark:bg-gray-900/10 border-white/20 dark:border-gray-700/20 rounded-xl'
  };
  
  const paddings = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };
  
  const shadows = {
    none: '',
    sm: 'shadow-sm',
    default: 'shadow-lg',
    lg: 'shadow-xl',
    xl: 'shadow-2xl'
  };
  
  const hoverClasses = hover ? 'hover:shadow-xl hover:-translate-y-1 hover:border-blue-300 dark:hover:border-blue-600 cursor-pointer' : '';
  
  const variantClasses = variants[variant] || variants.default;
  const paddingClasses = paddings[padding] || paddings.default;
  const shadowClasses = shadows[shadow] || shadows.default;
  
  return (
    <div
      className={`${baseClasses} ${variantClasses} ${paddingClasses} ${shadowClasses} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// Card Header Component
const CardHeader = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`border-b border-gray-200 dark:border-gray-700 pb-4 mb-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// Card Title Component
const CardTitle = ({ children, className = '', as: Component = 'h3', ...props }) => {
  return (
    <Component 
      className={`text-lg font-semibold text-gray-900 dark:text-white ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

// Card Content Component
const CardContent = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`text-gray-600 dark:text-gray-300 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// Card Footer Component
const CardFooter = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`border-t border-gray-200 dark:border-gray-700 pt-4 mt-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// Card Image Component
const CardImage = ({ src, alt, className = '', objectFit = 'cover', ...props }) => {
  return (
    <div className="overflow-hidden rounded-t-xl">
      <img
        src={src}
        alt={alt}
        className={`w-full h-48 object-${objectFit} transition-transform duration-300 hover:scale-105 ${className}`}
        {...props}
      />
    </div>
  );
};

// Attach sub-components to main Card component
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Content = CardContent;
Card.Footer = CardFooter;
Card.Image = CardImage;

export default Card;