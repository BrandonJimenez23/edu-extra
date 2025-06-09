import { forwardRef } from 'react';
import clsx from 'clsx';

/**
 * Input Component
 * 
 * A flexible input component with multiple variants, sizes, and validation states.
 * Supports labels, helper text, error messages, and accessibility features.
 * Built with Tailwind CSS for consistent styling.
 * 
 * @param {Object} props - Component props
 * @param {string} props.id - Input ID for accessibility
 * @param {string} props.name - Input name attribute
 * @param {'text' | 'email' | 'password' | 'number' | 'url' | 'tel'} props.type - Input type
 * @param {string} props.value - Input value
 * @param {Function} props.onChange - Change handler function
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.disabled - Disabled state
 * @param {string} props.error - Error message to display
 * @param {boolean} props.required - Required field indicator
 * @param {'sm' | 'md' | 'lg'} props.size - Input size variant
 * @param {'default' | 'filled' | 'outlined'} props.variant - Input style variant
 * @param {string} props.label - Input label text
 * @param {string} props.helperText - Helper text below input
 * @param {Object} props.ref - React ref for input element
 */
const Input = forwardRef(({
    id,
    name,
    type = 'text',
    value,
    onChange,
    placeholder = '',
    className = '',
    disabled = false,
    error = '',
    required = false,
    size = 'md',
    variant = 'default',
    label,
    helperText,
    ...props
}, ref) => {
    // Size variants with appropriate padding and text sizes
    const sizeClasses = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-5 py-3 text-lg'
    };

    // Style variants for different visual approaches
    const variantClasses = {
        default: 'border-gray-300 focus:border-blue-ribbon-500 focus:ring-blue-ribbon-500',
        filled: 'bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-ribbon-500 focus:ring-blue-ribbon-500',
        outlined: 'border-2 border-gray-300 focus:border-blue-ribbon-500 focus:ring-0'
    };

    // Combine all input classes with conditional styling
    const inputClasses = clsx(
        // Base styles with transitions and accessibility
        'w-full rounded-md shadow-sm transition-colors duration-200',
        'focus:outline-none focus:ring-2 focus:ring-opacity-50',
        'placeholder:text-gray-400',
        // Size variants
        sizeClasses[size],
        // Style variants (only applied when no error)
        !error && variantClasses[variant],
        // State-based styling
        {
            'border-coral-red-500 focus:border-coral-red-500 focus:ring-coral-red-500': error,
            'bg-gray-100 cursor-not-allowed opacity-60': disabled,
        },
        className
    );

    const errorId = error ? `${id || name}-error` : undefined;

    return (
        <div className="w-full">
            {label && (
                <label 
                    htmlFor={id || name}
                    className={clsx(
                        'block font-medium text-gray-700 mb-1',
                        size === 'sm' && 'text-sm',
                        size === 'md' && 'text-sm',
                        size === 'lg' && 'text-base'
                    )}
                >
                    {label}
                    {required && <span className="text-coral-red-500 ml-1">*</span>}
                </label>
            )}
            
            <input
                ref={ref}
                id={id}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                required={required}
                className={inputClasses}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby={clsx(
                    error && errorId,
                    helperText && `${id || name}-helper`
                )}
                {...props}
            />
            
            {error && (
                <p 
                    id={errorId}
                    className={clsx(
                        'mt-1 text-coral-red-600',
                        size === 'sm' && 'text-xs',
                        size === 'md' && 'text-sm',
                        size === 'lg' && 'text-base'
                    )}
                    role="alert"
                >
                    {error}
                </p>
            )}
            
            {helperText && !error && (
                <p 
                    id={`${id || name}-helper`}
                    className={clsx(
                        'mt-1 text-gray-500',
                        size === 'sm' && 'text-xs',
                        size === 'md' && 'text-sm',
                        size === 'lg' && 'text-base'
                    )}
                >
                    {helperText}
                </p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
