import React from 'react';

const LoadingSpinner = ({ 
  size = 'md', 
  color = 'blue', 
  variant = 'spin',
  className = '',
  text = '',
  ...props 
}) => {
  const sizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
    '2xl': 'w-16 h-16'
  };
  
  const colors = {
    blue: 'text-blue-600',
    gray: 'text-gray-600',
    green: 'text-green-600',
    red: 'text-red-600',
    yellow: 'text-yellow-600',
    purple: 'text-purple-600',
    pink: 'text-pink-600',
    indigo: 'text-indigo-600'
  };
  
  const sizeClasses = sizes[size] || sizes.md;
  const colorClasses = colors[color] || colors.blue;
  
  // Spinning Circle Loader
  const SpinLoader = () => (
    <svg 
      className={`animate-spin ${sizeClasses} ${colorClasses} ${className}`}
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
      {...props}
    >
      <circle 
        className="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="4"
      />
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
  
  // Pulsing Dots Loader
  const DotsLoader = () => (
    <div className={`flex space-x-1 ${className}`} {...props}>
      <div className={`${sizeClasses} ${colorClasses} bg-current rounded-full animate-pulse`} style={{ animationDelay: '0ms' }}></div>
      <div className={`${sizeClasses} ${colorClasses} bg-current rounded-full animate-pulse`} style={{ animationDelay: '150ms' }}></div>
      <div className={`${sizeClasses} ${colorClasses} bg-current rounded-full animate-pulse`} style={{ animationDelay: '300ms' }}></div>
    </div>
  );
  
  // Bouncing Dots Loader
  const BouncingDotsLoader = () => (
    <div className={`flex space-x-1 ${className}`} {...props}>
      <div className={`${sizeClasses} ${colorClasses} bg-current rounded-full animate-bounce`} style={{ animationDelay: '0ms' }}></div>
      <div className={`${sizeClasses} ${colorClasses} bg-current rounded-full animate-bounce`} style={{ animationDelay: '150ms' }}></div>
      <div className={`${sizeClasses} ${colorClasses} bg-current rounded-full animate-bounce`} style={{ animationDelay: '300ms' }}></div>
    </div>
  );
  
  // Bars Loader
  const BarsLoader = () => (
    <div className={`flex space-x-1 items-end ${className}`} {...props}>
      <div className={`w-1 bg-current ${colorClasses} rounded-full animate-pulse`} style={{ height: '20px', animationDelay: '0ms' }}></div>
      <div className={`w-1 bg-current ${colorClasses} rounded-full animate-pulse`} style={{ height: '30px', animationDelay: '150ms' }}></div>
      <div className={`w-1 bg-current ${colorClasses} rounded-full animate-pulse`} style={{ height: '20px', animationDelay: '300ms' }}></div>
      <div className={`w-1 bg-current ${colorClasses} rounded-full animate-pulse`} style={{ height: '30px', animationDelay: '450ms' }}></div>
    </div>
  );
  
  // Ring Loader
  const RingLoader = () => (
    <div className={`${sizeClasses} ${className}`} {...props}>
      <div className={`${sizeClasses} border-4 border-gray-200 dark:border-gray-700 border-t-current ${colorClasses} rounded-full animate-spin`}></div>
    </div>
  );
  
  const variants = {
    spin: <SpinLoader />,
    dots: <DotsLoader />,
    bouncing: <BouncingDotsLoader />,
    bars: <BarsLoader />,
    ring: <RingLoader />
  };
  
  const LoaderComponent = variants[variant] || variants.spin;
  
  if (text) {
    return (
      <div className="flex flex-col items-center space-y-2">
        {LoaderComponent}
        <p className={`text-sm ${colorClasses} animate-pulse`}>{text}</p>
      </div>
    );
  }
  
  return LoaderComponent;
};

// Full Page Loading Overlay
const LoadingOverlay = ({ 
  isLoading = true, 
  text = 'Loading...', 
  children,
  className = '',
  ...props 
}) => {
  if (!isLoading) return children;
  
  return (
    <div className={`fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50 ${className}`} {...props}>
      <div className="text-center">
        <LoadingSpinner size="xl" variant="spin" />
        {text && (
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 animate-pulse">
            {text}
          </p>
        )}
      </div>
    </div>
  );
};

// Inline Loading State
const InlineLoader = ({ 
  isLoading = true, 
  children, 
  fallback,
  className = '',
  ...props 
}) => {
  if (!isLoading) return children;
  
  return (
    <div className={`flex items-center justify-center py-8 ${className}`} {...props}>
      {fallback || <LoadingSpinner />}
    </div>
  );
};

// Attach sub-components
LoadingSpinner.Overlay = LoadingOverlay;
LoadingSpinner.Inline = InlineLoader;

export default LoadingSpinner;