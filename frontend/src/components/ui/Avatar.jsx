import { forwardRef } from 'react';
import clsx from 'clsx';

/**
 * Avatar component for displaying user profile images or initials
 * 
 * Features:
 * - Size variants: xs, sm, md, lg, xl
 * - Fallback to initials when image fails to load
 * - Status indicators (online, offline, busy, away)
 * - Rounded or square variants
 * - Accessible alt text and ARIA attributes
 */
const Avatar = forwardRef(({
    src,                    // Image source URL
    alt,                    // Alt text for image
    initials,               // Fallback initials (e.g., "JD" for John Doe)
    size = 'md',            // Size variant: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    variant = 'rounded',    // Shape variant: 'rounded' | 'square'
    status,                 // Status indicator: 'online' | 'offline' | 'busy' | 'away'
    className = '',         // Additional CSS classes
    onImageError,           // Callback when image fails to load
    ...props               // Additional props
}, ref) => {
    // Size variant styles
    const sizeVariants = {
        xs: 'w-6 h-6 text-xs',       // 24px - extra small
        sm: 'w-8 h-8 text-sm',       // 32px - small
        md: 'w-10 h-10 text-base',   // 40px - medium (default)
        lg: 'w-12 h-12 text-lg',     // 48px - large
        xl: 'w-16 h-16 text-xl'      // 64px - extra large
    };
    
    // Shape variant styles
    const shapeVariants = {
        rounded: 'rounded-full',
        square: 'rounded-lg'
    };
    
    // Status indicator styles
    const statusVariants = {
        online: 'bg-green-500',
        offline: 'bg-gray-400',
        busy: 'bg-red-500',
        away: 'bg-yellow-500'
    };
    
    // Status indicator size based on avatar size
    const statusSizes = {
        xs: 'w-2 h-2',
        sm: 'w-2.5 h-2.5',
        md: 'w-3 h-3',
        lg: 'w-3.5 h-3.5',
        xl: 'w-4 h-4'
    };
    
    // Base classes for avatar container
    const baseClasses = clsx(
        'relative inline-flex items-center justify-center font-semibold text-white bg-gray-400 select-none overflow-hidden',
        sizeVariants[size],
        shapeVariants[variant],
        className
    );
    
    // Generate background color from initials for consistency
    const getInitialsColor = (initials) => {
        if (!initials) return 'bg-gray-400';
        
        const colors = [
            'bg-red-500', 'bg-orange-500', 'bg-amber-500', 'bg-yellow-500',
            'bg-lime-500', 'bg-green-500', 'bg-emerald-500', 'bg-teal-500',
            'bg-cyan-500', 'bg-sky-500', 'bg-blue-500', 'bg-indigo-500',
            'bg-violet-500', 'bg-purple-500', 'bg-fuchsia-500', 'bg-pink-500'
        ];
        
        const hash = initials.split('').reduce((acc, char) => {
            return char.charCodeAt(0) + ((acc << 5) - acc);
        }, 0);
        
        return colors[Math.abs(hash) % colors.length];
    };
    
    // Avatar classes with initials color
    const avatarClasses = clsx(
        baseClasses,
        !src && initials && getInitialsColor(initials)
    );

    return (
        <div className="relative inline-block">
            <div 
                ref={ref}
                className={avatarClasses}
                {...props}
            >
                {src ? (
                    <img
                        src={src}
                        alt={alt || 'Avatar'}
                        className={clsx(
                            'w-full h-full object-cover',
                            shapeVariants[variant]
                        )}
                        onError={onImageError}
                    />
                ) : (
                    <span className="uppercase font-medium">
                        {initials || '?'}
                    </span>
                )}
            </div>
            
            {/* Status indicator */}
            {status && (
                <span 
                    className={clsx(
                        'absolute bottom-0 right-0 rounded-full ring-2 ring-white',
                        statusVariants[status],
                        statusSizes[size]
                    )}
                    aria-label={`Status: ${status}`}
                />
            )}
        </div>
    );
});

// Set display name for debugging
Avatar.displayName = 'Avatar';

export default Avatar;
