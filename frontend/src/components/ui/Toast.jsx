import { useEffect, forwardRef } from 'react';
import { X, CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';
import clsx from 'clsx';

const iconMap = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertTriangle,
    info: Info
};

// Usando tu paleta de colores personalizada
const variantClasses = {
    success: {
        container: 'bg-emerald-50 border-emerald-200 text-emerald-800',
        icon: 'text-emerald-600',
        title: 'text-emerald-900',
        message: 'text-emerald-700',
        closeButton: 'text-emerald-500 hover:text-emerald-600'
    },
    error: {
        container: 'bg-coral-red-50 border-coral-red-200 text-coral-red-800',
        icon: 'text-coral-red-600',
        title: 'text-coral-red-900',
        message: 'text-coral-red-700',
        closeButton: 'text-coral-red-500 hover:text-coral-red-600'
    },
    warning: {
        container: 'bg-sunglow-50 border-sunglow-200 text-sunglow-800',
        icon: 'text-sunglow-600',
        title: 'text-sunglow-900',
        message: 'text-sunglow-700',
        closeButton: 'text-sunglow-500 hover:text-sunglow-600'
    },
    info: {
        container: 'bg-blue-ribbon-50 border-blue-ribbon-200 text-blue-ribbon-800',
        icon: 'text-blue-ribbon-600',
        title: 'text-blue-ribbon-900',
        message: 'text-blue-ribbon-700',
        closeButton: 'text-blue-ribbon-500 hover:text-blue-ribbon-600'
    }
};

/**
 * Toast Component
 * 
 * Individual notification toast with consistent styling using the app's
 * custom color palette. Features auto-dismiss, manual close, and smooth animations.
 * 
 * @param {Object} props - Component props
 * @param {Object} props.notification - Notification object with type, title, message, etc.
 * @param {Function} props.onRemove - Callback to remove the notification
 * @param {string} props.className - Additional CSS classes
 */
const Toast = forwardRef(({ 
    notification, 
    onRemove, 
    className = '' 
}, ref) => {
    const Icon = iconMap[notification.type] || Info;
    const styles = variantClasses[notification.type] || variantClasses.info;

    useEffect(() => {
        if (notification.duration > 0) {
            const timer = setTimeout(() => {
                onRemove(notification.id);
            }, notification.duration);
            return () => clearTimeout(timer);
        }
    }, [notification, onRemove]);

    // Base classes siguiendo el patrón de tu Button component
    const baseClasses = 'relative border shadow-lg rounded-md transition-all duration-300 transform animate-in slide-in-from-right-full';

    return (
        <div 
            ref={ref}
            className={clsx(
                baseClasses,
                styles.container,
                'p-4',
                className
            )}
        >
            <div className="flex items-start space-x-3">
                {/* Icon con colores específicos del tipo */}
                <Icon className={clsx(
                    'h-5 w-5 mt-0.5 flex-shrink-0',
                    styles.icon
                )} />
                
                {/* Content area */}
                <div className="flex-1 min-w-0">
                    {notification.title && (
                        <h4 className={clsx(
                            'font-medium text-sm font-heading',
                            styles.title
                        )}>
                            {notification.title}
                        </h4>
                    )}
                    <p className={clsx(
                        'text-sm mt-1 font-sans',
                        styles.message
                    )}>
                        {notification.message}
                    </p>
                </div>
                
                {/* Close button con hover states */}
                <button
                    onClick={() => onRemove(notification.id)}
                    className={clsx(
                        'flex-shrink-0 ml-2 transition-colors duration-200',
                        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current',
                        'rounded-sm p-0.5',
                        styles.closeButton
                    )}
                    aria-label="Close notification"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
            
            {/* Progress bar opcional para mostrar tiempo restante */}
            {notification.duration > 0 && (
                <div className="absolute bottom-0 left-0 h-1 bg-current opacity-20 rounded-b-md">
                    <div 
                        className="h-full bg-current rounded-b-md transition-all linear"
                        style={{
                            animation: `toast-progress ${notification.duration}ms linear forwards`
                        }}
                    />
                </div>
            )}
        </div>
    );
});

// Set display name for debugging
Toast.displayName = 'Toast';

export { Toast };