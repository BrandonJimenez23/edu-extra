import clsx from 'clsx';

export default function Select({
    id,
    name,
    value,
    onChange,
    options = [],
    placeholder = 'Seleccionar...',
    className = '',
    disabled = false,
    error = '',
    required = false,
    ...props
}) {
    const selectClasses = clsx(
        'form-select w-full px-4 py-2 border rounded-md shadow-sm appearance-none focus:outline-none',
        {
            'border-gray-300 focus:ring-2 focus:ring-blue-ribbon-500 focus:border-blue-ribbon-500': !error,
            'border-coral-red-500 focus:ring-2 focus:ring-coral-red-500 focus:border-coral-red-500': error,
            'bg-gray-100 cursor-not-allowed': disabled
        },
        className
    );

    return (
        <div className="w-full relative">
            <select
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                required={required}
                className={selectClasses}
                {...props}
            >
                <option value="" disabled>{placeholder}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
            </div>
            {error && <p className="mt-1 text-sm text-coral-red-600">{error}</p>}
        </div>
    );
}
