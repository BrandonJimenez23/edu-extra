import clsx from 'clsx';

/**
 * Badge Component
 * 
 * A versatile badge component for displaying status indicators, labels, or counters.
 * Supports multiple color variants, sizes, and border radius options.
 * Built with Tailwind CSS for consistent styling.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Badge content
 * @param {'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'dark'} props.variant - Badge color variant
 * @param {'sm' | 'md' | 'lg'} props.size - Badge size variant
 * @param {'none' | 'sm' | 'normal' | 'md' | 'lg' | 'full'} props.rounded - Border radius variant
 * @param {string} props.className - Additional CSS classes
 */
const Badge = ({
    children,
    variant = 'default',
    size = 'md',
    rounded = 'normal',
    className = '',
    ...props
}) => {
    // Color variants for different badge types
    const variantClasses = {
        default: 'bg-gray-100 text-gray-800',
        primary: 'bg-blue-ribbon-100 text-blue-ribbon-800',
        secondary: 'bg-emerald-100 text-emerald-800',
        success: 'bg-green-100 text-green-800',
        warning: 'bg-sunglow-100 text-sunglow-800',
        danger: 'bg-coral-red-100 text-coral-red-800',
        info: 'bg-blue-100 text-blue-800',
        dark: 'bg-gray-800 text-white'
    };

    // Size variants with appropriate padding and text sizes
    const sizeClasses = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-1 text-sm',
        lg: 'px-3 py-1.5 text-base'
    };

    // Border radius variants for different visual styles
    const roundedClasses = {
        none: 'rounded-none',
        sm: 'rounded-sm',
        normal: 'rounded',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full'
    };

    return (
        <span
            className={clsx(
                // Base styles for inline badge display
                'inline-flex items-center font-medium',
                // Color variant styling
                variantClasses[variant],
                // Size variant styling
                sizeClasses[size],
                // Border radius styling
                roundedClasses[rounded],
                className
            )}
            {...props}
        >
            {children}
        </span>
    );
};

Badge.displayName = 'Badge';

export default Badge;
