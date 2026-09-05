import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import { Locale } from '@/content/config/i18n';

interface SearchIndexItem {
  slug: string;
  title: { zh: string; en: string };
  type: 'project' | 'page';
  url: { zh: string; en: string };
  content: { zh: string; en: string };
  tags: string[];
  year?: number;
  venue?: { zh: string; en: string };
}

interface SearchResult {
  item: SearchIndexItem;
  score: number;
  matchedField: string;
}

const typeLabels = {
  project: { zh: '项目', en: 'Project' },
  page: { zh: '页面', en: 'Page' },
};

interface SearchProps {
  locale: Locale;
  indexUrl?: string;
}

export function SearchComponent({ locale, indexUrl = '/search-index/index.json' }: SearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState<SearchIndexItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Load search index
  useEffect(() => {
    fetch(indexUrl)
      .then(res => res.json())
      .then(data => {
        setIndex(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load search index:', err);
        setLoading(false);
      });
  }, [indexUrl]);

  // Search function
  const search = useCallback((q: string) => {
    if (!q.trim() || index.length === 0) {
      setResults([]);
      return;
    }

    const terms = q.toLowerCase().split(/\s+/).filter(t => t.length > 0);
    const scored = index.map(item => {
      let score = 0;
      let matchedField = '';

      const searchableText = [
        item.title[locale]?.toLowerCase() || '',
        item.content[locale]?.toLowerCase() || '',
        ...item.tags.map(t => t.toLowerCase()),
        item.venue?.[locale]?.toLowerCase() || '',
        item.type,
      ].join(' ');

      for (const term of terms) {
        // Title matches get highest score
        if (item.title[locale]?.toLowerCase().includes(term)) {
          score += 10;
          matchedField = 'title';
        }
        // Tag matches
        if (item.tags.some(t => t.toLowerCase().includes(term))) {
          score += 5;
          matchedField = matchedField || 'tags';
        }
        // Content matches
        if (item.content[locale]?.toLowerCase().includes(term)) {
          score += 2;
          matchedField = matchedField || 'content';
        }
        // Venue matches
        if (item.venue?.[locale]?.toLowerCase().includes(term)) {
          score += 3;
          matchedField = matchedField || 'venue';
        }
        // Exact match bonus
        if (item.title[locale]?.toLowerCase() === q.toLowerCase()) {
          score += 20;
        }
      }

      return { item, score, matchedField };
    })
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

    setResults(scored);
  }, [index, locale]);

  useEffect(() => {
    const debounce = setTimeout(() => search(query), 150);
    return () => clearTimeout(debounce);
  }, [query, search]);

  const handleFocus = () => setIsOpen(true);
  const handleBlur = () => setTimeout(() => setIsOpen(false), 200);
  const clearSearch = () => {
    setQuery('');
    setResults([]);
  };

  const texts = {
    zh: {
      placeholder: '搜索项目、页面...',
      noResults: '未找到结果',
      results: '条结果',
    },
    en: {
      placeholder: 'Search projects, pages...',
      noResults: 'No results found',
      results: 'results',
    },
  };

  const t = texts[locale];

  if (loading) {
    return (
      <div className="relative">
        <Input
          placeholder={t.placeholder}
          disabled
          className="w-full max-w-xs"
        />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="relative">
        <Icon icon={Search} className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder={t.placeholder}
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={cn('w-full max-w-xs pl-10 pr-10', query && 'pr-10')}
          aria-label={t.placeholder}
          autoComplete="off"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
            onClick={clearSearch}
            aria-label={locale === 'zh' ? '清除搜索' : 'Clear search'}
          >
            <Icon icon={X} className="h-4 w-4" />
          </Button>
        )}
      </div>

      {isOpen && (query || results.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-popover border shadow-lg rounded-lg overflow-hidden max-h-96 overflow-y-auto">
          {results.length === 0 && query ? (
            <div className="p-4 text-center text-muted-foreground text-sm">
              {t.noResults}
            </div>
          ) : (
            <div className="py-2">
              {results.map((result, idx) => (
                <Link
                  key={idx}
                  href={result.item.url[locale]}
                  className={cn(
                    'flex items-start gap-3 p-3 hover:bg-accent transition-colors border-b last:border-0',
                    idx === 0 && 'rounded-t-lg'
                  )}
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded bg-primary/10 flex items-center justify-center text-primary text-xs font-medium">
                    {result.item.type === 'project' ? '💻' : '📃'}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium truncate">{result.item.title[locale]}</span>
                      <Badge variant="outline" className="text-xs">
                        {typeLabels[result.item.type][locale]}
                      </Badge>
                    </div>
                    {result.item.venue && (
                      <p className="text-xs text-muted-foreground truncate mt-1">
                        {result.item.venue[locale]} {result.item.year ? `(${result.item.year})` : ''}
                      </p>
                    )}
                    {result.item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {result.item.tags.slice(0, 3).map((tag, i) => (
                          <Badge key={i} variant="outline" className="text-xs h-4 px-1.5">
                            {tag}
                          </Badge>
                        ))}
                        {result.item.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs h-4 px-1.5">
                            +{result.item.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
          <div className="px-3 py-2 border-t text-xs text-muted-foreground flex items-center justify-between">
            <span>{results.length} {t.results}</span>
            <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">⌘K</kbd>
          </div>
        </div>
      )}
    </div>
  );
}