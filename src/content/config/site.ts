import { Locale } from '@/content/config/i18n';

export interface SiteConfig {
  name: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  author: string;
  email: string;
  social: {
    github?: string;
    googleScholar?: string;
    linkedin?: string;
    twitter?: string;
    orcid?: string;
    researchgate?: string;
  };
  cvPdf: Record<Locale, string>;
  avatar: string;
  affiliation: Record<Locale, string>;
  position: Record<Locale, string>;
  researchInterests: Record<Locale, string[]>;
}

export const siteConfig: SiteConfig = {
  name: '李俊森',
  title: {
    zh: '李俊森 | 个人主页',
    en: 'Junsen Li | Personal Homepage',
  },
  description: {
    zh: '南京大学计算机金融实验班在读（GPA 4.28/5.0），聚焦量化研究与金融科技：多因子选股、回测系统、AI Agent 与数据分析项目。',
    en: 'CS-Finance undergraduate at Nanjing University (GPA 4.28/5.0), focusing on quantitative research and fintech: multi-factor stock screening, backtesting systems, AI agents, and data analytics.',
  },
  author: '李俊森',
  email: '251275042@smail.nju.edu.cn',
  social: {
    github: 'https://github.com/jason218-ljs',
  },
  cvPdf: {
    zh: '/assets/cv/resume-zh.pdf',
    en: '/assets/cv/resume-en.pdf',
  },
  avatar: '/assets/images/avatar.jpg',
  affiliation: {
    zh: '南京大学 · 工程管理学院 · 计算机金融实验班',
    en: 'Nanjing University · School of Engineering Management · CS-Finance Experimental Class',
  },
  position: {
    zh: '本科生（2025 级）· 量化研究 / 金融科技方向',
    en: 'Undergraduate (Class of 2025) · Quantitative Research & Fintech',
  },
  researchInterests: {
    zh: ['量化投资', '多因子建模', '回测系统', 'AI × 金融', '数据分析'],
    en: ['Quantitative Investing', 'Multi-Factor Modeling', 'Backtesting Systems', 'AI × Finance', 'Data Analytics'],
  },
};

export function getSiteConfig(): SiteConfig {
  return siteConfig;
}
