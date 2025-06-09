import { useNotifications } from '../../hooks/useNotifications';
import { Toast } from './Toast';
import clsx from 'clsx';

/**
 * ToastContainer Component
 * 
 * Container for all active toast notifications. Positioned fixed
 * in the top-right corner with proper z-index and responsive spacing.
 */
export function ToastContainer({ className = '' }) {
    const { notifications, removeNotification } = useNotifications();

    if (notifications.length === 0) return null;

    return (
        <div className={clsx(
            // Fixed positioning con z-index alto
            'fixed top-4 right-4 z-50',
            // Responsive spacing y max width
            'space-y-3 max-w-sm w-full',
            // Mobile responsive
            'sm:max-w-md md:max-w-lg',
            // Smooth container animations
            'transition-all duration-300',
            className
        )}>
            {notifications.map((notification, index) => (
                <Toast 
                    key={notification.id} 
                    notification={notification} 
                    onRemove={removeNotification}
                    className={clsx(
                        // Stagger animation delay para múltiples toasts
                        'animate-in slide-in-from-right-full',
                        `animation-delay-${index * 100}`
                    )}
                />
            ))}
        </div>
    );
}