import clsx from 'clsx';

export default function Table({
    size = 'md', 
    bordered = false,
    hover = false,
    zebra = false,
    className = '',    
    ...props           
}) {
    const classes = clsx(
        size && `table-${size}`,
        bordered && 'table-bordered',   
        hover && 'table-hover',         
        zebra && 'table-zebra'          
    );

    return (
        <table className={`${classes} ${className}`} {...props}>
            {props.children}
        </table>
    );
}
