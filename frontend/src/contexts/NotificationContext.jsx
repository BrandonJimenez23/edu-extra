import { createContext, useState, useCallback, useRef } from 'react';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState([]);
    const timeoutsRef = useRef(new Map());

    const removeNotification = useCallback((id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
        
        // Clear timeout if exists
        if (timeoutsRef.current.has(id)) {
            clearTimeout(timeoutsRef.current.get(id));
            timeoutsRef.current.delete(id);
        }
    }, []);

    const addNotification = useCallback((notification) => {
        const id = Date.now() + Math.random();
        const newNotification = {
            id,
            type: 'info', // 'success', 'error', 'warning', 'info'
            duration: 5000,
            ...notification
        };

        setNotifications(prev => [...prev, newNotification]);

        // Auto-remove after duration
        if (newNotification.duration > 0) {
            const timeoutId = setTimeout(() => {
                removeNotification(id);
            }, newNotification.duration);
            
            // Store timeout for cleanup
            timeoutsRef.current.set(id, timeoutId);
        }
    }, [removeNotification]); // ✅ Fixed dependency

    const showSuccess = useCallback((message, title = 'Success') => {
        addNotification({ type: 'success', title, message });
    }, [addNotification]);

    const showError = useCallback((message, title = 'Error') => {
        addNotification({ type: 'error', title, message });
    }, [addNotification]);

    const showInfo = useCallback((message, title = 'Info') => {
        addNotification({ type: 'info', title, message });
    }, [addNotification]);

    const showWarning = useCallback((message, title = 'Warning') => {
        addNotification({ type: 'warning', title, message });
    }, [addNotification]);

    return (
        <NotificationContext.Provider value={{
            notifications,
            addNotification,
            removeNotification,
            showSuccess,
            showError,
            showInfo,
            showWarning
        }}>
            {children}
        </NotificationContext.Provider>
    );
}

// Export the context for the hook
export { NotificationContext };
