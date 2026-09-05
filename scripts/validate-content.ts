#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'src/content');

interface ValidationError {
  file: string;
  message: string;
  severity: 'error' | 'warning';
}

const errors: ValidationError[] = [];

function addError(file: string, message: string, severity: 'error' | 'warning' = 'error') {
  errors.push({ file, message, severity });
}

function validateFileExists(filePath: string, context: string): boolean {
  if (!fs.existsSync(filePath)) {
    addError(context, `File not found: ${filePath}`);
    return false;
  }
  return true;
}

function validatePublicationMeta() {
  const indexPath = path.join(CONTENT_DIR, 'publications', 'index.json');
  if (!validateFileExists(indexPath, 'publications/index.json')) return;

  try {
    const data = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));
    const slugs = new Set<string>();

    data.forEach((pub: any, index: number) => {
      const prefix = `publications/index.json[${index}]`;

      // Required fields
      ['slug', 'title', 'authors', 'venue', 'year', 'type', 'tags', 'featured', 'order'].forEach(field => {
        if (!(field in pub)) {
          addError(prefix, `Missing required field: ${field}`);
        }
      });

      // Title must have both languages
      if (pub.title) {
        if (!pub.title.zh) addError(prefix, 'Missing Chinese title');
        if (!pub.title.en) addError(prefix, 'Missing English title');
      }

      // Venue must have both languages
      if (pub.venue) {
        if (!pub.venue.zh) addError(prefix, 'Missing Chinese venue');
        if (!pub.venue.en) addError(prefix, 'Missing English venue');
      }

      // Type validation
      const validTypes = ['conference', 'journal', 'preprint', 'thesis'];
      if (pub.type && !validTypes.includes(pub.type)) {
        addError(prefix, `Invalid type: ${pub.type}. Must be one of: ${validTypes.join(', ')}`);
      }

      // Year validation
      if (pub.year && (typeof pub.year !== 'number' || pub.year < 1900 || pub.year > new Date().getFullYear() + 1)) {
        addError(prefix, `Invalid year: ${pub.year}`);
      }

      // Duplicate slug check
      if (pub.slug) {
        if (slugs.has(pub.slug)) {
          addError(prefix, `Duplicate slug: ${pub.slug}`);
        }
        slugs.add(pub.slug);

        // Check corresponding markdown files exist
        const zhPath = path.join(CONTENT_DIR, 'publications', 'items', `${pub.slug}.zh.md`);
        const enPath = path.join(CONTENT_DIR, 'publications', 'items', `${pub.slug}.en.md`);
        validateFileExists(zhPath, `publications/items/${pub.slug}.zh.md`);
        validateFileExists(enPath, `publications/items/${pub.slug}.en.md`);
      }

      // URL validation
      ['pdfUrl', 'codeUrl', 'projectUrl'].forEach(urlField => {
        if (pub[urlField] && typeof pub[urlField] === 'string') {
          const url = pub[urlField];
          // Allow relative paths (starting with /) and absolute URLs
          if (!url.startsWith('/') && !url.startsWith('./')) {
            try {
              new URL(url);
            } catch {
              addError(prefix, `Invalid ${urlField}: ${url}`, 'warning');
            }
          }
        }
      });

      // DOI format validation
      if (pub.doi && typeof pub.doi === 'string') {
        if (!pub.doi.startsWith('10.')) {
          addError(prefix, `DOI should start with "10.": ${pub.doi}`, 'warning');
        }
      }
    });
  } catch (e) {
    addError('publications/index.json', `JSON parse error: ${e}`);
  }
}

function validateProjectMeta() {
  const indexPath = path.join(CONTENT_DIR, 'projects', 'index.json');
  if (!validateFileExists(indexPath, 'projects/index.json')) return;

  try {
    const data = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));
    const slugs = new Set<string>();

    data.forEach((proj: any, index: number) => {
      const prefix = `projects/index.json[${index}]`;

      ['slug', 'title', 'category', 'shortDescription', 'techStack', 'featured', 'order', 'date'].forEach(field => {
        if (!(field in proj)) {
          addError(prefix, `Missing required field: ${field}`);
        }
      });

      if (proj.title) {
        if (!proj.title.zh) addError(prefix, 'Missing Chinese title');
        if (!proj.title.en) addError(prefix, 'Missing English title');
      }

      if (proj.shortDescription) {
        if (!proj.shortDescription.zh) addError(prefix, 'Missing Chinese shortDescription');
        if (!proj.shortDescription.en) addError(prefix, 'Missing English shortDescription');
      }

      const validCategories = ['research', 'teaching', 'open-source', 'industry'];
      if (proj.category && !validCategories.includes(proj.category)) {
        addError(prefix, `Invalid category: ${proj.category}. Must be one of: ${validCategories.join(', ')}`);
      }

      if (proj.slug) {
        if (slugs.has(proj.slug)) {
          addError(prefix, `Duplicate slug: ${proj.slug}`);
        }
        slugs.add(proj.slug);

        const zhPath = path.join(CONTENT_DIR, 'projects', 'items', `${proj.slug}.zh.md`);
        const enPath = path.join(CONTENT_DIR, 'projects', 'items', `${proj.slug}.en.md`);
        validateFileExists(zhPath, `projects/items/${proj.slug}.zh.md`);
        validateFileExists(enPath, `projects/items/${proj.slug}.en.md`);
      }

      ['githubUrl', 'demoUrl', 'paperUrl'].forEach(urlField => {
        if (proj[urlField] && typeof proj[urlField] === 'string') {
          const url = proj[urlField];
          if (!url.startsWith('/') && !url.startsWith('./')) {
            try {
              new URL(url);
            } catch {
              addError(prefix, `Invalid ${urlField}: ${url}`, 'warning');
            }
          }
        }
      });
    });
  } catch (e) {
    addError('projects/index.json', `JSON parse error: ${e}`);
  }
}

function validateMarkdownFiles(dir: string, type: string) {
  const itemsDir = path.join(CONTENT_DIR, dir, 'items');
  if (!fs.existsSync(itemsDir)) return;

  const files = fs.readdirSync(itemsDir);
  const zhFiles = files.filter(f => f.endsWith('.zh.md'));
  const enFiles = files.filter(f => f.endsWith('.en.md'));

  zhFiles.forEach(file => {
    const filePath = path.join(itemsDir, file);
    const slug = file.replace('.zh.md', '');
    const enFile = `${slug}.en.md`;

    if (!enFiles.includes(enFile)) {
      addError(`${type}/${file}`, `Missing English version: ${enFile}`);
    }

    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(content);

      if (!data.slug) {
        addError(`${type}/${file}`, 'Missing slug in frontmatter');
      } else if (data.slug !== slug) {
        addError(`${type}/${file}`, `Slug mismatch: frontmatter has "${data.slug}" but filename is "${slug}"`);
      }

      if (!data.title || !data.title.zh || !data.title.en) {
        addError(`${type}/${file}`, 'Title must have both zh and en');
      }
    } catch (e) {
      addError(`${type}/${file}`, `Frontmatter parse error: ${e}`);
    }
  });
}

function validateJSONFiles(dir: string, type: string) {
  const files = ['zh.json', 'en.json'];
  files.forEach(file => {
    const filePath = path.join(CONTENT_DIR, dir, file);
    if (!validateFileExists(filePath, `${type}/${file}`)) return;

    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      // contact is an object, others are arrays
      if (type !== 'contact' && !Array.isArray(data)) {
        addError(`${type}/${file}`, 'Expected array');
      }
      if (type === 'contact' && typeof data !== 'object') {
        addError(`${type}/${file}`, 'Expected object');
      }
    } catch (e) {
      addError(`${type}/${file}`, `JSON parse error: ${e}`);
    }
  });
}

function validateAboutFiles() {
  ['zh.md', 'en.md'].forEach(file => {
    const filePath = path.join(CONTENT_DIR, 'about', file);
    if (!validateFileExists(filePath, `about/${file}`)) return;

    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(content);

      if (!data.bio || !data.bio.zh || !data.bio.en) {
        addError(`about/${file}`, 'bio must have both zh and en');
      }
      if (!Array.isArray(data.education)) {
        addError(`about/${file}`, 'education must be an array');
      }
      if (!Array.isArray(data.experience)) {
        addError(`about/${file}`, 'experience must be an array');
      }
      if (!Array.isArray(data.awards)) {
        addError(`about/${file}`, 'awards must be an array');
      }
    } catch (e) {
      addError(`about/${file}`, `Frontmatter parse error: ${e}`);
    }
  });
}

function validateConfigFiles() {
  const sitePath = path.join(CONTENT_DIR, 'config', 'site.ts');
  if (!validateFileExists(sitePath, 'config/site.ts')) return;

  const content = fs.readFileSync(sitePath, 'utf-8');
  const requiredFields = ['name', 'title', 'description', 'author', 'email', 'social', 'cvPdf', 'avatar', 'affiliation', 'position', 'researchInterests'];
  requiredFields.forEach(field => {
    if (!content.includes(field)) {
      addError('config/site.ts', `Missing field: ${field}`, 'warning');
    }
  });
}

// Run validations
console.log('🔍 Validating content files...\n');

validateConfigFiles();
validateAboutFiles();
validateProjectMeta();
validateMarkdownFiles('projects', 'projects');
validateJSONFiles('contact', 'contact');

// Check for PDF files
const cvDir = path.join(process.cwd(), 'public', 'assets', 'cv');
if (fs.existsSync(cvDir)) {
  const files = fs.readdirSync(cvDir);
  if (!files.some(f => f.endsWith('.pdf'))) {
    addError('public/assets/cv/', 'No PDF files found in cv directory', 'warning');
  }
} else {
  addError('public/assets/cv/', 'CV directory does not exist', 'warning');
}

// Report results
const errorCount = errors.filter(e => e.severity === 'error').length;
const warningCount = errors.filter(e => e.severity === 'warning').length;

if (errors.length > 0) {
  console.log('\n📋 Validation Results:');
  errors.forEach(e => {
    const icon = e.severity === 'error' ? '❌' : '⚠️';
    console.log(`  ${icon} [${e.severity.toUpperCase()}] ${e.file}: ${e.message}`);
  });
  console.log(`\nTotal: ${errorCount} errors, ${warningCount} warnings`);
} else {
  console.log('✅ All validations passed!');
}

process.exit(errorCount > 0 ? 1 : 0);