import { forwardRef } from 'react';

/**
 * Switch Component
 * 
 * A toggle switch component for switching between two states.
 * Follows the same design patterns as other UI components.
 */
const Switch = forwardRef(({ 
  checked = false, 
  onCheckedChange, 
  disabled = false,
  label,
  description,
  size = 'md',
  className = '',
  ...props 
}, ref) => {
  const sizeClasses = {
    sm: 'h-4 w-8',
    md: 'h-6 w-11',
    lg: 'h-8 w-14'
  };

  const thumbSizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-5 w-5', 
    lg: 'h-7 w-7'
  };

  const translateClasses = {
    sm: checked ? 'translate-x-4' : 'translate-x-0',
    md: checked ? 'translate-x-5' : 'translate-x-0',
    lg: checked ? 'translate-x-6' : 'translate-x-0'
  };

  const handleToggle = () => {
    if (!disabled && onCheckedChange) {
      onCheckedChange(!checked);
    }
  };

  const switchClasses = `
    relative inline-flex items-center rounded-full transition-colors duration-200 ease-in-out
    ${sizeClasses[size]}
    ${checked 
      ? 'bg-blue-ribbon-500 hover:bg-blue-ribbon-600' 
      : 'bg-gray-300 hover:bg-gray-400'
    }
    ${disabled 
      ? 'opacity-50 cursor-not-allowed' 
      : 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-ribbon-500 focus:ring-offset-2'
    }
    ${className}
  `.trim();

  const thumbClasses = `
    inline-block rounded-full bg-white shadow-lg transform transition-transform duration-200 ease-in-out
    ${thumbSizeClasses[size]}
    ${translateClasses[size]}
  `.trim();

  return (
    <div className="flex items-center">
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-disabled={disabled}
        onClick={handleToggle}
        className={switchClasses}
        {...props}
      >
        <span className={thumbClasses} />
      </button>
      
      {(label || description) && (
        <div className="ml-3">
          {label && (
            <span className={`text-sm font-medium ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>
              {label}
            </span>
          )}
          {description && (
            <p className={`text-xs ${disabled ? 'text-gray-300' : 'text-gray-500'}`}>
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
});

Switch.displayName = 'Switch';

export default Switch;
