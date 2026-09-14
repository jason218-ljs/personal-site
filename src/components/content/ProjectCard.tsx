'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Locale } from '@/content/config/i18n';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/Card';
import { Tag } from '@/components/ui/Tag';
import { Button } from '@/components/ui/Button';
import { GitBranch, ExternalLink, FileText } from 'lucide-react';
import { Icon } from '@/components/ui/Icon';

interface ProjectCardProps {
  project: {
    slug: string;
    title: Record<Locale, string>;
    category: string;
    shortDescription: Record<Locale, string>;
    thumbnail?: string;
    techStack: string[];
    githubUrl?: string;
    demoUrl?: string;
    paperUrl?: string;
  };
  locale: Locale;
  /** 次要经历的紧凑变体：不显示缩略图，缩小留白与字号，弱化视觉权重 */
  compact?: boolean;
}

const categoryLabels: Record<string, Record<'zh' | 'en', string>> = {
  research: { zh: '研究', en: 'Research' },
  teaching: { zh: '课程', en: 'Coursework' },
  'open-source': { zh: '开源', en: 'Open Source' },
  industry: { zh: '实习实践', en: 'Industry' },
  creative: { zh: '创作', en: 'Creative' },
};

export function ProjectCard({ project, locale, compact = false }: ProjectCardProps) {
  const categoryLabel = categoryLabels[project.category]?.[locale] || project.category;

  return (
    <article>
      <Card className="overflow-hidden transition-all hover:shadow-lg group h-full flex flex-col">
        {project.thumbnail && !compact && (
          <Link href={`/${locale}/projects/${project.slug}`} className="relative block aspect-video overflow-hidden">
            <Image
              src={project.thumbnail}
              alt={project.title[locale]}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </Link>
        )}
        <CardContent className={compact ? 'flex-1 flex flex-col p-4 pb-3' : 'flex-1 flex flex-col p-6 pb-4'}>
          <div className={compact ? 'flex items-center gap-2 mb-2' : 'flex items-center gap-2 mb-3'}>
            <Tag variant="outline" size="sm">
              {categoryLabel}
            </Tag>
          </div>

          <h3
            className={
              compact
                ? 'font-semibold text-base leading-snug group-hover:text-primary transition-colors'
                : 'font-semibold text-lg leading-snug group-hover:text-primary transition-colors'
            }
          >
            <Link href={`/${locale}/projects/${project.slug}`}>
              {project.title[locale]}
            </Link>
          </h3>

          <p
            className={
              compact
                ? 'mt-1.5 text-xs text-muted-foreground line-clamp-2 flex-1'
                : 'mt-2 text-sm text-muted-foreground line-clamp-3 flex-1'
            }
          >
            {project.shortDescription[locale]}
          </p>

          {project.techStack.length > 0 && (
            <div className={compact ? 'mt-3 flex flex-wrap gap-1' : 'mt-4 flex flex-wrap gap-1.5'}>
              {project.techStack.slice(0, compact ? 3 : 6).map((tech, i) => (
                <Tag key={i} variant="outline" size="sm" className="text-xs">
                  {tech}
                </Tag>
              ))}
              {project.techStack.length > (compact ? 3 : 6) && (
                <Tag variant="outline" size="sm" className="text-xs text-muted-foreground">
                  +{project.techStack.length - (compact ? 3 : 6)}
                </Tag>
              )}
            </div>
          )}

          <div className={compact ? 'mt-3 flex items-center gap-2 pt-3 border-t' : 'mt-4 flex items-center gap-2 pt-4 border-t'}>
            {project.githubUrl && (
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" aria-label="GitHub" onClick={() => window.open(project.githubUrl, '_blank')}>
                <Icon icon={GitBranch} className="h-4 w-4" />
              </Button>
            )}
            {project.demoUrl && (
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" aria-label={locale === 'zh' ? '演示' : 'Demo'} onClick={() => window.open(project.demoUrl, '_blank')}>
                <Icon icon={ExternalLink} className="h-4 w-4" />
              </Button>
            )}
            {project.paperUrl && (
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" aria-label={locale === 'zh' ? '论文' : 'Paper'} onClick={() => window.open(project.paperUrl, '_blank')}>
                <Icon icon={FileText} className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </article>
  );
}