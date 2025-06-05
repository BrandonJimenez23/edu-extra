import clsx from 'clsx';
import Button from '../ui/Button';

export default function Form({
    children,
    className = '',
    onSubmit,
    onReset,
    submitText = 'Enviar',
    resetText = 'Cancelar',
    loading = false,
    size = 'md',
    columns = 1,
    variant = 'primary',
    ...props
}) {
    const formClasses = clsx(
        className,
        size && `form-${size}`,
        columns === 2 && 'form-double-column',
        columns === 1 && 'form-single-column'
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(e);
        }
    };

    return (
        <form
            className={formClasses}
            onSubmit={handleSubmit}
            onReset={onReset}
            {...props}
        >
            {children}
            <div className="flex gap-4 mt-6 justify-end">
                {onReset && (
                    <Button 
                        type="reset" 
                        disabled={loading} 
                        variant="secondary" 
                        ghost={true}
                        size={size}
                    >
                        {resetText}
                    </Button>
                )}
                <Button 
                    type="submit" 
                    disabled={loading}
                    variant={variant}
                    size={size}
                >
                    {loading ? 'Cargando...' : submitText}
                </Button>
            </div>
        </form>
    );
}