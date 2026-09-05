'use client';

import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'destructive' | 'info' | 'outline' | 'secondary';
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: 'bg-primary/10 text-primary',
      success: 'bg-green-500/10 text-green-600 dark:text-green-400',
      warning: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
      destructive: 'bg-red-500/10 text-red-600 dark:text-red-400',
      info: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
      outline: 'border border-border bg-transparent text-foreground hover:bg-accent',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };