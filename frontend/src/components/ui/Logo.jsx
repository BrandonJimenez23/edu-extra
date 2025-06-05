import { GraduationCap } from 'lucide-react';
import clsx from 'clsx';

export function Logo({ variant = "dark" }) {
  const variantClass = clsx({
    "logo-light": variant === "light",
    "logo-neutral": variant === "neutral",
    "logo-dark": variant === "dark",
  });

  return (
    <div className={`flex items-center gap-2 ${variantClass}`}>
      <GraduationCap className="h-6 w-6" />
      <span className="font-heading text-lg tracking-tight">EduExtra</span>
    </div>
  );
}
