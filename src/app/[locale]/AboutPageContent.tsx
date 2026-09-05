'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Locale } from '@/content/config/i18n';
import { siteConfig } from '@/content/config/site';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Tag } from '@/components/ui/Tag';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { ProjectCard } from '@/components/content/ProjectCard';
import { Download, Mail, MapPin, Building2, Award, GraduationCap, Briefcase, ExternalLink } from 'lucide-react';
import { Icon } from '@/components/ui/Icon';

interface AboutPageContentProps {
  locale: Locale;
  about: {
    bio: Record<Locale, string>;
    education: Array<{
      degree: Record<Locale, string>;
      institution: Record<Locale, string>;
      year: string;
      description?: Record<Locale, string>;
    }>;
    experience: Array<{
      title: Record<Locale, string>;
      institution: Record<Locale, string>;
      period: string;
      description?: Record<Locale, string>;
    }>;
    awards: Array<{
      title: Record<Locale, string>;
      year: number;
      description?: Record<Locale, string>;
    }>;
  } | null;
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
  }>;
}

const texts = {
  zh: {
    cvDownload: '下载简历',
    cvPreview: '预览',
    researchInterests: '研究兴趣',
    education: '教育背景',
    experience: '实习经历',
    awards: '荣誉与科研',
    selectedProjects: '代表性项目',
    viewAll: '查看全部',
    present: '至今',
  },
  en: {
    cvDownload: 'Download CV',
    cvPreview: 'Preview',
    researchInterests: 'Research Interests',
    education: 'Education',
    experience: 'Experience',
    awards: 'Honors & Research',
    selectedProjects: 'Selected Projects',
    viewAll: 'View All',
    present: 'Present',
  },
};

export function AboutPageContent({ locale, about, projects }: AboutPageContentProps) {
  const t = texts[locale];
  const config = siteConfig;

  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 lg:py-32">
        <Container size="xl">
          <div className="grid gap-12 lg:grid-cols-4 lg:gap-16 items-start">
            <div className="lg:col-span-1">
              <div className="relative aspect-square max-w-xs mx-auto lg:max-w-none lg:mx-0">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-2xl" />
                <Image
                  src={config.avatar}
                  alt={config.name}
                  fill
                  className="rounded-full object-cover ring-4 ring-background shadow-xl"
                  priority
                  sizes="(max-width: 1024px) 100vw, 25vw"
                />
              </div>
            </div>

            <div className="lg:col-span-3 space-y-8 text-center lg:text-left">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  {config.name}
                </h1>
                <p className="text-xl text-muted-foreground font-medium">
                  {config.position[locale]}
                </p>
                <p className="text-lg text-muted-foreground">
                  {config.affiliation[locale]}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                <Button size="lg" className="gap-2" onClick={() => window.open(config.cvPdf[locale], '_blank')}>
                  <Icon icon={Download} className="h-4 w-4" />
                  {t.cvDownload}
                </Button>
                <Button variant="outline" size="lg" className="gap-2" onClick={() => window.open(config.cvPdf[locale], '_blank')}>
                  <Icon icon={ExternalLink} className="h-4 w-4" />
                  {t.cvPreview}
                </Button>
                <a
                  href={`mailto:${config.email}`}
                  className="flex items-center gap-2 text-lg text-muted-foreground hover:text-primary transition-colors"
                >
                  <Icon icon={Mail} className="h-5 w-5" />
                  {config.email}
                </a>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 lg:justify-start text-sm text-muted-foreground">
                {config.social.github && (
                  <a href={config.social.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors">
                    <Icon icon={Building2} className="h-4 w-4" />
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Research Interests */}
      {config.researchInterests[locale].length > 0 && (
        <Section variant="muted">
          <Container size="xl">
            <SectionHeader title={t.researchInterests} />
            <div className="flex flex-wrap justify-center gap-3">
              {config.researchInterests[locale].map((interest, i) => (
                <Tag key={i} variant="outline" size="md">
                  {interest}
                </Tag>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Bio */}
      {about?.bio?.[locale] && (
        <Section>
          <Container size="lg">
            <div className="prose prose-lg max-w-none dark:prose-invert">
              {about.bio[locale].split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Education & Experience */}
      {(about?.education?.length || about?.experience?.length) && (
        <Section variant="bordered">
          <Container size="xl">
            <div className="grid gap-12 md:grid-cols-2">
              {about?.education?.length && (
                <div>
                  <h3 className="mb-6 text-xl font-semibold flex items-center gap-2">
                    <Icon icon={GraduationCap} className="h-5 w-5 text-primary" />
                    {t.education}
                  </h3>
                  <dl className="space-y-6">
                    {about.education.map((edu, i) => (
                      <div key={i} className="border-l-2 border-primary/20 pl-6 pb-6 last:pb-0">
                        <dt className="font-medium">{edu.degree[locale]}</dt>
                        <dd className="text-muted-foreground">{edu.institution[locale]}</dd>
                        <dd className="text-sm text-muted-foreground">{edu.year}</dd>
                        {edu.description?.[locale] && (
                          <dd className="mt-2 text-sm">{edu.description[locale]}</dd>
                        )}
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {about?.experience?.length && (
                <div>
                  <h3 className="mb-6 text-xl font-semibold flex items-center gap-2">
                    <Icon icon={Briefcase} className="h-5 w-5 text-primary" />
                    {t.experience}
                  </h3>
                  <dl className="space-y-6">
                    {about.experience.map((exp, i) => (
                      <div key={i} className="border-l-2 border-primary/20 pl-6 pb-6 last:pb-0">
                        <dt className="font-medium">{exp.title[locale]}</dt>
                        <dd className="text-muted-foreground">{exp.institution[locale]}</dd>
                        <dd className="text-sm text-muted-foreground">{exp.period}</dd>
                        {exp.description?.[locale] && (
                          <dd className="mt-2 text-sm">{exp.description[locale]}</dd>
                        )}
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </div>
          </Container>
        </Section>
      )}

      {/* Awards */}
      {about?.awards?.length && (
        <Section>
          <Container size="xl">
            <SectionHeader title={t.awards} />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {about.awards.map((award, i) => (
                <Card key={i} className="border-primary/10">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon icon={Award} className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{award.title[locale]}</h4>
                        <p className="text-sm text-muted-foreground">{award.year}</p>
                        {award.description?.[locale] && (
                          <p className="mt-1 text-sm">{award.description[locale]}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Selected Projects */}
      {projects.length > 0 && (
        <Section>
          <Container size="xl">
            <SectionHeader
              title={t.selectedProjects}
              action={
                <Link
                  href={`/${locale}/projects`}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  {t.viewAll} →
                </Link>
              }
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {projects.map(project => (
                <ProjectCard key={project.slug} project={project} locale={locale} />
              ))}
            </div>
          </Container>
        </Section>
      )}
    </div>
  );
}
