'use client';

import { LucideIcon, LucideProps } from 'lucide-react';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface IconProps extends Omit<LucideProps, 'ref'> {
  icon: LucideIcon;
}

const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ icon: IconComponent, className, size = 16, ...props }, ref) => (
    <IconComponent
      ref={ref}
      className={cn('shrink-0', className)}
      size={size}
      {...props}
    />
  )
);

Icon.displayName = 'Icon';

export { Icon };