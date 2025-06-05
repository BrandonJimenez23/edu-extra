import clsx from 'clsx';

export default function Card({
    children,
    className = '',
    title = '',
    subtitle = '',
    footer = null,
    ...props
}) {
    const cardClasses = clsx(
        'bg-white shadow-md rounded-lg overflow-hidden',
        className
    );

    return (
        <div className={cardClasses} {...props}>
            {(title || subtitle) && (
                <div className="border-b border-gray-200 p-4 bg-gray-50">
                    {title && <h3 className="text-lg font-heading font-medium text-gray-900">{title}</h3>}
                    {subtitle && <p className="mt-1 text-sm text-gray-600">{subtitle}</p>}
                </div>
            )}
            <div className="p-4">
                {children}
            </div>
            {footer && (
                <div className="border-t border-gray-200 p-4 bg-gray-50">
                    {footer}
                </div>
            )}
        </div>
    );
}
