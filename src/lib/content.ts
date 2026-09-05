import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';
import { Locale } from '@/content/config/i18n';
import { getSiteConfig } from '@/content/config/site';
import type {
  ProjectMeta,
  ProjectDetail,
  ContactInfo,
  AboutContent,
} from '@/types';

const CONTENT_DIR = path.join(process.cwd(), 'src/content');

function getContentDir(...subDirs: string[]): string {
  return path.join(CONTENT_DIR, ...subDirs);
}

function readJsonFile<T>(filePath: string): T | null {
  try {
    if (!fs.existsSync(filePath)) return null;
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content) as T;
  } catch {
    return null;
  }
}

async function readMarkdownFile(filePath: string): Promise<{ data: Record<string, unknown>; content: string; contentHtml: string } | null> {
  try {
    if (!fs.existsSync(filePath)) return null;
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data, content: markdownContent } = matter(content);
    const processedContent = await remark().use(gfm).use(html).process(markdownContent);
    return {
      data,
      content: markdownContent,
      contentHtml: processedContent.toString(),
    };
  } catch {
    return null;
  }
}

export async function getProjectMeta(locale: Locale): Promise<ProjectMeta[]> {
  const indexPath = path.join(getContentDir('projects'), 'index.json');
  const data = readJsonFile<ProjectMeta[]>(indexPath);
  if (!data) return [];
  return data
    .filter(item => item.title[locale])
    .sort((a, b) => a.order - b.order || new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getProjectDetail(slug: string, locale: Locale): Promise<ProjectDetail | null> {
  const filePath = path.join(getContentDir('projects', 'items'), `${slug}.${locale}.md`);
  const result = await readMarkdownFile(filePath);
  if (!result) return null;

  const meta = await getProjectMeta(locale);
  const baseMeta = meta.find(m => m.slug === slug);
  if (!baseMeta) return null;

  const imagesDir = path.join(process.cwd(), 'public/assets/images/projects', slug);
  let images: string[] = [];
  if (fs.existsSync(imagesDir)) {
    images = fs.readdirSync(imagesDir)
      .filter(f => /\.(jpg|jpeg|png|webp|gif)$/i.test(f))
      .map(f => `/assets/images/projects/${slug}/${f}`);
  }

  return {
    ...baseMeta,
    content: result.content,
    contentHtml: result.contentHtml,
    images,
  };
}

export async function getAboutContent(locale: Locale): Promise<AboutContent | null> {
  const filePath = path.join(getContentDir('about'), `${locale}.md`);
  const result = await readMarkdownFile(filePath);
  if (!result) return null;

  return result.data as unknown as AboutContent;
}

export async function getContactContent(locale: Locale): Promise<ContactInfo | null> {
  const filePath = path.join(getContentDir('contact'), `${locale}.json`);
  return readJsonFile<ContactInfo>(filePath);
}

export async function getFeaturedProjects(locale: Locale, limit = 4): Promise<ProjectMeta[]> {
  const all = await getProjectMeta(locale);
  return all.filter(p => p.featured).slice(0, limit);
}

export function getAllProjectSlugs(): string[] {
  const itemsDir = getContentDir('projects/items');
  if (!fs.existsSync(itemsDir)) return [];
  return fs.readdirSync(itemsDir)
    .filter(f => f.endsWith('.zh.md'))
    .map(f => f.replace('.zh.md', ''));
}

export { getSiteConfig };
