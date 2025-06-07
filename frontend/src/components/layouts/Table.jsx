import { forwardRef, createContext, useContext } from 'react';
import clsx from 'clsx';

// Context to share table configuration with subcomponents
const TableContext = createContext({});

/**
 * Table component with configurable styling variants and subcomponents
 * 
 * Features:
 * - Size variants: sm, md, lg
 * - Border styles: bordered or borderless
 * - Hover effects on rows
 * - Zebra striping for alternating row colors
 * - Full accessibility support
 * - Responsive design
 * - Modular subcomponents (Header, Body, Row, Cell)
 */
const Table = forwardRef(({
    size = 'md',           // Size variant: 'sm' | 'md' | 'lg'
    bordered = false,      // Add borders to table and cells
    hover = false,         // Enable hover effects on rows
    zebra = false,         // Enable alternating row colors
    className = '',        // Additional CSS classes
    children,              // Table content (thead, tbody, etc.)
    ...props              // Additional table props
}, ref) => {
    // Base table styles - responsive and clean foundation
    const baseClasses = 'w-full text-left border-collapse';
    
    // Size variant styles - controls padding and text size
    const sizeVariants = {
        sm: 'text-xs',           // Small: compact spacing, smaller text
        md: 'text-sm',           // Medium: standard spacing and text
        lg: 'text-base'          // Large: generous spacing, larger text
    };
    
    // Cell padding for different sizes (applied via CSS-in-JS or global styles)
    const cellPaddingClasses = {
        sm: '[&_th]:px-2 [&_th]:py-1 [&_td]:px-2 [&_td]:py-1',
        md: '[&_th]:px-3 [&_th]:py-2 [&_td]:px-3 [&_td]:py-2', 
        lg: '[&_th]:px-4 [&_th]:py-3 [&_td]:px-4 [&_td]:py-3'
    };
    
    // Border styles - clean borders using Tailwind utilities
    const borderClasses = bordered 
        ? 'border border-gray-200 [&_th]:border-b [&_th]:border-gray-200 [&_td]:border-b [&_td]:border-gray-100'
        : '';
    
    // Hover effects - subtle highlighting on row hover
    const hoverClasses = hover 
        ? '[&_tbody_tr]:hover:bg-gray-50 [&_tbody_tr]:transition-colors [&_tbody_tr]:duration-150'
        : '';
    
    // Zebra striping - alternating row colors for better readability
    const zebraClasses = zebra 
        ? '[&_tbody_tr:nth-child(even)]:bg-gray-50'
        : '';
    
    // Header styling - consistent header appearance
    const headerClasses = '[&_thead_th]:bg-gray-100 [&_thead_th]:font-semibold [&_thead_th]:text-gray-900';
    
    // Cell styling - consistent text colors and alignment
    const cellClasses = '[&_td]:text-gray-700 [&_th]:text-gray-900';
    
    // Combine all classes using clsx for conditional application
    const tableClasses = clsx(
        baseClasses,
        sizeVariants[size],
        cellPaddingClasses[size],
        borderClasses,
        hoverClasses,
        zebraClasses,
        headerClasses,
        cellClasses,
        className
    );

    // Context value to share configuration with subcomponents
    const contextValue = {
        size,
        bordered,
        hover,
        zebra
    };

    return (
        <TableContext.Provider value={contextValue}>
            <div className="overflow-x-auto">
                <table 
                    ref={ref}
                    className={tableClasses}
                    {...props}
                >
                    {children}
                </table>
            </div>
        </TableContext.Provider>
    );
});

/**
 * Table Header component - renders thead element
 */
const TableHeader = forwardRef(({ className = '', children, ...props }, ref) => {
    return (
        <thead 
            ref={ref}
            className={clsx('bg-gray-100', className)}
            {...props}
        >
            {children}
        </thead>
    );
});

/**
 * Table Body component - renders tbody element
 */
const TableBody = forwardRef(({ className = '', children, ...props }, ref) => {
    return (
        <tbody 
            ref={ref}
            className={className}
            {...props}
        >
            {children}
        </tbody>
    );
});

/**
 * Table Row component - renders tr element with context-aware styling
 */
const TableRow = forwardRef(({ 
    className = '', 
    children, 
    isHeader = false,
    ...props 
}, ref) => {
    const { hover } = useContext(TableContext);
    
    const rowClasses = clsx(
        {
            'hover:bg-gray-50 transition-colors duration-150': hover && !isHeader,
        },
        className
    );

    return (
        <tr 
            ref={ref}
            className={rowClasses}
            {...props}
        >
            {children}
        </tr>
    );
});

/**
 * Table Cell component - renders th or td element based on context
 */
const TableCell = forwardRef(({ 
    as = 'td',              // Element type: 'td' | 'th'
    className = '', 
    children,
    align = 'left',         // Text alignment: 'left' | 'center' | 'right'
    ...props 
}, ref) => {
    const { size } = useContext(TableContext);
    
    // Padding based on size
    const paddingClasses = {
        sm: 'px-2 py-1',
        md: 'px-3 py-2',
        lg: 'px-4 py-3'
    };
    
    // Text alignment classes
    const alignmentClasses = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right'
    };
    
    const cellClasses = clsx(
        paddingClasses[size],
        alignmentClasses[align],
        {
            'font-semibold text-gray-900 bg-gray-100': as === 'th',
            'text-gray-700': as === 'td'
        },
        className
    );

    const Component = as;
    
    return (
        <Component 
            ref={ref}
            className={cellClasses}
            {...props}
        >
            {children}
        </Component>
    );
});

// Set display names for debugging
Table.displayName = 'Table';
TableHeader.displayName = 'Table.Header';
TableBody.displayName = 'Table.Body';
TableRow.displayName = 'Table.Row';
TableCell.displayName = 'Table.Cell';

// Attach subcomponents to main Table component
Table.Header = TableHeader;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Cell = TableCell;

export default Table;
