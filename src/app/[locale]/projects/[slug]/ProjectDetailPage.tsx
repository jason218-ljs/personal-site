'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Locale } from '@/content/config/i18n';
import { cn } from '@/lib/utils';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import { MarkdownRenderer } from '@/components/content/MarkdownRenderer';
import { GitBranch, ExternalLink, FileText, Share2, ArrowLeft } from 'lucide-react';
import { Icon } from '@/components/ui/Icon';

interface ProjectDetailPageProps {
  locale: Locale;
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
    content: string;
    contentHtml: string;
    images: string[];
  };
}

const texts = {
  zh: {
    back: '返回项目列表',
    category: '分类',
    techStack: '技术栈',
    links: '相关链接',
    github: 'GitHub',
    demo: '在线演示',
    paper: '相关论文',
    images: '项目截图',
    description: '项目描述',
  },
  en: {
    back: 'Back to Projects',
    category: 'Category',
    techStack: 'Tech Stack',
    links: 'Links',
    github: 'GitHub',
    demo: 'Live Demo',
    paper: 'Paper',
    images: 'Screenshots',
    description: 'Description',
  },
};

const categoryLabels: Record<string, Record<'zh' | 'en', string>> = {
  research: { zh: '研究', en: 'Research' },
  teaching: { zh: '教学', en: 'Teaching' },
  'open-source': { zh: '开源', en: 'Open Source' },
  industry: { zh: '工业', en: 'Industry' },
  creative: { zh: '创作', en: 'Creative' },
};

export function ProjectDetailPage({ locale, project }: ProjectDetailPageProps) {
  const t = texts[locale];

  return (
    <article className="min-h-screen">
      {/* Header */}
      <header className="relative py-16 sm:py-24 bg-muted/30 border-b">
        {project.thumbnail && (
          <div className="absolute inset-0 -z-10">
            <Image
              src={project.thumbnail}
              alt=""
              fill
              className="object-cover opacity-30"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
          </div>
        )}
        <Container size="xl">
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <Icon icon={ArrowLeft} className="h-4 w-4" />
            {t.back}
          </Link>

          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge variant="outline">
                {categoryLabels[project.category]?.[locale] || project.category}
              </Badge>
            </div>

            <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {project.title[locale]}
            </h1>

            <p className="mb-6 text-lg text-muted-foreground max-w-2xl">
              {project.shortDescription[locale]}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              {project.githubUrl && (
                <Button variant="outline" size="sm" className="gap-2" onClick={() => window.open(project.githubUrl, '_blank')}>
                  <Icon icon={GitBranch} className="h-4 w-4" />
                  {t.github}
                </Button>
              )}
              {project.demoUrl && (
                <Button variant="outline" size="sm" className="gap-2" onClick={() => window.open(project.demoUrl, '_blank')}>
                  <Icon icon={ExternalLink} className="h-4 w-4" />
                  {t.demo}
                </Button>
              )}
              {project.paperUrl && (
                <Button variant="outline" size="sm" className="gap-2" onClick={() => window.open(project.paperUrl, '_blank')}>
                  <Icon icon={FileText} className="h-4 w-4" />
                  {t.paper}
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="gap-2"
                onClick={() => navigator.share?.({ title: project.title[locale], url: window.location.href })}
              >
                <Icon icon={Share2} className="h-4 w-4" />
                {locale === 'zh' ? '分享' : 'Share'}
              </Button>
            </div>
          </div>
        </Container>
      </header>

      {/* Main Content */}
      <main className="py-12">
        <Container size="xl">
          <div className="grid gap-12 lg:grid-cols-4">
            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-6">
              {/* Tech Stack */}
              {project.techStack.length > 0 && (
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="mb-4 font-semibold">{t.techStack}</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, i) => (
                        <Tag key={i} variant="outline" size="sm">
                          {tech}
                        </Tag>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Links */}
              {(project.githubUrl || project.demoUrl || project.paperUrl) && (
                <Card>
                  <CardContent className="pt-6 space-y-3">
                    <h3 className="font-semibold">{t.links}</h3>
                    <div className="space-y-2">
                      {project.githubUrl && (
                        <Button variant="outline" className="w-full justify-start gap-2" onClick={() => window.open(project.githubUrl, '_blank')}>
                          <Icon icon={GitBranch} className="h-4 w-4" />
                          {t.github}
                        </Button>
                      )}
                      {project.demoUrl && (
                        <Button variant="outline" className="w-full justify-start gap-2" onClick={() => window.open(project.demoUrl, '_blank')}>
                          <Icon icon={ExternalLink} className="h-4 w-4" />
                          {t.demo}
                        </Button>
                      )}
                      {project.paperUrl && (
                        <Button variant="outline" className="w-full justify-start gap-2" onClick={() => window.open(project.paperUrl, '_blank')}>
                          <Icon icon={FileText} className="h-4 w-4" />
                          {t.paper}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-12">
              {/* Description */}
              <section>
                <h2 className="mb-6 text-2xl font-bold accent-line">{t.description}</h2>
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <MarkdownRenderer content={project.contentHtml} />
                </div>
              </section>

              {/* Images Gallery */}
              {project.images.length > 0 && (
                <section>
                  <h2 className="mb-6 text-2xl font-bold accent-line">{t.images}</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {project.images.map((image, i) => (
                      <div key={i} className="group relative aspect-video rounded-lg overflow-hidden">
                        <Image
                          src={image}
                          alt={`${project.title[locale]} - ${i + 1}`}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, 50vw"
                        />
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </Container>
      </main>
    </article>
  );
}