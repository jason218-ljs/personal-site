'use client';

import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline' | 'secondary' | 'accent';
  size?: 'sm' | 'md';
}

const Tag = forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    const variants = {
      default: 'bg-primary/10 text-primary border border-primary/20',
      outline: 'bg-transparent text-foreground border border-border',
      secondary: 'bg-secondary text-secondary-foreground border border-secondary',
      accent: 'bg-accent text-accent-foreground border border-accent',
    };

    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-sm',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center font-medium rounded-full transition-colors',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Tag.displayName = 'Tag';

export { Tag };