'use client';

import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'muted' | 'bordered';
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: 'py-16 sm:py-24',
      muted: 'py-16 sm:py-24 bg-muted/30',
      bordered: 'py-16 sm:py-24 border-y border-border',
    };

    return (
      <section
        ref={ref}
        className={cn(variants[variant], className)}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = 'Section';

interface SectionHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ className, title, description, action, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('mb-12 text-center max-w-3xl mx-auto', className)}
      {...props}
    >
      <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {description && <p className="text-lg text-muted-foreground">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
);

SectionHeader.displayName = 'SectionHeader';

export { Section, SectionHeader };