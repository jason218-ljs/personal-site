'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/content/config/site';
import { Locale } from '@/content/config/i18n';
import { GraduationCap, User, GitBranch, Mail } from 'lucide-react';
import { Icon } from '@/components/ui/Icon';

interface FooterProps {
  locale: Locale;
}

const socialLinks = [
  { icon: Mail, href: `mailto:${siteConfig.email}`, label: { zh: '邮箱', en: 'Email' } },
  { icon: GitBranch, href: siteConfig.social.github, label: { zh: 'GitHub', en: 'GitHub' } },
  { icon: GraduationCap, href: siteConfig.social.googleScholar, label: { zh: 'Google Scholar', en: 'Google Scholar' } },
  { icon: User, href: siteConfig.social.linkedin, label: { zh: 'LinkedIn', en: 'LinkedIn' } },
  { icon: User, href: siteConfig.social.orcid, label: { zh: 'ORCID', en: 'ORCID' } },
].filter(link => link.href);

export function Footer({ locale }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30" role="contentinfo">
      <div className="mx-auto max-w-[80rem] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 font-semibold">{siteConfig.name}</h3>
            <p className="text-sm text-muted-foreground">
              {locale === 'zh'
                ? '个人主页，展示项目经历、实习经历与联系方式。'
                : 'Personal homepage showcasing projects, internship experience, and contact information.'
              }
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-medium">{locale === 'zh' ? '快速链接' : 'Quick Links'}</h4>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2 text-sm">
                <li><Link href={`/${locale}`} className="text-muted-foreground hover:text-primary transition-colors">{locale === 'zh' ? '关于' : 'About'}</Link></li>
                <li><Link href={`/${locale}/projects`} className="text-muted-foreground hover:text-primary transition-colors">{locale === 'zh' ? '项目' : 'Projects'}</Link></li>
                <li><Link href={`/${locale}/contact`} className="text-muted-foreground hover:text-primary transition-colors">{locale === 'zh' ? '联系' : 'Contact'}</Link></li>
              </ul>
            </nav>
          </div>

          <div>
            <h4 className="mb-4 font-medium">{locale === 'zh' ? '联系方式' : 'Contact'}</h4>
            <address className="not-italic text-sm text-muted-foreground space-y-2">
              <p>{siteConfig.affiliation[locale]}</p>
              <p>
                <a href={`mailto:${siteConfig.email}`} className="hover:text-primary transition-colors">
                  {siteConfig.email}
                </a>
              </p>
            </address>
            
            <div className="mt-6 flex gap-4">
              {socialLinks.map(({ icon: IconComponent, href, label }) => (
                <a
                  key={label[locale]}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'text-muted-foreground hover:text-primary transition-colors',
                    'h-5 w-5'
                  )}
                  aria-label={label[locale]}
                >
                  <IconComponent className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>
            © {currentYear} {siteConfig.name}. {locale === 'zh' ? '保留所有权利。' : 'All rights reserved.'}
          </p>
          <p className="mt-2">
            {locale === 'zh' ? '由 Next.js + Tailwind CSS 构建' : 'Built with Next.js + Tailwind CSS'}
          </p>
        </div>
      </div>
    </footer>
  );
}