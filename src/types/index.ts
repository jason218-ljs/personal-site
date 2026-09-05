import { Locale } from '@/content/config/i18n';

export interface BaseMeta {
  slug: string;
  title: Record<Locale, string>;
  date: string;
  tags: string[];
  featured: boolean;
  order: number;
}

export interface ProjectMeta extends BaseMeta {
  category: 'research' | 'teaching' | 'open-source' | 'industry';
  shortDescription: Record<Locale, string>;
  thumbnail?: string;
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
  paperUrl?: string;
}

export interface ProjectDetail extends ProjectMeta {
  content: string;
  contentHtml: string;
  images: string[];
}

export interface ContactInfo {
  email: string;
  office: Record<Locale, string>;
  address: Record<Locale, string>;
  mapUrl?: string;
  availability: Record<Locale, string>;
  social: {
    label: Record<Locale, string>;
    url: string;
    icon: string;
  }[];
}

export interface AboutContent {
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
}