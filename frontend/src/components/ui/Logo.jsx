import { GraduationCap } from 'lucide-react';
import clsx from 'clsx';

/**
 * Logo Component
 * 
 * The main application logo component featuring the EduExtra brand with
 * graduation cap icon. Supports different color variants for various
 * backgrounds and use cases.
 * 
 * @param {Object} props - Component props
 * @param {'light' | 'neutral' | 'dark'} props.variant - Logo color variant
 */
const Logo = ({ variant = "dark" }) => {
    // Apply variant-specific styling classes
    const variantClass = clsx({
        "logo-light": variant === "light",     // Light variant for dark backgrounds
        "logo-neutral": variant === "neutral", // Neutral variant for mixed backgrounds
        "logo-dark": variant === "dark",       // Dark variant for light backgrounds (default)
    });

    return (
        <div className={`flex items-center gap-2 ${variantClass}`}>
            {/* Graduation cap icon representing education */}
            <GraduationCap className="h-6 w-6" />
            {/* Application name with branded typography */}
            <span className="font-heading text-lg tracking-tight">EduExtra</span>
        </div>
    );
};

// Named export for backwards compatibility
export { Logo };

// Default export
export default Logo;
