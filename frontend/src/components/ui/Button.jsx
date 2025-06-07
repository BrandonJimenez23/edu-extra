import { forwardRef } from 'react';
import clsx from 'clsx';

/**
 * Button Component
 * 
 * A versatile button component with multiple variants, sizes, and states.
 * Built with Tailwind CSS and designed for accessibility and consistency.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Button content
 * @param {'sm' | 'md' | 'lg'} props.size - Button size variant
 * @param {'primary' | 'secondary' | 'warning' | 'danger' | 'outline'} props.variant - Button color variant
 * @param {boolean} props.ghost - Ghost mode (outline style)
 * @param {boolean} props.fullWidth - Full width button
 * @param {boolean} props.disabled - Disabled state
 * @param {boolean} props.loading - Loading state with spinner
 * @param {string} props.className - Additional CSS classes
 * @param {'button' | 'submit' | 'reset'} props.type - Button type
 * @param {Object} props.ref - React ref for button element
 */
const Button = forwardRef(({
    children,
    size = 'md',
    variant = 'primary',
    ghost = false,
    fullWidth = false,
    disabled = false,
    loading = false,
    className = '',
    type = 'button',
    ...props
}, ref) => {
    // Base button styles with accessibility and interaction states
    const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    // Size variants with appropriate padding and text sizes
    const sizeClasses = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-5 py-3 text-lg'
    };

    // Color variants with hover, active, and focus states
    const variantClasses = {
        primary: ghost 
            ? 'bg-white text-blue-ribbon-600 border border-blue-ribbon-600 hover:bg-blue-ribbon-50 active:bg-blue-ribbon-100 focus:ring-blue-ribbon-500'
            : 'bg-blue-ribbon-600 text-white hover:bg-blue-ribbon-700 active:bg-blue-ribbon-800 focus:ring-blue-ribbon-500',
        secondary: ghost
            ? 'bg-white text-emerald-600 border border-emerald-600 hover:bg-emerald-50 active:bg-emerald-100 focus:ring-emerald-500'
            : 'bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 focus:ring-emerald-500',
        warning: ghost
            ? 'bg-white text-sunglow-600 border border-sunglow-600 hover:bg-sunglow-50 active:bg-sunglow-100 focus:ring-sunglow-500'
            : 'bg-sunglow-600 text-white hover:bg-sunglow-700 active:bg-sunglow-800 focus:ring-sunglow-500',
        danger: ghost
            ? 'bg-white text-coral-red-600 border border-coral-red-600 hover:bg-coral-red-50 active:bg-coral-red-100 focus:ring-coral-red-500'
            : 'bg-coral-red-600 text-white hover:bg-coral-red-700 active:bg-coral-red-800 focus:ring-coral-red-500',
        outline: 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-100 active:bg-gray-200 focus:ring-gray-500'
    };

    return (
        <button
            ref={ref}
            type={type}
            disabled={disabled || loading}
            className={clsx(
                baseClasses,
                sizeClasses[size],
                variantClasses[variant],
                fullWidth && 'w-full',
                className
            )}
            {...props}
        >
            {/* Loading spinner - shows when loading prop is true */}
            {loading && (
                <svg 
                    className={clsx(
                        'animate-spin mr-2',
                        size === 'sm' && 'h-3 w-3',
                        size === 'md' && 'h-4 w-4',
                        size === 'lg' && 'h-5 w-5'
                    )} 
                    fill="none" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
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
            )}
            {children}
        </button>
    );
});

// Set display name for debugging
Button.displayName = 'Button';

export default Button;
