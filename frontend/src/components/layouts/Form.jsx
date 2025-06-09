import clsx from 'clsx';
import Button from '../ui/Button';

/**
 * Form Layout Component
 * 
 * A highly flexible and reusable form layout component that provides consistent
 * styling, structure, and behavior for forms throughout the application.
 * Handles responsive layouts, loading states, and action button management.
 * 
 * Key Features:
 * - Responsive column layouts (1 or 2 columns)
 * - Configurable spacing between form elements
 * - Automatic action button positioning and styling
 * - Loading state management with disabled controls
 * - Consistent submit/reset button handling
 * - Full accessibility support
 * 
 * Design Philosophy:
 * - Mobile-first responsive design
 * - Consistent spacing and alignment
 * - Clear visual hierarchy
 * - Intuitive user interactions
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Form field content and elements
 * @param {string} props.className - Additional CSS classes for customization
 * @param {Function} props.onSubmit - Form submission handler (required)
 * @param {Function} props.onReset - Form reset/cancel handler (optional - hides reset button if not provided)
 * @param {string} props.submitText - Text for submit button
 * @param {string} props.resetText - Text for reset/cancel button
 * @param {boolean} props.loading - Loading state - disables buttons and shows loading text
 * @param {'sm' | 'md' | 'lg'} props.size - Button size variant for consistent sizing
 * @param {1 | 2} props.columns - Number of form columns (responsive on larger screens)
 * @param {'primary' | 'secondary'} props.variant - Submit button style variant
 * @param {'tight' | 'normal' | 'relaxed' | 'loose'} props.spacing - Spacing between form elements
 * 
 * @example
 * // Basic single-column form
 * <Form onSubmit={handleSubmit} submitText="Save">
 *   <FormField>
 *     <Input label="Name" />
 *   </FormField>
 * </Form>
 * 
 * // Advanced two-column form with all options
 * <Form
 *   onSubmit={handleSubmit}
 *   onReset={handleReset}
 *   submitText="Create User"
 *   resetText="Cancel"
 *   loading={loading}
 *   columns={2}
 *   spacing="relaxed"
 *   variant="primary"
 *   size="md"
 * >
 *   <div>Column 1 content</div>
 *   <div>Column 2 content</div>
 * </Form>
 */
export default function Form({
    children,
    className = '',
    onSubmit,
    onReset,
    submitText = 'Submit',
    resetText = 'Cancel',
    loading = false,
    size = 'md',
    columns = 1,
    variant = 'primary',
    spacing = 'normal',
    ...props
}) {
    // Spacing variants between form elements
    // These provide consistent vertical rhythm throughout the application
    const spacingClasses = {
        tight: 'gap-3',      // 12px - Minimal spacing for compact forms (mobile, dialogs)
        normal: 'gap-4',     // 16px - Standard spacing for most forms (default)
        relaxed: 'gap-6',    // 24px - Extra spacing for spacious layouts (desktop)
        loose: 'gap-8'       // 32px - Maximum spacing for very spacious layouts (landing pages)
    };

    // Form layout configuration based on column setting
    // Single column: Simple flex layout for mobile-friendly stacking
    // Two column: CSS Grid with responsive breakpoint for desktop optimization
    const layoutClasses = clsx(
        'w-full',
        // Column layout options
        columns === 1 && 'flex flex-col',                                    // Single column: stack vertically
        columns === 2 && 'grid grid-cols-1 md:grid-cols-2 items-start',     // Two column: responsive grid
        // Apply spacing between form elements
        spacingClasses[spacing]
    );

    // Action buttons container styling
    // Positioned at the bottom with consistent spacing and alignment
    const actionsClasses = clsx(
        'flex gap-4 mt-6 justify-end',
        // In two-column layout, action buttons span the full width
        columns === 2 && 'md:col-span-2'
    );

    /**
     * Handle form submission with automatic default prevention
     * Ensures consistent form behavior across the application
     * 
     * @param {Event} e - Form submit event
     */
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default browser form submission
        
        if (onSubmit && typeof onSubmit === 'function') {
            onSubmit(e);
        }
    };

    return (
        <form
            className={clsx(layoutClasses, className)}
            onSubmit={handleSubmit}
            onReset={onReset}
            noValidate // Disable browser validation (we use custom validation)
            {...props}
        >
            {/* Form content area */}
            {children}
            
            {/* Action buttons section */}
            {/* Buttons are always rendered at the bottom with consistent styling */}
            <div className={actionsClasses}>
                {/* Reset/Cancel button - conditionally rendered */}
                {/* Only shows if onReset handler is provided */}
                {onReset && (
                    <Button 
                        type="reset" 
                        disabled={loading} 
                        variant="secondary" 
                        ghost={true}
                        size={size}
                        aria-label={`${resetText} form`}
                    >
                        {resetText}
                    </Button>
                )}
                
                {/* Submit button with loading state management */}
                {/* Shows loading text and disables interaction during submission */}
                <Button 
                    type="submit" 
                    disabled={loading}
                    variant={variant}
                    size={size}
                    aria-label={loading ? 'Form submitting' : `${submitText} form`}
                >
                    {loading ? 'Processing...' : submitText}
                </Button>
            </div>
        </form>
    );
}