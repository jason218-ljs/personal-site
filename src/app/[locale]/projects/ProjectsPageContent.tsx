'use client';

import { useState, useMemo } from 'react';
import { Locale } from '@/content/config/i18n';
import { cn } from '@/lib/utils';
import { ProjectCard } from '@/components/content/ProjectCard';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Tag } from '@/components/ui/Tag';
import { Button } from '@/components/ui/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { Filter, X } from 'lucide-react';
import { Icon } from '@/components/ui/Icon';

interface ProjectsPageContentProps {
  locale: Locale;
  projects: Array<{
    slug: string;
    title: Record<Locale, string>;
    category: string;
    shortDescription: Record<Locale, string>;
    thumbnail?: string;
    techStack: string[];
    githubUrl?: string;
    demoUrl?: string;
    paperUrl?: string;
    featured: boolean;
  }>;
}

const texts = {
  zh: {
    filter: '筛选',
    clearFilters: '清除筛选',
    allCategories: '全部分类',
    featuredOnly: '仅精选',
    searchPlaceholder: '搜索项目...',
    noResults: '未找到匹配的项目',
    projectsCount: '个项目',
    coreProjects: '核心项目',
    coreDesc: 'AI 应用与智能体工程 · 算法建模与工程实现主线',
    otherExperience: '其他经历',
    otherDesc: '课程项目、早期科研与课外创作',
  },
  en: {
    filter: 'Filter',
    clearFilters: 'Clear Filters',
    allCategories: 'All Categories',
    featuredOnly: 'Featured Only',
    searchPlaceholder: 'Search projects...',
    noResults: 'No matching projects found',
    projectsCount: 'projects',
    coreProjects: 'Core Projects',
    coreDesc: 'AI applications and agent engineering · algorithm modeling and engineering',
    otherExperience: 'Other Experience',
    otherDesc: 'Coursework, early research, and creative work',
  },
};

const categoryLabels: Record<string, Record<'zh' | 'en', string>> = {
  research: { zh: '研究', en: 'Research' },
  teaching: { zh: '课程', en: 'Coursework' },
  'open-source': { zh: '开源', en: 'Open Source' },
  industry: { zh: '实习实践', en: 'Industry' },
  creative: { zh: '创作', en: 'Creative' },
};

export function ProjectsPageContent({ locale, projects }: ProjectsPageContentProps) {
  const t = texts[locale];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [featuredOnly, setFeaturedOnly] = useState(false);

  const categories = useMemo(() => {
    const catSet = new Set(projects.map(p => p.category));
    return Array.from(catSet).sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter(proj => {
      const matchesSearch = !searchQuery || 
        proj.title[locale].toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.shortDescription[locale].toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || proj.category === selectedCategory;
      const matchesFeatured = !featuredOnly || proj.featured;
      
      return matchesSearch && matchesCategory && matchesFeatured;
    });
  }, [projects, searchQuery, selectedCategory, featuredOnly, locale]);

  const hasActiveFilters = searchQuery || selectedCategory !== 'all' || featuredOnly;

  const coreProjects = useMemo(() => filteredProjects.filter(p => p.featured), [filteredProjects]);
  const otherProjects = useMemo(() => filteredProjects.filter(p => !p.featured), [filteredProjects]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-16 sm:py-24 bg-muted/30 border-b">
        <Container size="xl">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
              {locale === 'zh' ? '项目经历' : 'Projects'}
            </h1>
            <p className="text-lg text-muted-foreground">
              {locale === 'zh'
                ? '实习实践、研究与课程项目'
                : 'Industry practice, research, and coursework projects'
              }
            </p>
            <div className="mt-6 flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <span>{filteredProjects.length} {t.projectsCount}</span>
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setFeaturedOnly(false);
                }} className="gap-1">
                  <Icon icon={X} className="h-3 w-3" />
                  {t.clearFilters}
                </Button>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Filters */}
      <section className="py-8 border-b bg-background">
        <Container size="xl">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex-1">
              <label htmlFor="search" className="sr-only">{t.searchPlaceholder}</label>
              <div className="relative max-w-md">
                <Icon icon={Filter} className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="search"
                  type="search"
                  placeholder={t.searchPlaceholder}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-input bg-background rounded-lg placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder={t.allCategories} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.allCategories}</SelectItem>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>
                      {categoryLabels[cat]?.[locale] || cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant={featuredOnly ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setFeaturedOnly(!featuredOnly)}
                className="gap-1"
              >
                {t.featuredOnly}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Projects Grid */}
      <section className="py-12">
        <Container size="xl">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <Icon icon={Filter} className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium mb-2">{t.noResults}</h3>
              <p className="text-muted-foreground">
                {locale === 'zh' 
                  ? '尝试调整筛选条件或搜索关键词'
                  : 'Try adjusting filters or search keywords'
                }
              </p>
            </div>
          ) : (
            <div className="space-y-14">
              {coreProjects.length > 0 && (
                <div>
                  <div className="mb-6">
                    <h2 className="accent-line inline-block text-2xl font-bold">{t.coreProjects}</h2>
                    <p className="mt-2 text-sm text-muted-foreground">{t.coreDesc}</p>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {coreProjects.map(project => (
                      <ProjectCard key={project.slug} project={project} locale={locale} />
                    ))}
                  </div>
                </div>
              )}

              {otherProjects.length > 0 && (
                <div>
                  <div className="mb-6">
                    <h2 className="accent-line inline-block text-2xl font-bold">{t.otherExperience}</h2>
                    <p className="mt-2 text-sm text-muted-foreground">{t.otherDesc}</p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {otherProjects.map(project => (
                      <ProjectCard key={project.slug} project={project} locale={locale} compact />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}