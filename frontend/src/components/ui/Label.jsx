import clsx from 'clsx';

export default function Label({
    children,
    htmlFor,
    className = '',
    required = false,
    ...props
}) {
    const labelClasses = clsx(
        'form-label block text-sm font-medium text-gray-700 mb-1',
        className
    );

    return (
        <label htmlFor={htmlFor} className={labelClasses} {...props}>
            {children}
            {required && <span className="text-coral-red-600 ml-1">*</span>}
        </label>
    );
}
