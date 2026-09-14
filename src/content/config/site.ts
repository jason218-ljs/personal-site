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
    zh: '南京大学计算机科学与技术（计算机金融实验班）在读（GPA 4.28/5.0），聚焦 AI 应用与大模型 Agent 工程：LLM Agent 应用、AI 可信与不确定性约束、计算几何与在线路径规划、数据分析与工程实现。',
    en: 'CS-Finance undergraduate at Nanjing University (GPA 4.28/5.0), focusing on AI applications and LLM agent engineering: LLM-agent applications, AI trustworthiness and uncertainty constraints, computational geometry and online path planning, data analytics and engineering.',
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
    zh: '南京大学 · 工程管理学院 · 计算机科学与技术（计算机金融实验班）',
    en: 'Nanjing University · School of Engineering Management · Computer Science & Technology (CS-Finance Experimental Class)',
  },
  position: {
    zh: '本科生（2025 级）· AI 应用 / 大模型 Agent 工程方向',
    en: 'Undergraduate (Class of 2025) · AI Applications & LLM Agent Engineering',
  },
  researchInterests: {
    zh: ['大模型 Agent', 'LLM 应用工程', 'AI 可信与不确定性约束', '计算几何与路径规划', '机器学习', '数据分析'],
    en: ['LLM Agents', 'LLM Application Engineering', 'AI Trustworthiness', 'Computational Geometry & Path Planning', 'Machine Learning', 'Data Analytics'],
  },
};

export function getSiteConfig(): SiteConfig {
  return siteConfig;
}
