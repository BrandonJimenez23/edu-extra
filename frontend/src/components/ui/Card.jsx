import clsx from 'clsx';

/**
 * Card Component
 * 
 * A flexible container component for grouping related content with optional header and footer.
 * Provides consistent styling with shadows, rounded corners, and proper content spacing.
 * Built with Tailwind CSS for consistent styling.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Main card content
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.title - Optional card title displayed in header
 * @param {string} props.subtitle - Optional card subtitle displayed below title
 * @param {React.ReactNode} props.footer - Optional footer content
 */
export default function Card({
    children,
    className = '',
    title = '',
    subtitle = '',
    footer = null,
    ...props
}) {
    // Combine base card styles with custom classes
    const cardClasses = clsx(
        // Base card styling with shadow and rounded corners
        'bg-white shadow-md rounded-lg overflow-hidden',
        className
    );

    return (
        <div className={cardClasses} {...props}>
            {/* Card header section - only renders if title or subtitle exists */}
            {(title || subtitle) && (
                <div className="border-b border-gray-200 p-4 bg-gray-50">
                    {title && <h3 className="text-lg font-heading font-medium text-gray-900">{title}</h3>}
                    {subtitle && <p className="mt-1 text-sm text-gray-600">{subtitle}</p>}
                </div>
            )}
            
            {/* Main card content area */}
            <div className="p-4">
                {children}
            </div>
            
            {/* Card footer section - only renders if footer content exists */}
            {footer && (
                <div className="border-t border-gray-200 p-4 bg-gray-50">
                    {footer}
                </div>
            )}
        </div>
    );
}
