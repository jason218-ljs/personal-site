#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'src/content');
const PUBLIC_DIR = path.join(process.cwd(), 'public');

interface SearchIndexItem {
  slug: string;
  title: { zh: string; en: string };
  type: 'publication' | 'project' | 'page';
  url: { zh: string; en: string };
  content: { zh: string; en: string };
  tags: string[];
  year?: number;
  venue?: { zh: string; en: string };
}

function readJsonFile<T>(filePath: string): T | null {
  try {
    if (!fs.existsSync(filePath)) return null;
    return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as T;
  } catch {
    return null;
  }
}

function readMarkdownFile(filePath: string): { content: string } | null {
  try {
    if (!fs.existsSync(filePath)) return null;
    const content = fs.readFileSync(filePath, 'utf-8');
    const frontmatterEnd = content.indexOf('---', 3);
    if (frontmatterEnd !== -1) {
      return { content: content.slice(frontmatterEnd + 3).trim() };
    }
    return { content };
  } catch {
    return null;
  }
}

function stripMarkdown(text: string): string {
  return text
    .replace(/^#{1,6}\s+/gm, '')           // Headers
    .replace(/\*\*(.+?)\*\*/g, '$1')        // Bold
    .replace(/\*(.+?)\*/g, '$1')            // Italic
    .replace(/`(.+?)`/g, '$1')              // Inline code
    .replace(/```[\s\S]*?```/g, '')         // Code blocks
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Links
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1') // Images
    .replace(/^\s*[-*+]\s+/gm, '')          // List items
    .replace(/^\s*\d+\.\s+/gm, '')          // Numbered lists
    .replace(/^\s*>\s+/gm, '')              // Blockquotes
    .replace(/\n{3,}/g, '\n\n')             // Multiple newlines
    .trim();
}

async function generateSearchIndex() {
  const index: SearchIndexItem[] = [];

  // Projects
  const projMeta = readJsonFile<any[]>(path.join(CONTENT_DIR, 'projects', 'index.json'));
  if (projMeta) {
    for (const proj of projMeta) {
      const zhDetail = readMarkdownFile(path.join(CONTENT_DIR, 'projects', 'items', `${proj.slug}.zh.md`));
      const enDetail = readMarkdownFile(path.join(CONTENT_DIR, 'projects', 'items', `${proj.slug}.en.md`));
      index.push({
        slug: proj.slug,
        title: proj.title,
        type: 'project',
        url: {
          zh: `/zh/projects/${proj.slug}`,
          en: `/en/projects/${proj.slug}`,
        },
        content: {
          zh: zhDetail?.content ? stripMarkdown(zhDetail.content).slice(0, 500) : '',
          en: enDetail?.content ? stripMarkdown(enDetail.content).slice(0, 500) : '',
        },
        tags: proj.techStack,
      });
    }
  }

  // Pages (about, contact)
  const pages = [
    { name: 'about', title: { zh: '关于我', en: 'About' }, type: 'page' as const },
    { name: 'contact', title: { zh: '联系方式', en: 'Contact' }, type: 'page' as const },
  ];

  for (const page of pages) {
    const contents: Record<string, string> = {};
    for (const locale of ['zh', 'en'] as const) {
      let content = '';
      if (page.name === 'about') {
        const filePath = path.join(CONTENT_DIR, 'about', `${locale}.md`);
        const data = readMarkdownFile(filePath);
        content = data?.content ? stripMarkdown(data.content) : '';
      } else {
        const filePath = path.join(CONTENT_DIR, page.name, `${locale}.json`);
        const data = readJsonFile<any[]>(filePath);
        if (Array.isArray(data)) {
          content = data.map(item => {
            const vals = Object.values(item).filter(v => typeof v === 'string').join(' ');
            return stripMarkdown(vals);
          }).join(' ');
        }
      }
      contents[locale] = content.slice(0, 1000);
    }
    index.push({
      slug: page.name,
      title: page.title,
      type: page.type,
      url: {
        zh: `/zh/${page.name}`,
        en: `/en/${page.name}`,
      },
      content: {
        zh: contents.zh || '',
        en: contents.en || '',
      },
      tags: [],
    });
  }

  // Write search index
  const outputDir = path.join(PUBLIC_DIR, 'search-index');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, 'index.json');
  fs.writeFileSync(outputPath, JSON.stringify(index, null, 2));

  console.log(`✅ Search index generated: ${index.length} items`);
  console.log(`📁 Output: ${outputPath}`);
}

generateSearchIndex().catch(console.error);