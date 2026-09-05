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
}

const categoryLabels: Record<string, Record<'zh' | 'en', string>> = {
  research: { zh: '研究', en: 'Research' },
  teaching: { zh: '课程', en: 'Coursework' },
  'open-source': { zh: '开源', en: 'Open Source' },
  industry: { zh: '实习实践', en: 'Industry' },
  creative: { zh: '创作', en: 'Creative' },
};

export function ProjectCard({ project, locale }: ProjectCardProps) {
  const categoryLabel = categoryLabels[project.category]?.[locale] || project.category;

  return (
    <article>
      <Card className="overflow-hidden transition-all hover:shadow-lg group h-full flex flex-col">
        {project.thumbnail && (
          <Link href={`/${locale}/projects/${project.slug}`} className="block aspect-video overflow-hidden">
            <Image
              src={project.thumbnail}
              alt={project.title[locale]}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </Link>
        )}
        <CardContent className="flex-1 flex flex-col p-6 pb-4">
          <div className="flex items-center gap-2 mb-3">
            <Tag variant="outline" size="sm">
              {categoryLabel}
            </Tag>
          </div>
          
          <h3 className="font-semibold text-lg leading-snug group-hover:text-primary transition-colors">
            <Link href={`/${locale}/projects/${project.slug}`}>
              {project.title[locale]}
            </Link>
          </h3>
          
          <p className="mt-2 text-sm text-muted-foreground line-clamp-3 flex-1">
            {project.shortDescription[locale]}
          </p>

          {project.techStack.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.techStack.slice(0, 6).map((tech, i) => (
                <Tag key={i} variant="outline" size="sm" className="text-xs">
                  {tech}
                </Tag>
              ))}
              {project.techStack.length > 6 && (
                <Tag variant="outline" size="sm" className="text-xs text-muted-foreground">
                  +{project.techStack.length - 6}
                </Tag>
              )}
            </div>
          )}

          <div className="mt-4 flex items-center gap-2 pt-4 border-t">
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