import clsx from 'clsx';

export default function Input({
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
    ...props
}) {
    const inputClasses = clsx(
        'form-input w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none',
        {
            'border-gray-300 focus:ring-2 focus:ring-blue-ribbon-500 focus:border-blue-ribbon-500': !error,
            'border-coral-red-500 focus:ring-2 focus:ring-coral-red-500 focus:border-coral-red-500': error,
            'bg-gray-100 cursor-not-allowed': disabled
        },
        className
    );

    return (
        <div className="w-full">
            <input
                id={id}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                required={required}
                className={inputClasses}
                {...props}
            />
            {error && <p className="mt-1 text-sm text-coral-red-600">{error}</p>}
        </div>
    );
}
