import clsx from 'clsx';

/**
 * FormField Component
 * 
 * A semantic container component for form fields that provides consistent spacing
 * and structure for all form input elements. Helps maintain visual hierarchy
 * and proper form layout throughout the application.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Form field content (inputs, labels, etc.)
 * @param {string} props.className - Additional CSS classes
 * @param {'tight' | 'normal' | 'relaxed' | 'none'} props.spacing - Bottom margin spacing variant
 * @param {boolean} props.required - Whether the field is required (for styling hooks)
 * @param {boolean} props.error - Whether the field has an error (for styling hooks)
 */
const FormField = ({
    children,
    className = '',
    spacing = 'normal',
    required = false,
    error = false,
    ...props
}) => {
    // Spacing variants for different form layouts
    const spacingClasses = {
        tight: 'mb-3',      // Minimal spacing for compact forms
        normal: 'mb-4',     // Standard spacing for most forms
        relaxed: 'mb-6',    // Extra spacing for spacious layouts
        none: ''            // No bottom margin
    };

    // Combine field classes with conditional styling hooks
    const fieldClasses = clsx(
        // Base field container styling
        'w-full',
        // Spacing variant
        spacingClasses[spacing],
        // State-based styling hooks for CSS selectors
        {
            'has-error': error,      // CSS hook for error state styling
            'is-required': required  // CSS hook for required field styling
        },
        className
    );

    return (
        <div className={fieldClasses} {...props}>
            {children}
        </div>
    );
};


FormField.displayName = 'FormField';

export default FormField;
