import clsx from "clsx";
import { Ghost } from "lucide-react";

const Button = ({ children, size = "md", variant = "primary", ghost = false, fullWidth = false, className = "", ...props }) => {
  const baseStyles = "btn";
  const variantStyles = {
    primary: ghost ? "btn-primary-ghost" : "btn-primary",
    secondary: ghost ? "btn-secondary-ghost" : "btn-secondary",
    warning: ghost ? "btn-warning-ghost" : "btn-warning",
    danger: ghost ? "btn-danger-ghost" : "btn-danger",
  };
  const sizeStyles = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  };

  return (
    <button
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
