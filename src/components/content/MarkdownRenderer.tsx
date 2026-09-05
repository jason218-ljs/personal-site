'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer = forwardRef<HTMLDivElement, MarkdownRendererProps>(
  ({ content, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('prose prose-lg max-w-none dark:prose-invert', className)}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }
);

MarkdownRenderer.displayName = 'MarkdownRenderer';