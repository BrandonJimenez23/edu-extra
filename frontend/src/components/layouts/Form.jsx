import clsx from 'clsx';
import Button from '../ui/Button';

/**
 * Form Component
 * 
 * A flexible form layout component that provides consistent styling and structure
 * for forms throughout the application. Supports different column layouts,
 * spacing variants, and automatic action button management.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Form field content
 * @param {string} props.className - Additional CSS classes
 * @param {Function} props.onSubmit - Form submission handler
 * @param {Function} props.onReset - Form reset handler (optional)
 * @param {string} props.submitText - Submit button text
 * @param {string} props.resetText - Reset button text
 * @param {boolean} props.loading - Loading state for submit button
 * @param {'sm' | 'md' | 'lg'} props.size - Button size variant
 * @param {1 | 2} props.columns - Number of form columns
 * @param {'primary' | 'secondary'} props.variant - Submit button variant
 * @param {'tight' | 'normal' | 'relaxed' | 'loose'} props.spacing - Form field spacing
 */
export default function Form({
    children,
    className = '',
    onSubmit,
    onReset,
    submitText = 'Send',
    resetText = 'Cancel',
    loading = false,
    size = 'md',
    columns = 1,
    variant = 'primary',
    spacing = 'normal',
    ...props
}) {
    // Spacing variants between form elements
    const spacingClasses = {
        tight: 'gap-3',      // Minimal spacing for compact forms
        normal: 'gap-4',     // Standard spacing for most forms
        relaxed: 'gap-6',    // Extra spacing for spacious layouts
        loose: 'gap-8'       // Maximum spacing for very spacious layouts
    };

    // Form layout based on column configuration
    const layoutClasses = clsx(
        'w-full',
        // Column layout options
        columns === 1 && 'flex flex-col',                                    // Single column layout
        columns === 2 && 'grid grid-cols-1 md:grid-cols-2 items-start',     // Two column responsive layout
        // Spacing between elements
        spacingClasses[spacing]
    );

    // Action buttons container styling
    const actionsClasses = clsx(
        'flex gap-4 mt-6 justify-end',
        // In two-column layout, buttons span full width
        columns === 2 && 'md:col-span-2'
    );

    // Handle form submission with default prevention
    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(e);
        }
    };

    return (
        <form
            className={clsx(layoutClasses, className)}
            onSubmit={handleSubmit}
            onReset={onReset}
            {...props}
        >
            {children}
            
            {/* Action buttons section */}
            <div className={actionsClasses}>
                {/* Reset button - only rendered if onReset handler provided */}
                {onReset && (
                    <Button 
                        type="reset" 
                        disabled={loading} 
                        variant="secondary" 
                        ghost={true}
                        size={size}
                    >
                        {resetText}
                    </Button>
                )}
                
                {/* Submit button with loading state */}
                <Button 
                    type="submit" 
                    disabled={loading}
                    variant={variant}
                    size={size}
                >
                    {loading ? 'Loading...' : submitText}
                </Button>
            </div>
        </form>
    );
}