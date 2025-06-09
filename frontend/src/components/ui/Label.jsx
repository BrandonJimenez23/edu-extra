import clsx from 'clsx';

/**
 * Label Component
 * 
 * A semantic label component for form inputs with consistent styling and
 * optional required field indicator. Ensures proper accessibility by
 * associating labels with their corresponding form controls.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Label text content
 * @param {string} props.htmlFor - ID of the associated form control
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.required - Whether to display required indicator (*)
 */
export default function Label({
    children,
    htmlFor,
    className = '',
    required = false,
    ...props
}) {
    // Combine base label styles with custom classes
    const labelClasses = clsx(
        // Base label styling for consistent form appearance
        'form-label block text-sm font-medium text-gray-700 mb-1',
        className
    );

    return (
        <label htmlFor={htmlFor} className={labelClasses} {...props}>
            {children}
            {/* Required field indicator */}
            {required && <span className="text-coral-red-600 ml-1">*</span>}
        </label>
    );
}
