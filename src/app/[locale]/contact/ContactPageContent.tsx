'use client';

import { useState } from 'react';
import { Locale } from '@/content/config/i18n';
import { cn } from '@/lib/utils';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Mail, MapPin, Building2, Globe, Clock, Send, GraduationCap, GitBranch, User, MessageSquare } from 'lucide-react';
import { Icon } from '@/components/ui/Icon';

interface ContactPageContentProps {
  locale: Locale;
  contact: {
    email: string;
    office: Record<Locale, string>;
    address: Record<Locale, string>;
    mapUrl?: string;
    availability: Record<Locale, string>;
    social: Array<{
      label: Record<Locale, string>;
      url: string;
      icon: string;
    }>;
  } | null;
}

const texts = {
  zh: {
    contactInfo: '联系信息',
    email: '电子邮箱',
    office: '办公室',
    address: '地址',
    availability: '联系时间',
    socialLinks: '社交链接',
    sendEmail: '发送邮件',
    viewMap: '查看地图',
    copyEmail: '复制邮箱',
    copied: '已复制',
  },
  en: {
    contactInfo: 'Contact Information',
    email: 'Email',
    office: 'Office',
    address: 'Address',
    availability: 'Availability',
    socialLinks: 'Social Links',
    sendEmail: 'Send Email',
    viewMap: 'View Map',
    copyEmail: 'Copy Email',
    copied: 'Copied!',
  },
};

const iconMap: Record<string, React.ElementType> = {
  Mail,
  GraduationCap,
  GitBranch,
  User,
  MessageSquare,
};

export function ContactPageContent({ locale, contact }: ContactPageContentProps) {
  const t = texts[locale];
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!contact) {
    return (
      <div className="min-h-screen">
        <section className="py-16 sm:py-24 bg-muted/30 border-b">
          <Container size="xl">
            <div className="text-center">
              <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
                {locale === 'zh' ? '联系方式' : 'Contact'}
              </h1>
              <p className="text-lg text-muted-foreground">
                {locale === 'zh' ? '联系信息暂未配置' : 'Contact information not configured'}
              </p>
            </div>
          </Container>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-16 sm:py-24 bg-muted/30 border-b">
        <Container size="xl">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
              {locale === 'zh' ? '联系方式' : 'Contact'}
            </h1>
            <p className="text-lg text-muted-foreground">
              {locale === 'zh' 
                ? '欢迎通过邮件联系我，通常在 48 小时内回复'
                : 'Feel free to reach out via email, usually reply within 48 hours'
              }
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Info & Social Links */}
      <section className="py-12">
        <Container size="xl">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Info */}
            <div className="space-y-8">
              <h2 className="text-2xl font-bold accent-line">{t.contactInfo}</h2>
              
              <Card>
                <CardContent className="pt-6 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon icon={Mail} className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{t.email}</h3>
                      <div className="mt-2 flex items-center gap-3">
                        <a 
                          href={`mailto:${contact.email}`} 
                          className="text-primary hover:underline font-mono"
                        >
                          {contact.email}
                        </a>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(contact.email)}
                          className="gap-1"
                        >
                          <Icon icon={copied ? Send : Mail} className="h-3 w-3" />
                          {copied ? t.copied : t.copyEmail}
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1" onClick={() => window.open(`mailto:${contact.email}`, '_blank')}>
                          <Icon icon={Send} className="h-3 w-3" />
                          {t.sendEmail}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon icon={Building2} className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{t.office}</h3>
                      <p className="mt-1 text-muted-foreground">{contact.office[locale]}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon icon={MapPin} className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{t.address}</h3>
                      <p className="mt-1 text-muted-foreground whitespace-pre-line">{contact.address[locale]}</p>
                      {contact.mapUrl && (
                        <Button variant="ghost" size="sm" className="mt-2 gap-1" onClick={() => window.open(contact.mapUrl!, '_blank')}>
                          <Icon icon={Globe} className="h-3 w-3" />
                          {t.viewMap}
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon icon={Clock} className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{t.availability}</h3>
                      <p className="mt-1 text-muted-foreground">{contact.availability[locale]}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Social Links */}
            <div className="space-y-8">
              <h2 className="text-2xl font-bold accent-line">{t.socialLinks}</h2>
              
              <div className="space-y-4">
                {contact.social.map((social, index) => {
                  const IconComponent = iconMap[social.icon] || Globe;
                  return (
                    <Card key={index} className="group transition-all hover:shadow-md hover:border-primary/50">
                      <CardContent className="p-4">
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-4"
                          onClick={() => window.open(social.url, '_blank')}
                        >
                          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <IconComponent className="h-5 w-5 text-primary" />
                          </div>
                          <span className="font-medium">{social.label[locale]}</span>
                          <Icon icon={Globe} className="ml-auto h-4 w-4 text-muted-foreground" />
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Contact Form Placeholder */}
      <section className="py-12 bg-muted/30 border-y">
        <Container size="lg">
          <Card>
            <CardContent className="pt-6">
              <h2 className="mb-4 text-2xl font-bold text-center">
                {locale === 'zh' ? '发送消息' : 'Send a Message'}
              </h2>
              <p className="mb-6 text-center text-muted-foreground">
                {locale === 'zh'
                  ? '联系表单功能开发中，请直接发送邮件至上方邮箱地址。'
                  : 'Contact form under development. Please send email directly to the address above.'
                }
              </p>
              <div className="text-center">
                <Button size="lg" className="gap-2" onClick={() => window.open(`mailto:${contact.email}?subject=${encodeURIComponent(locale === 'zh' ? '来自个人主页的消息' : 'Message from Personal Website')}`, '_blank')}>
                  <Icon icon={Send} className="h-4 w-4" />
                  {t.sendEmail}
                </Button>
              </div>
            </CardContent>
          </Card>
        </Container>
      </section>
    </div>
  );
}