'use client';

import { useState, useEffect } from 'react';
import { X, Copy, Check, FileText, Clipboard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Locale } from '@/content/config/i18n';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';

interface CitationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  publication: {
    title: Record<Locale, string>;
    authors: string[];
    venue: Record<Locale, string>;
    year: number;
    type: string;
    doi?: string;
  };
  locale: Locale;
}

const texts = {
  zh: {
    title: '引用格式',
    copy: '复制',
    copied: '已复制',
    close: '关闭',
  },
  en: {
    title: 'Citation Formats',
    copy: 'Copy',
    copied: 'Copied!',
    close: 'Close',
  },
};

export function CitationModal({ open, onOpenChange, publication, locale }: CitationModalProps) {
  const t = texts[locale];
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  const generateBibTeX = () => {
    const firstAuthorLastName = publication.authors[0]?.split(' ').pop() || 'Author';
    const key = `${firstAuthorLastName}${publication.year}`.replace(/\s+/g, '').toLowerCase();
    const entryType = publication.type === 'journal' ? 'article' : 'inproceedings';
    
    return `@${entryType}{${key},
  title = {${publication.title.en}},
  author = {${publication.authors.join(' and ')}},
  ${publication.type === 'journal' ? `journal = {${publication.venue.en}},` : `booktitle = {${publication.venue.en}},`}
  year = {${publication.year}},
  ${publication.doi ? `doi = {${publication.doi}},` : ''}
}`;
  };

  const generateAPA = () => {
    const authors = publication.authors.map(a => {
      const parts = a.split(' ');
      const lastName = parts.pop();
      const initials = parts.map(p => p[0] + '.').join(' ');
      return `${lastName}, ${initials}`;
    }).join(', ');
    
    return `${authors} (${publication.year}). ${publication.title.en}. ${publication.venue.en}.${publication.doi ? ` https://doi.org/${publication.doi}` : ''}`;
  };

  const generateMLA = () => {
    const authors = publication.authors.map((a, i) => {
      const parts = a.split(' ');
      const lastName = parts.pop();
      const firstName = parts.join(' ');
      if (i === 0) return `${lastName}, ${firstName}`;
      return `${firstName} ${lastName}`;
    }).join(', ');
    
    return `${authors}. "${publication.title.en}." <i>${publication.venue.en}</i>, ${publication.year}.${publication.doi ? ` doi:${publication.doi}.` : ''}`;
  };

  const copyToClipboard = (text: string, format: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onOpenChange(false);
  };

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between border-b pb-4">
          <DialogTitle className="text-lg font-semibold">{t.title}</DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
            aria-label={t.close}
          >
            <Icon icon={X} className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* BibTeX */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium flex items-center gap-2">
                <Icon icon={FileText} className="h-4 w-4 text-muted-foreground" />
                BibTeX
              </h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(generateBibTeX(), 'bibtex')}
              >
                {copiedFormat === 'bibtex' ? (
                  <>
                    <Icon icon={Check} className="h-3 w-3 text-success mr-1" />
                    {t.copied}
                  </>
                ) : (
                  <>
                    <Icon icon={Copy} className="h-3 w-3 mr-1" />
                    {t.copy}
                  </>
                )}
              </Button>
            </div>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono max-h-60 overflow-y-auto">
              <code>{generateBibTeX()}</code>
            </pre>
          </div>

          {/* APA */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium flex items-center gap-2">
                <Icon icon={Clipboard} className="h-4 w-4 text-muted-foreground" />
                APA (7th Edition)
              </h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(generateAPA(), 'apa')}
              >
                {copiedFormat === 'apa' ? (
                  <>
                    <Icon icon={Check} className="h-3 w-3 text-success mr-1" />
                    {t.copied}
                  </>
                ) : (
                  <>
                    <Icon icon={Copy} className="h-3 w-3 mr-1" />
                    {t.copy}
                  </>
                )}
              </Button>
            </div>
            <p className="bg-muted p-4 rounded-lg text-sm">{generateAPA()}</p>
          </div>

          {/* MLA */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium flex items-center gap-2">
                <Icon icon={Clipboard} className="h-4 w-4 text-muted-foreground" />
                MLA (9th Edition)
              </h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(generateMLA(), 'mla')}
              >
                {copiedFormat === 'mla' ? (
                  <>
                    <Icon icon={Check} className="h-3 w-3 text-success mr-1" />
                    {t.copied}
                  </>
                ) : (
                  <>
                    <Icon icon={Copy} className="h-3 w-3 mr-1" />
                    {t.copy}
                  </>
                )}
              </Button>
            </div>
            <p className="bg-muted p-4 rounded-lg text-sm" dangerouslySetInnerHTML={{ __html: generateMLA() }} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}